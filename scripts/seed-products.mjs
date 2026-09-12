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

function fields(product) {
  return {
    id: { integerValue: String(product.id) },
    price: { doubleValue: product.price },
    title: { stringValue: product.title },
    description: { stringValue: product.description },
    imageURLs: {
      arrayValue: { values: product.imageURLs.map((url) => ({ stringValue: url })) },
    },
  };
}

function hasValidImages(product) {
  return (
    Array.isArray(product.imageURLs) &&
    product.imageURLs.length > 0 &&
    product.imageURLs.every((url) => new URL(url).protocol === "https:")
  );
}

async function main() {
  if (process.argv.slice(2).some((arg) => arg !== "--write")) {
    throw new Error("Usage: node scripts/seed-products.mjs [--write]");
  }
  const ids = new Set();
  for (const product of products) {
    if (!Number.isSafeInteger(product.id) || ids.has(product.id) ||
        !Number.isFinite(product.price) || product.price < 0 ||
        !product.title.trim() || !product.description?.trim() || !hasValidImages(product)) {
      throw new Error(`Invalid product: ${product.id}`);
    }
    ids.add(product.id);
  }

  console.log(`Target: ${database}, collection: products`);
  console.table(products.map(({ id, title, price, imageURLs }) =>
    ({ id, title, price, images: imageURLs.length })));
  if (!process.argv.includes("--write")) {
    console.log("Preview only. Pass --write to import. New product prices are sample catalog prices.");
    return;
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

  const missing = products.filter((product) => !existing.some((doc) =>
    doc.name === `${documents}/products/${product.id}` ||
    Number(doc.fields?.id?.integerValue ?? doc.fields?.id?.doubleValue ?? doc.fields?.id?.stringValue) === product.id ||
    doc.fields?.title?.stringValue?.trim() === product.title.trim()
  ));
  console.log(`Skipping ${products.length - missing.length} existing products.`);
  if (!missing.length) return;

  await request(`${endpoint}:commit`, {
    method: "POST",
    body: JSON.stringify({
      writes: missing.map((product) => ({
        update: { name: `${documents}/products/${product.id}`, fields: fields(product) },
        currentDocument: { exists: false },
      })),
    }),
  });
  console.log(`Imported ${missing.length} products. Existing documents were preserved.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
