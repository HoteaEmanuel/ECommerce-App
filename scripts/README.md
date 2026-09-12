# Product import

Requires Node.js 22.18+ (native TypeScript support). Reads `src/data/products.ts`.
The catalog contains 50 products, each with an `imageURLs` array (a product gallery).
Added products use sample catalog prices in the same units as the existing entries,
not verified current retail prices.
Products 10–47 use matching product image galleries from [DummyJSON](https://dummyjson.com/products).
Products 1–5 have a single image (no additional gallery images found for their source).
Products 6–9 and 48–50 use official Logitech product galleries.

Preview without contacting Firebase:

```bash
node scripts/seed-products.mjs
```

Import into `smart-ecommerce-9dd57`, default Firestore database, `products` collection:

```bash
node scripts/seed-products.mjs --write
```

If the collection requires authentication, set `FIREBASE_AUTH_TOKEN` locally to
a Firebase ID token or Google OAuth access token with read/write access. Do not
commit tokens or paste them into chat. If you already have Google Cloud CLI
installed and authenticated with an authorized account, run:

```bash
FIREBASE_AUTH_TOKEN="$(gcloud auth print-access-token)" node scripts/seed-products.mjs --write
```

The importer skips products already present by document ID, product ID, or title.
It creates the remaining documents atomically with an `exists: false` precondition
so it cannot overwrite an existing document. It does not change security rules.

# Product image migration

`scripts/migrate-product-images.mjs` backfills the `imageURLs` array field onto
`products` documents that were seeded before it existed (which only have the
older single `imageURL` string field). Same auth and usage pattern as the
importer above:

```bash
node scripts/migrate-product-images.mjs           # preview
node scripts/migrate-product-images.mjs --write   # backfill
```

For each document missing `imageURLs`, it takes the full image list from
`src/data/products.ts` (matched by product `id`), falling back to wrapping the
document's existing `imageURL` in a single-element array if the id isn't found
locally. It writes only the `imageURLs` field via `updateMask` — every other
field, and the legacy `imageURL` field itself, is left untouched — and uses an
`exists: true` precondition so it can only update, never create, a document.
Safe to re-run; it always reports "Nothing to migrate" once every document has
`imageURLs`.
