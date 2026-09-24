import { useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

const defaultAddress = {
  id: 'a1',
  fullName: 'Asha Raman',
  phone: '9876543210',
  door: '15',
  street: 'Lake View Road',
  area: 'Anna Nagar',
  city: 'Chennai',
  state: 'Tamil Nadu',
  pincode: '600040',
  type: 'Home',
  default: true,
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(() => readStorage(STORAGE_KEYS.addresses, [defaultAddress]))
  const [form, setForm] = useState(defaultAddress)

  function handleSave() {
    const cleaned = { ...form, id: form.id || Date.now().toString() }
    const nextList = addresses.some((item) => item.id === cleaned.id)
      ? addresses.map((item) => (item.id === cleaned.id ? cleaned : item))
      : [...addresses, cleaned]
    setAddresses(nextList)
    writeStorage(STORAGE_KEYS.addresses, nextList)
  }

  function handleDelete(id) {
    const nextList = addresses.filter((item) => item.id !== id)
    setAddresses(nextList)
    writeStorage(STORAGE_KEYS.addresses, nextList)
  }

  return (
    <div className="addresses-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Saved locations</p>
          <h1>Addresses</h1>
        </div>
      </section>

      <div className="address-layout">
        <div className="panel-card form-card">
          <h3>Add address</h3>
          <div className="input-grid">
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
            <input value={form.door} onChange={(e) => setForm({ ...form, door: e.target.value })} placeholder="Door / building" />
            <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="Street" />
            <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Area" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" />
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State" />
            <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="Pincode" />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="button" className="primary-btn" onClick={handleSave}>Save address</button>
        </div>

        <div className="panel-card">
          <h3>Saved addresses</h3>
          {addresses.map((address) => (
            <div key={address.id} className="saved-address-item">
              <div>
                <strong>{address.type}</strong>
                <p>{address.fullName} • {address.phone}</p>
                <p>{address.door}, {address.street}, {address.area}, {address.city}, {address.state} - {address.pincode}</p>
              </div>
              <div className="inline-actions">
                <button type="button" className="secondary-btn small" onClick={() => setForm(address)}>Edit</button>
                <button type="button" className="text-button" onClick={() => handleDelete(address.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
