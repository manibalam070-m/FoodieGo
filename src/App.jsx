import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { NotificationProvider } from './context/NotificationContext'
import { OrderProvider } from './context/OrderContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import RestaurantDetailsPage from './pages/RestaurantDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrdersPage from './pages/OrdersPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import FavoritesPage from './pages/FavoritesPage'
import OffersPage from './pages/OffersPage'
import ProfilePage from './pages/ProfilePage'
import AddressesPage from './pages/AddressesPage'
import NotificationsPage from './pages/NotificationsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RestaurantProvider>
          <CartProvider>
            <FavoritesProvider>
              <OrderProvider>
                <NotificationProvider>
                  <BrowserRouter>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/restaurants" element={<RestaurantsPage />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-success" element={<OrderSuccessPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/orders/:id" element={<OrderTrackingPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/offers" element={<OffersPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/addresses" element={<AddressesPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>
                    </Layout>
                  </BrowserRouter>
                </NotificationProvider>
              </OrderProvider>
            </FavoritesProvider>
          </CartProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
