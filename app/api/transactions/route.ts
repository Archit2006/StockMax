import { NextResponse } from 'next/server'
import { transactions } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() -
      new Date(a.timestamp).getTime(),
  )

  return NextResponse.json(sortedTransactions)
}