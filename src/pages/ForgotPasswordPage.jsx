import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset password</h1>
        <p>We’ll send a reset link to your email.</p>
        <div className="auth-form">
          <input type="email" placeholder="Email address" />
          <button type="button" className="primary-btn block-btn">Send reset link</button>
          <Link to="/login" className="auth-links">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
