import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import LoanForm from './components/LoanForm.jsx'
import LoanList from './components/LoanList.jsx'
import LoginForm from './components/LoginForm.jsx'
import SearchBox from './components/SearchBox.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { getSession, onAuthStateChange, signIn, signOut } from './lib/auth.js'
import { toIsoDate } from './lib/dateFormat.js'
import { filterLoansByFriend, markReturned, unmarkReturned } from './lib/loanRules.js'
import { fetchLoans, insertLoan, updateLoan } from './lib/loansApi.js'
import { getInitialTheme, saveTheme, toggleTheme } from './lib/theme.js'

function App() {
  // undefined = ยังไม่รู้สถานะ, null = ยังไม่เข้าสู่ระบบ, object = เข้าสู่ระบบแล้ว
  const [session, setSession] = useState(undefined)
  const [loans, setLoans] = useState([])
  const [warning, setWarning] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState(() =>
    getInitialTheme(undefined, window.matchMedia('(prefers-color-scheme: dark)').matches),
  )

  // ตั้งธีมให้ <html> ก่อนวาดหน้าจอ เพื่อไม่ให้จอกะพริบ
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // เช็ค session ตอนเปิดหน้า แล้วฟังการเข้า/ออกจากระบบต่อจากนั้น
  useEffect(() => {
    getSession().then(setSession)
    return onAuthStateChange(setSession)
  }, [])

  // โหลด Loan ใหม่ทุกครั้งที่เข้าสู่ระบบสำเร็จ เคลียร์รายการเมื่อออกจากระบบ
  useEffect(() => {
    if (!session) {
      setLoans([])
      return
    }
    fetchLoans().then(({ loans: fetched, warning: loadWarning }) => {
      setLoans(fetched)
      setWarning(loadWarning)
    })
  }, [session])

  const handleToggleTheme = () => {
    const next = toggleTheme(theme)
    setTheme(next)
    saveTheme(next)
  }

  const handleSignIn = async (email, password) => {
    const { error } = await signIn(email, password)
    return error
  }

  const today = toIsoDate(new Date())
  const editingLoan = loans.find((loan) => loan.id === editingId) ?? null
  const visibleLoans = filterLoansByFriend(loans, query)

  // เพิ่มใหม่ (ไม่มี id) หรือแก้ไขรายการเดิม (มี id) บันทึกที่ Supabase ก่อน แล้วค่อยอัปเดตหน้าจอ
  const handleSave = async (loan) => {
    const { loan: saved, warning: saveWarning } = loan.id
      ? await updateLoan(loan)
      : await insertLoan(loan)
    setWarning(saveWarning)
    if (saved) {
      setLoans(loan.id ? loans.map((l) => (l.id === saved.id ? saved : l)) : [...loans, saved])
    }
    setEditingId(null)
  }

  const replaceLoan = async (target, update) => {
    const { loan: saved, warning: saveWarning } = await updateLoan(update(target))
    setWarning(saveWarning)
    if (saved) setLoans(loans.map((l) => (l.id === saved.id ? saved : l)))
  }

  const handleMarkReturned = (loan, returnedDate) =>
    replaceLoan(loan, (l) => markReturned(l, today, returnedDate))

  const handleUnmarkReturned = (loan) => replaceLoan(loan, unmarkReturned)

  if (session === undefined) {
    return (
      <main>
        <p>กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main>
        <header className="app-header">
          <h1>Borrow Buddy</h1>
          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
        </header>
        <LoginForm onSignIn={handleSignIn} />
      </main>
    )
  }

  return (
    <main>
      <header className="app-header">
        <h1>Borrow Buddy</h1>
        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
          <button type="button" onClick={() => signOut()}>
            ออกจากระบบ
          </button>
        </div>
      </header>
      {warning && <p role="alert">{warning}</p>}
      <LoanForm
        key={editingLoan?.id ?? 'new'}
        today={today}
        editingLoan={editingLoan}
        onSave={handleSave}
        onCancelEdit={() => setEditingId(null)}
      />
      <SearchBox value={query} onChange={setQuery} />
      <LoanList
        loans={visibleLoans}
        today={today}
        onMarkReturned={handleMarkReturned}
        onUnmarkReturned={handleUnmarkReturned}
        onEdit={(loan) => setEditingId(loan.id)}
      />
    </main>
  )
}

export default App
