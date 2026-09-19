# StockLite — Warehouse Inventory System

StockLite is a small warehouse inventory app. It tracks products across two
warehouses, lets staff record stock movements, and keeps a history of every
transaction. This repo gives you the UI, seed data, and basic app structure —
your job is to make it actually work.

## What's already provided

- Styled inventory grid UI (`/`)
- Stock In / Stock Out form UI (`/stock`)
- Warehouse Transfer form UI (`/transfer`)
- Transaction History page UI (`/history`)
- A seeded in-memory store with ~20 products across 2 warehouses
  (`lib/seed-data.ts`), including products above, near, and at their
  reorder threshold
- A staff auth skeleton (`/login`, `lib/auth.ts`) — not real authentication,
  just the expected shape
- Stubbed API routes: `GET /api/items`, `GET /api/transactions`

None of the actual inventory logic — filtering, validation, stock mutation,
transfers, or transaction recording — is implemented yet. Every place you
need to add logic is marked with a `TODO` comment.

## Project structure

```
app/
  page.tsx              Inventory View
  stock/page.tsx         Stock In / Stock Out
  transfer/page.tsx      Warehouse Transfer
  history/page.tsx       Transaction History
  login/page.tsx         Auth skeleton
  api/items/route.ts     Stubbed items API
  api/transactions/route.ts   Stubbed transactions API
components/               UI components (table, forms, status badge, nav)
lib/
  seed-data.ts            Seeded products, warehouses, transactions
  types.ts                Shared types
  auth.ts                 Stubbed staff user
```

## Running the project

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What you need to implement

The seed data and API stubs currently live in memory (`lib/seed-data.ts`).
You can mutate that in-memory data directly from the API routes, or wire up
whatever storage approach you prefer — just make the behavior below correct.

### Task 1: Inventory View — 15 points

- Display name, category, warehouse, current stock, and reorder threshold — 3 pts
- Filter by category — 3 pts
- Filter by low stock only — 3 pts
- Correct low stock rule: current stock ≤ threshold — 3 pts
- Category and low stock filters combine correctly — 2 pts
- Graceful empty state handling — 1 pt

### Task 2: Stock In and Stock Out — 25 points

- Stock in form and API increments the correct warehouse — 5 pts
- Stock out form and API decrements the correct warehouse — 5 pts
- Block a stock out that would exceed current stock — 5 pts
- Reject invalid quantities (zero, negative, non-numeric) — 4 pts
- UI reflects the new stock level immediately — 3 pts
- Operation is logged for transaction history — 3 pts

### Task 3: Warehouse Transfer — 25 points

- Transfer form with product, source warehouse, destination warehouse, quantity — 4 pts
- Deduct quantity from the source warehouse — 4 pts
- Add quantity to the destination warehouse — 4 pts
- Reject a transfer if the source has insufficient stock — 5 pts
- Validate both warehouses before writing, so no partial transfer applies on failure — 6 pts
- Transfer is recorded as a linked pair in the transaction history — 2 pts

### Task 4: Transaction History — 15 points

- List transactions with product, warehouse, type, quantity, and timestamp — 4 pts
- Filter by transaction type — 3 pts
- Filter by warehouse — 3 pts
- Sort by most recent timestamp — 3 pts
- Filters combine correctly — 2 pts

### Task 5: Debugging — 15 points

- Fix incorrect stock totals after operations — 4 pts
- Fix negative inventory being allowed — 4 pts
- Fix a transfer that only updates one warehouse — 4 pts
- Fix incorrect low stock status logic — 3 pts

### Stretch — 5 points

- Low stock summary panel showing counts needing replenishment per warehouse — 5 pts

**Total: 100 points**

## Notes

- Keep your changes focused — you shouldn't need to restructure the provided
  pages or components, just fill in the logic.
- The API stubs return the seeded data as-is. You'll need to extend them
  (or add new handlers) to support writes.
