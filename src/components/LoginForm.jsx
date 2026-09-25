import { useState } from 'react'

// หน้าเข้าสู่ระบบ ไม่มีลิงก์สมัครสมาชิก/ลืมรหัสผ่าน (ปิดการสมัครสมาชิกเอง นอกขอบเขต)
export default function LoginForm({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const message = await onSignIn(email, password)
    setSubmitting(false)
    if (message) setError(message)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>เข้าสู่ระบบ</h2>

      <label>
        อีเมล
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
      </label>

      <label>
        รหัสผ่าน
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      {error && (
        <ul role="alert">
          <li>{error}</li>
        </ul>
      )}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </div>
    </form>
  )
}
