import { Product, Transaction } from './types'

const globalForStockLite = globalThis as typeof globalThis & {
  stockLiteStore?: {
    products: Product[]
    transactions: Transaction[]
    nextTransactionSeq: number
  }
}

export const stockLiteStore =
  globalForStockLite.stockLiteStore ??
  (globalForStockLite.stockLiteStore = {
    products: [],
    transactions: [],
    nextTransactionSeq: 5,
  })