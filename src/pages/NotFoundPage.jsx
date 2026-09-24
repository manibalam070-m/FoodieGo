import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="empty-state">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>The route you are looking for does not exist.</p>
      <Link to="/" className="primary-btn">Go home</Link>
    </div>
  )
}
