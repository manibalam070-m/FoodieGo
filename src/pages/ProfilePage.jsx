import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuthContext()

  return (
    <div className="profile-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">My account</p>
          <h1>Profile</h1>
        </div>
      </section>

      <div className="profile-layout">
        <div className="panel-card profile-card">
          <img src={user.avatar} alt={user.name} className="profile-avatar-large" />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>

        <div className="panel-card">
          <h3>Personal information</h3>
          <div className="profile-info-grid">
            <div><span>Name</span><strong>{user.name}</strong></div>
            <div><span>Email</span><strong>{user.email}</strong></div>
            <div><span>Phone</span><strong>{user.phone}</strong></div>
            <div><span>Location</span><strong>{user.location}</strong></div>
          </div>
        </div>

        <div className="panel-card">
          <h3>Quick links</h3>
          <div className="profile-links">
            <Link to="/orders">Orders</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/profile/addresses">Addresses</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
