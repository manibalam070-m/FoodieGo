import { Link } from 'react-router-dom'
import { useOrderContext } from '../context/OrderContext'

export default function OrdersPage() {
  const { orders, setOrders } = useOrderContext()

  function cancelOrder(id) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: 'cancelled' } : order))
  }

  const activeOrders = orders.filter((order) => order.status === 'active')
  const completedOrders = orders.filter((order) => order.status === 'completed')
  const cancelledOrders = orders.filter((order) => order.status === 'cancelled')

  return (
    <div className="orders-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Your orders</p>
          <h1>Orders</h1>
        </div>
      </section>

      <div className="orders-tabs">
        <span>Active ({activeOrders.length})</span>
        <span>Completed ({completedOrders.length})</span>
        <span>Cancelled ({cancelledOrders.length})</span>
      </div>

      <div className="order-list">
        {orders.length ? orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-top">
              <div>
                <h3>{order.restaurant}</h3>
                <p>{order.items.join(', ')}</p>
              </div>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-meta">
              <span>{order.id}</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
              <span>₹{order.total}</span>
            </div>
            <div className="order-actions">
              <Link to={`/orders/${order.id}`} className="secondary-btn small">Track</Link>
              <button type="button" className="secondary-btn small">View details</button>
              <button type="button" className="secondary-btn small">Reorder</button>
              {order.status !== 'cancelled' && <button type="button" className="text-button" onClick={() => cancelOrder(order.id)}>Cancel</button>}
            </div>
          </div>
        )) : <div className="empty-state"><h3>No orders yet</h3><p>Your order history will appear here.</p><Link to="/restaurants" className="primary-btn">Order now</Link></div>}
      </div>
    </div>
  )
}
