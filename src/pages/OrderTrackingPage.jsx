import { Link, useParams } from 'react-router-dom'
import { useOrderContext } from '../context/OrderContext'

const timeline = ['Order Placed', 'Restaurant Accepted', 'Food Preparing', 'Food Ready', 'Out for Delivery', 'Delivered']

export default function OrderTrackingPage() {
  const { id } = useParams()
  const { orders } = useOrderContext()
  const order = orders.find((item) => item.id === id) || { id, restaurant: 'Madurai Spice House', total: 499, items: ['Veg Biryani'], address: 'Home • Chennai', eta: '25-30 min' }

  return (
    <div className="tracking-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Live tracking</p>
          <h1>Track Order #{order.id}</h1>
        </div>
      </section>

      <div className="tracking-layout">
        <div className="panel-card timeline-card">
          <div className="timeline">
            {timeline.map((step, idx) => (
              <div key={step} className={`timeline-item ${idx <= 4 ? 'active' : ''}`}>
                <span className="timeline-dot">{idx + 1}</span>
                <div>
                  <strong>{step}</strong>
                  {idx === 3 && <small>Estimated arrival: {order.eta}</small>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel-card tracking-summary">
          <h3>Delivery partner</h3>
          <p>Ravi Kumar</p>
          <p>📞 +91 98765 12345</p>
          <p>ETA: {order.eta}</p>
          <h4>Order items</h4>
          <ul>
            {order.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="summary-row total"><span>Total</span><strong>₹{order.total}</strong></div>
          <Link to="/orders" className="secondary-btn small">Back to orders</Link>
        </aside>
      </div>
    </div>
  )
}
