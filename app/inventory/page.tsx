import DashboardShell from '@/components/DashboardShell'
import InventoryTable from '@/components/InventoryTable'
import { products, warehouses } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export default function InventoryPage() {
  const lowStockByWarehouse = warehouses.map((warehouse) => ({
    ...warehouse,
    count: products.filter(
      (product) =>
        product.warehouseId === warehouse.id &&
        product.currentStock <= product.reorderThreshold,
    ).length,
  }))

  return (
    <DashboardShell>
      <div className="page-header">
        <div>
          <h1>Inventory</h1>
          <p>Current stock across both warehouses.</p>
        </div>
      </div>

      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  }}
>
  {lowStockByWarehouse.map((warehouse) => (
    <div
      key={warehouse.id}
      style={{
        background: '#fff',
        border: '1px solid #e5e1d8',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#777',
          marginBottom: '8px',
        }}
      >
        Low Stock
      </div>

      <div
        style={{
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {warehouse.count}
      </div>

      <div
        style={{
          fontSize: '15px',
          color: '#555',
        }}
      >
        {warehouse.name}
      </div>

      <div
        style={{
          marginTop: '12px',
          fontSize: '13px',
          color: '#9b4b3f',
          fontWeight: 500,
        }}
      >
        Products needing replenishment
      </div>
    </div>
  ))}
</div>

      <InventoryTable products={products} warehouses={warehouses} />
    </DashboardShell>
  )
}