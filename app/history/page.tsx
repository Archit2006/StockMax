'use client'

import { useEffect, useState } from 'react'
import DashboardShell from '@/components/DashboardShell'
import TransactionTable from '@/components/TransactionTable'
import { Transaction } from '@/lib/types'

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch('/api/transactions', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch transactions')
        }

        const data = await res.json()
        setTransactions(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  return (
    <DashboardShell>
      <div className="page-header">
        <div>
          <h1>Transaction History</h1>
          <p>A record of every stock movement across warehouses.</p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Loading transactions...</p>
        </div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </DashboardShell>
  )
}