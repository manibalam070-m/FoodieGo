import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCartContext()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? 35 : 0
  const platformFee = subtotal > 0 ? 15 : 0
  const taxes = Math.round(subtotal * 0.05)
  const discount = subtotal > 500 ? 80 : 0
  const total = subtotal + deliveryFee + platformFee + taxes - discount

  if (!cart.length) {
    return <div className="empty-state"><h3>Your cart is empty</h3><p>Add a few delicious items to begin.</p><Link to="/restaurants" className="primary-btn">Explore restaurants</Link></div>
  }

  return (
    <div className="cart-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Your bag</p>
          <h1>Cart</h1>
        </div>
      </section>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-body">
                <div className="cart-item-row">
                  <h3>{item.name}</h3>
                  <button type="button" className="text-button" onClick={() => removeFromCart(item.id, item.customizations)}>Remove</button>
                </div>
                <p>{item.restaurant || 'FoodieGo'}</p>
                <div className="quantity-row">
                  <button type="button" onClick={() => updateQuantity(item.id, item.customizations, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, item.customizations, 1)}>+</button>
                </div>
                <div className="cart-item-meta">
                  <span>₹{item.price * item.quantity}</span>
                  <span>{JSON.stringify(item.customizations) !== '{}' ? 'Customized' : 'Regular'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="checkout-summary">
          <h3>Bill details</h3>
          <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
          <div className="summary-row"><span>Delivery Fee</span><strong>₹{deliveryFee}</strong></div>
          <div className="summary-row"><span>Platform Fee</span><strong>₹{platformFee}</strong></div>
          <div className="summary-row"><span>Taxes</span><strong>₹{taxes}</strong></div>
          <div className="summary-row"><span>Discount</span><strong>-₹{discount}</strong></div>
          <div className="summary-row total"><span>Grand Total</span><strong>₹{total}</strong></div>
          <Link to="/checkout" className="primary-btn block-btn">Proceed to checkout</Link>
        </aside>
      </div>
    </div>
  )
}
