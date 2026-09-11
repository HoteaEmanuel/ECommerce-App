# Product import

Requires Node.js 22.18+ (native TypeScript support). Reads `src/data/products.ts`.
The catalog contains 50 products. Added products use sample catalog prices in the
same units as the existing entries, not verified current retail prices.
Products 10–47 use matching product images from [DummyJSON](https://dummyjson.com/products).
Products 8–9 and 48–50 use official Logitech product images.

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
