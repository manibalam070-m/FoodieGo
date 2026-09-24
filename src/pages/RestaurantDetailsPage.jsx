import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import { mockFoods } from '../data/foods'
import { useCartContext } from '../context/CartContext'
import { useFavoritesContext } from '../context/FavoritesContext'

export default function RestaurantDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCartContext()
  const { favorites, setFavorites } = useFavoritesContext()
  const [selectedCategory, setSelectedCategory] = useState('Recommended')

  const restaurant = restaurants.find((item) => item.id === id)
  const menu = useMemo(() => mockFoods.filter((food) => food.restaurantId === id).slice(0, 12), [id])

  if (!restaurant) {
    return <div className="empty-state"><h3>Restaurant not found</h3><Link to="/restaurants" className="primary-btn">Back to restaurants</Link></div>
  }

  const categories = ['Recommended', 'Starters', 'Main Course', 'Biryani', 'Pizza', 'Burgers', 'Desserts', 'Drinks']

  function toggleFavorite() {
    setFavorites((current) => {
      const exists = current.restaurants.includes(restaurant.id)
      return {
        ...current,
        restaurants: exists ? current.restaurants.filter((item) => item !== restaurant.id) : [...current.restaurants, restaurant.id],
      }
    })
  }

  return (
    <div className="restaurant-details-page">
      <div className="restaurant-cover">
        <img src={restaurant.image} alt={restaurant.name} />
      </div>

      <div className="restaurant-profile-row">
        <img src={restaurant.logo} alt={restaurant.name} className="restaurant-logo" />
        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisine} • {restaurant.address}</p>
        </div>
        <div className="restaurant-info-box">
          <span>⭐ {restaurant.rating}</span>
          <span>{restaurant.reviews} reviews</span>
        </div>
      </div>

      <div className="restaurant-summary-grid">
        <div>Delivery time: {restaurant.deliveryTime} min</div>
        <div>Delivery fee: ₹{restaurant.deliveryFee}</div>
        <div>Opening hours: 11:00 AM - 11:00 PM</div>
        <div>About: Fresh, flavorful, and crafted for your cravings.</div>
      </div>

      <div className="filter-tabs">
        {categories.map((category) => (
          <button key={category} type="button" className={selectedCategory === category ? 'active' : ''} onClick={() => setSelectedCategory(category)}>{category}</button>
        ))}
      </div>

      <div className="restaurant-food-grid">
        {menu.filter((food) => selectedCategory === 'Recommended' || food.category === selectedCategory || selectedCategory === 'Burgers' && food.category === 'Burger').map((food) => (
          <div key={food.id} className="food-card detail-food-card">
            <div className="food-image-wrap">
              <img src={food.image} alt={food.name} />
              <button type="button" className={`favorite-btn ${favorites.foods.includes(food.id) ? 'active' : ''}`} onClick={() => { setFavorites((current) => ({ ...current, foods: current.foods.includes(food.id) ? current.foods.filter((id) => id !== food.id) : [...current.foods, food.id] })); }} aria-label={`Favorite ${food.name}`}>{favorites.foods.includes(food.id) ? '♥' : '♡'}</button>
            </div>
            <div className="food-card-body">
              <div className="food-line">
                <h3>{food.name}</h3>
                <span className="veg-dot">{food.veg ? '🥬' : '🍗'}</span>
              </div>
              <p>{food.description}</p>
              <div className="food-meta">
                <span>⭐ {food.rating}</span>
                <span>{food.calories} cal</span>
              </div>
              <div className="food-footer">
                <strong>₹{food.price}</strong>
                <button type="button" className="primary-btn small" onClick={() => addToCart({ ...food, restaurantId: restaurant.id }, 1, { size: 'Regular' })}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
