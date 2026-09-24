import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import { useOrderContext } from '../context/OrderContext'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

const mockCoupons = {
  FOODIE50: { type: 'percent', value: 50 },
  WELCOME100: { type: 'amount', value: 100 },
  FREEDELIVERY: { type: 'delivery', value: 35 },
  FIRSTORDER: { type: 'amount', value: 120 },
}

export default function CheckoutPage() {
  const { cart } = useCartContext()
  const { addOrder } = useOrderContext()
  const navigate = useNavigate()
  const [addressType, setAddressType] = useState('Home')
  const [selectedAddress, setSelectedAddress] = useState('Home')
  const [coupon, setCoupon] = useState('')
  const [couponMessage, setCouponMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const addresses = useMemo(() => readStorage(STORAGE_KEYS.addresses, [{ id: 'a1', label: 'Home', name: 'Asha Raman', phone: '9876543210', door: '15', street: 'Lake View Road', area: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600040', default: true }]), [])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 35
  const platformFee = 15
  const taxes = Math.round(subtotal * 0.05)
  const baseTotal = subtotal + deliveryFee + platformFee + taxes

  function applyCoupon() {
    const normalized = coupon.trim().toUpperCase()
    const match = mockCoupons[normalized]
    if (!match) {
      setCouponMessage('Invalid coupon code.')
      return
    }

    let discount = 0
    if (match.type === 'percent') discount = Math.round(baseTotal * (match.value / 100))
    if (match.type === 'amount') discount = match.value
    if (match.type === 'delivery') discount = 35

    setCouponMessage(`Coupon applied: ${normalized}`)
    writeStorage(STORAGE_KEYS.coupons, [{ code: normalized, discount }])
  }

  function placeOrder() {
    const orderId = `FDG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`
    const order = {
      id: orderId,
      restaurant: cart[0]?.restaurant || 'FoodieGo',
      status: 'active',
      items: cart.map((item) => item.name),
      total: baseTotal,
      date: new Date().toISOString(),
      address: `${selectedAddress} · ${addresses.find((a) => a.label === selectedAddress)?.street || 'Chennai'}`,
      eta: '25-30 min',
    }
    addOrder(order)
    navigate('/order-success', { state: { order } })
  }

  return (
    <div className="checkout-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h1>Checkout</h1>
        </div>
      </section>

      <div className="checkout-layout">
        <div className="checkout-column">
          <div className="panel-card">
            <h3>Delivery address</h3>
            <div className="address-tabs">
              {['Home', 'Work', 'Other'].map((type) => (
                <button key={type} type="button" className={addressType === type ? 'active' : ''} onClick={() => setAddressType(type)}>{type}</button>
              ))}
            </div>
            <div className="address-list">
              {addresses.map((address) => (
                <button key={address.id} type="button" className={`address-option ${selectedAddress === address.label ? 'selected' : ''}`} onClick={() => setSelectedAddress(address.label)}>
                  <strong>{address.label}</strong>
                  <span>{address.street}, {address.area}</span>
                </button>
              ))}
            </div>
            <Link to="/profile/addresses" className="secondary-btn small">Manage addresses</Link>
          </div>

          <div className="panel-card">
            <h3>Delivery options</h3>
            <div className="option-group">
              <label><input type="radio" name="delivery" defaultChecked /> Standard delivery</label>
              <label><input type="radio" name="delivery" /> Priority delivery</label>
              <label><input type="radio" name="delivery" /> Schedule delivery</label>
            </div>
          </div>

          <div className="panel-card">
            <h3>Payment</h3>
            <div className="payment-methods">
              <label><input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on Delivery</label>
              <label><input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /> UPI</label>
              <label><input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> Credit/Debit Card</label>
              <label><input type="radio" name="payment" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} /> Wallet</label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form">
                <input type="text" placeholder="Card number" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                <input type="text" placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                <div className="card-row">
                  <input type="text" placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                  <input type="text" placeholder="CVV" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="checkout-summary">
          <h3>Bill details</h3>
          <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
          <div className="summary-row"><span>Delivery Fee</span><strong>₹{deliveryFee}</strong></div>
          <div className="summary-row"><span>Platform Fee</span><strong>₹{platformFee}</strong></div>
          <div className="summary-row"><span>Taxes</span><strong>₹{taxes}</strong></div>
          <div className="coupon-box">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
            <button type="button" className="secondary-btn small" onClick={applyCoupon}>Apply</button>
          </div>
          {couponMessage && <p className="coupon-status">{couponMessage}</p>}
          <div className="summary-row total"><span>Grand Total</span><strong>₹{baseTotal}</strong></div>
          <button type="button" className="primary-btn block-btn" onClick={placeOrder}>Place Order</button>
        </aside>
      </div>
    </div>
  )
}
