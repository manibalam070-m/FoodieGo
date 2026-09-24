import { offers } from '../data/offers'

export default function OffersPage() {
  return (
    <div className="offers-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Savings</p>
          <h1>Offers</h1>
        </div>
      </section>
      <div className="offer-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card large">
            <div className="offer-badge">{offer.title}</div>
            <h3>{offer.discount}</h3>
            <p>Coupon: {offer.code}</p>
            <div className="offer-meta">
              <span>Min order: {offer.minOrder}</span>
              <span>Valid till {offer.expiry}</span>
            </div>
            <button type="button" className="primary-btn small">Copy code</button>
          </div>
        ))}
      </div>
    </div>
  )
}
