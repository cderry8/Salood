import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FuturisticBackground from '../../components/ui/FuturisticBackground'
import PageMotion from '../../components/ui/PageMotion'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error, isAuthenticated, clearError } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [localError, setLocalError] = useState('')

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (event) => {
    event.preventDefault()
    setLocalError('')
    
    // Basic validation
    if (!form.email.includes('@') || form.password.length < 6) {
      setLocalError('Enter a valid email and password (min 6 chars).')
      return
    }

    const result = await login(form.email, form.password)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setLocalError(result.error)
    }
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
          {(localError || error) && <p className="mt-3 text-sm text-rose-300">{localError || error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-cyan-400/20 p-3 font-medium text-cyan-100 hover:bg-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
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
