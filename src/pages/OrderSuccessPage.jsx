import { Link, useLocation } from 'react-router-dom'

export default function OrderSuccessPage() {
  const location = useLocation()
  const order = location.state?.order || { id: 'FDG-20260924-1024', restaurant: 'FoodieGo', total: 499 }

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-badge">✓</div>
        <h1>Order placed successfully!</h1>
        <p>Your delicious meal is on the way.</p>
        <div className="order-summary-box">
          <div><span>Order ID</span><strong>{order.id}</strong></div>
          <div><span>Restaurant</span><strong>{order.restaurant}</strong></div>
          <div><span>Total</span><strong>₹{order.total}</strong></div>
          <div><span>ETA</span><strong>25-30 min</strong></div>
        </div>
        <div className="success-actions">
          <Link to={`/orders/${order.id}`} className="primary-btn">Track Order</Link>
          <Link to="/orders" className="secondary-btn">View Orders</Link>
          <Link to="/restaurants" className="secondary-btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
