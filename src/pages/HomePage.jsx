import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { foods, mockFoods } from '../data/foods'
import { offers } from '../data/offers'
import { restaurants } from '../data/restaurants'
import { useCartContext } from '../context/CartContext'
import { useFavoritesContext } from '../context/FavoritesContext'

const suggestionTerms = ['Pizza', 'Biryani', 'Burger', 'Healthy', 'Desserts', 'South Indian']

export default function HomePage() {
  const { addToCart } = useCartContext()
  const { favorites, setFavorites } = useFavoritesContext()
  const [search, setSearch] = useState('')

  const restaurantList = useMemo(() => restaurants.slice(0, 8), [])
  const foodList = useMemo(() => mockFoods.slice(0, 8), [])

  function toggleFavorite(item, type) {
    setFavorites((current) => {
      const key = type === 'restaurant' ? 'restaurants' : 'foods'
      const exists = current[key].includes(item.id)
      return {
        ...current,
        [key]: exists ? current[key].filter((id) => id !== item.id) : [...current[key], item.id],
      }
    })
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">FoodieGo • Good food. Great mood. Delivered.</span>
          <h1>Craving something delicious?</h1>
          <p>Discover amazing food from your favorite restaurants and get it delivered to your doorstep.</p>
          <div className="hero-actions">
            <Link to="/restaurants" className="primary-btn">Explore Restaurants</Link>
            <Link to="/offers" className="secondary-btn">View Offers</Link>
          </div>
          <div className="search-suggestion-box">
            {suggestionTerms.map((term) => (
              <button key={term} type="button" className="chip-button" onClick={() => setSearch(term)}>{term}</button>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-card hero-card-main">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" alt="Signature meal" />
          </div>
          <div className="hero-badge hero-badge-one">⭐ 4.8 Rated</div>
          <div className="hero-badge hero-badge-two">Fast Delivery</div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Popular Categories</h2>
          <Link to="/restaurants">See all</Link>
        </div>
        <div className="category-row">
          {categories.map((item) => (
            <Link key={item.id} to={`/restaurants?category=${item.id}`} className="category-card">
              <span className="category-icon">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Popular Restaurants</h2>
          <Link to="/restaurants">View all</Link>
        </div>
        <div className="restaurant-grid">
          {restaurantList.map((restaurant) => {
            const isFav = favorites.restaurants.includes(restaurant.id)
            return (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image-wrap">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <button type="button" className={`favorite-btn ${isFav ? 'active' : ''}`} aria-label={`Favorite ${restaurant.name}`} onClick={() => toggleFavorite(restaurant, 'restaurant')}>
                    {isFav ? '♥' : '♡'}
                  </button>
                  <span className="promo-tag">{restaurant.discount}</span>
                </div>
                <div className="restaurant-card-body">
                  <div className="restaurant-title-row">
                    <h3>{restaurant.name}</h3>
                    <span className="rating-pill">⭐ {restaurant.rating}</span>
                  </div>
                  <p className="muted-text">{restaurant.cuisine}</p>
                  <div className="meta-row">
                    <span>{restaurant.deliveryTime} min</span>
                    <span>₹{restaurant.deliveryFee} delivery</span>
                    <span>₹{restaurant.priceForTwo} for two</span>
                  </div>
                  <div className="status-row">
                    <span className={restaurant.open ? 'status open' : 'status closed'}>{restaurant.open ? 'Open' : 'Closed'}</span>
                    <span>{restaurant.reviews} reviews</span>
                  </div>
                  <Link to={`/restaurant/${restaurant.id}`} className="small-link">View restaurant</Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Trending Food</h2>
          <Link to="/restaurants">Explore</Link>
        </div>
        <div className="food-grid">
          {foodList.map((food) => {
            const isFav = favorites.foods.includes(food.id)
            return (
              <div key={food.id} className="food-card">
                <div className="food-image-wrap">
                  <img src={food.image} alt={food.name} />
                  <button type="button" className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFavorite(food, 'food')} aria-label={`Favorite ${food.name}`}>
                    {isFav ? '♥' : '♡'}
                  </button>
                </div>
                <div className="food-card-body">
                  <div className="food-line">
                    <h3>{food.name}</h3>
                    <span className="veg-dot">{food.veg ? '🥬' : '🍗'}</span>
                  </div>
                  <p>{food.description}</p>
                  <div className="food-meta">
                    <span>⭐ {food.rating}</span>
                    <span>{food.restaurant}</span>
                  </div>
                  <div className="food-footer">
                    <strong>₹{food.price}</strong>
                    <button type="button" className="primary-btn small" onClick={() => addToCart(food, 1, { size: 'Regular' })}>Add</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Best offers for you</h2>
          <Link to="/offers">View all</Link>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-badge">{offer.title}</div>
              <h3>{offer.discount}</h3>
              <p>Code: {offer.code}</p>
              <div className="offer-meta">
                <span>Min order: {offer.minOrder}</span>
                <span>Ends {offer.expiry}</span>
              </div>
              <button type="button" className="secondary-btn small">Copy code</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
