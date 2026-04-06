import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FuturisticBackground from '../../components/ui/FuturisticBackground'
import PageMotion from '../../components/ui/PageMotion'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!form.email.includes('@') || form.password.length < 6) {
      setError('Enter a valid email and password (min 6 chars).')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="app-shell flex items-center justify-center p-6">
      <FuturisticBackground />
      <PageMotion>
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-md rounded-2xl p-6 glass glow-border">
          <h1 className="text-3xl font-semibold gradient-text">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-300">Login to continue booking with Salood</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <input className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </div>
          {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
          <button type="submit" className="mt-5 w-full rounded-xl bg-cyan-400/20 p-3 font-medium text-cyan-100 hover:bg-cyan-400/30">Login</button>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <button type="button" className="rounded-xl border border-white/15 p-2">Google</button>
            <button type="button" className="rounded-xl border border-white/15 p-2">Apple</button>
          </div>
          <p className="mt-5 text-sm text-slate-300">
            New here? <Link to="/auth/register" className="text-cyan-300">Create account</Link>
          </p>
        </form>
      </PageMotion>
    </div>
  )
}

export default LoginPage
