import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p>Join FoodieGo and enjoy restaurant perks.</p>
        <div className="auth-form">
          <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="password-box">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" className="text-button" onClick={() => setShowPassword((x) => !x)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <button type="button" className="primary-btn block-btn">Register</button>
          <div className="auth-links">
            <Link to="/login">Already have an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
