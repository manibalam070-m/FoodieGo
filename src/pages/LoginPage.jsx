import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to continue your foodie journey.</p>
        <div className="auth-form">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="password-box">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" className="text-button" onClick={() => setShowPassword((x) => !x)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <label className="checkbox-row"><input type="checkbox" /> Remember me</label>
          <button type="button" className="primary-btn block-btn">Login</button>
          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
