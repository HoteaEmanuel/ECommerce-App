import { products } from "../src/data/products.ts";

const database = "projects/smart-ecommerce-9dd57/databases/(default)";
const documents = `${database}/documents`;
const endpoint = `https://firestore.googleapis.com/v1/${documents}`;
const headers = { "Content-Type": "application/json" };
if (process.env.FIREBASE_AUTH_TOKEN) {
  headers.Authorization = `Bearer ${process.env.FIREBASE_AUTH_TOKEN}`;
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers,
    signal: AbortSignal.timeout(15000),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Firestore ${response.status}: ${body.error?.message ?? response.statusText}`);
  }
  return body;
}

const byId = new Map(products.map((product) => [product.id, product]));

function docId(doc) {
  return Number(
    doc.fields?.id?.integerValue ?? doc.fields?.id?.doubleValue ?? doc.fields?.id?.stringValue,
  );
}

// Prefer the local catalog (which carries the full gallery); otherwise promote
// the document's legacy single `imageURL` so nothing is left without an image.
function imageURLsFor(doc) {
  const local = byId.get(docId(doc));
  if (local?.imageURLs?.length) return local.imageURLs;
  const legacy = doc.fields?.imageURL?.stringValue;
  return legacy?.trim() ? [legacy] : [];
}

async function main() {
  if (process.argv.slice(2).some((arg) => arg !== "--write")) {
    throw new Error("Usage: node scripts/migrate-product-images.mjs [--write]");
  }

  const existing = [];
  let pageToken;
  do {
    const query = new URLSearchParams({ pageSize: "100" });
    if (pageToken) query.set("pageToken", pageToken);
    const page = await request(`${endpoint}/products?${query}`);
    existing.push(...(page.documents ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);

  console.log(`Target: ${database}, collection: products (${existing.length} documents)`);

  const pending = [];
  const unresolved = [];
  for (const doc of existing) {
    if (doc.fields?.imageURLs) continue;
    const imageURLs = imageURLsFor(doc);
    if (!imageURLs.length) {
      unresolved.push(doc.name.split("/").pop());
      continue;
    }
    pending.push({ doc, imageURLs });
  }

  if (unresolved.length) {
    console.warn(`No image source for ${unresolved.length} document(s): ${unresolved.join(", ")}`);
  }
  if (!pending.length) {
    console.log("Nothing to migrate. Every document already has imageURLs.");
    return;
  }

  console.table(pending.map(({ doc, imageURLs }) => ({
    document: doc.name.split("/").pop(),
    title: doc.fields?.title?.stringValue,
    images: imageURLs.length,
  })));

  if (!process.argv.includes("--write")) {
    console.log(`Preview only. Pass --write to backfill ${pending.length} document(s).`);
    return;
  }

  // updateMask keeps every other field untouched; currentDocument.exists makes
  // this a pure backfill that can never create a document.
  await request(`${endpoint}:commit`, {
    method: "POST",
    body: JSON.stringify({
      writes: pending.map(({ doc, imageURLs }) => ({
        update: {
          name: doc.name,
          fields: {
            imageURLs: { arrayValue: { values: imageURLs.map((url) => ({ stringValue: url })) } },
          },
        },
        updateMask: { fieldPaths: ["imageURLs"] },
        currentDocument: { exists: true },
      })),
    }),
  });
  console.log(`Backfilled imageURLs on ${pending.length} document(s). The legacy imageURL field was left in place.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
