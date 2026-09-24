import { Link } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import { mockFoods } from '../data/foods'
import { useFavoritesContext } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavoritesContext()
  const favoritedRestaurants = restaurants.filter((restaurant) => favorites.restaurants.includes(restaurant.id))
  const favoritedFoods = mockFoods.filter((food) => favorites.foods.includes(food.id))

  return (
    <div className="favorites-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Saved items</p>
          <h1>Favorites</h1>
        </div>
      </section>

      <div className="favorite-sections">
        <div className="panel-card">
          <h3>Favorite restaurants</h3>
          {favoritedRestaurants.length ? favoritedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="favorite-row">
              <span>{restaurant.name}</span>
              <Link to={`/restaurant/${restaurant.id}`} className="small-link">View</Link>
            </div>
          )) : <p>No favorite restaurants yet.</p>}
        </div>

        <div className="panel-card">
          <h3>Favorite food</h3>
          {favoritedFoods.length ? favoritedFoods.map((food) => (
            <div key={food.id} className="favorite-row">
              <span>{food.name}</span>
              <Link to={`/restaurant/${food.restaurantId}`} className="small-link">Add to cart</Link>
            </div>
          )) : <p>No favorite food items yet.</p>}
        </div>
      </div>
    </div>
  )
}
