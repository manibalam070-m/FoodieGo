import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import { useFavoritesContext } from '../context/FavoritesContext'

const priceRange = ['Any', 'Under ₹300', '₹300-₹500', '₹500+']

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [cuisine, setCuisine] = useState('All')
  const [rating, setRating] = useState('Any')
  const [price, setPrice] = useState('Any')
  const [vegOnly, setVegOnly] = useState(false)
  const [openOnly, setOpenOnly] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const { favorites, setFavorites } = useFavoritesContext()

  useEffect(() => {
    const term = searchParams.get('search') || ''
    setQuery(term)
  }, [searchParams])

  const filteredResults = useMemo(() => {
    let list = [...restaurants]
    if (query) {
      list = list.filter((restaurant) => {
        const text = `${restaurant.name} ${restaurant.cuisine} ${restaurant.tags.join(' ')}`.toLowerCase()
        return text.includes(query.toLowerCase())
      })
    }
    if (cuisine !== 'All') {
      list = list.filter((restaurant) => restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase()))
    }
    if (rating !== 'Any') {
      const minRating = Number(rating)
      list = list.filter((restaurant) => restaurant.rating >= minRating)
    }
    if (price !== 'Any') {
      if (price === 'Under ₹300') list = list.filter((restaurant) => restaurant.priceForTwo < 300)
      if (price === '₹300-₹500') list = list.filter((restaurant) => restaurant.priceForTwo >= 300 && restaurant.priceForTwo <= 500)
      if (price === '₹500+') list = list.filter((restaurant) => restaurant.priceForTwo > 500)
    }
    if (vegOnly) list = list.filter((restaurant) => restaurant.tags.some((tag) => tag.toLowerCase().includes('veg')))
    if (openOnly) list = list.filter((restaurant) => restaurant.open)

    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'delivery') list.sort((a, b) => a.deliveryTime - b.deliveryTime)
    if (sortBy === 'price-low') list.sort((a, b) => a.priceForTwo - b.priceForTwo)
    if (sortBy === 'price-high') list.sort((a, b) => b.priceForTwo - a.priceForTwo)

    return list
  }, [query, cuisine, rating, price, vegOnly, openOnly, sortBy])

  function toggleFavorite(restaurantId) {
    setFavorites((current) => {
      const exists = current.restaurants.includes(restaurantId)
      return {
        ...current,
        restaurants: exists ? current.restaurants.filter((id) => id !== restaurantId) : [...current.restaurants, restaurantId],
      }
    })
  }

  return (
    <div className="restaurants-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Discover</p>
          <h1>Restaurants near you</h1>
        </div>
        <div className="sort-controls">
          <label>
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="rating">Rating</option>
              <option value="delivery">Delivery time</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </label>
        </div>
      </section>

      <div className="filter-bar">
        <input value={query} onChange={(e) => { setQuery(e.target.value); setSearchParams({ search: e.target.value }) }} placeholder="Search restaurants" aria-label="Search restaurants" />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="All">Cuisine</option>
          <option value="South Indian">South Indian</option>
          <option value="Biryani">Biryani</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Chinese">Chinese</option>
          <option value="Healthy">Healthy</option>
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="Any">Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4.7">4.7+</option>
          <option value="4.8">4.8+</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="Any">Price</option>
          {priceRange.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <label className="toggle-option"><input type="checkbox" checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} /> Vegetarian</label>
        <label className="toggle-option"><input type="checkbox" checked={openOnly} onChange={() => setOpenOnly(!openOnly)} /> Open now</label>
      </div>

      <div className="restaurant-grid">
        {filteredResults.length ? filteredResults.map((restaurant) => {
          const isFav = favorites.restaurants.includes(restaurant.id)
          return (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image-wrap">
                <img src={restaurant.image} alt={restaurant.name} />
                <button type="button" className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFavorite(restaurant.id)} aria-label={`Favorite ${restaurant.name}`}>
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
        }) : <div className="empty-state full-width"><h3>No restaurants found</h3><p>Try a different cuisine or search term.</p><Link to="/restaurants" className="primary-btn">Clear filters</Link></div> }
      </div>
    </div>
  )
}
