import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FuturisticBackground from '../../components/ui/FuturisticBackground'
import PageMotion from '../../components/ui/PageMotion'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error, isAuthenticated, clearError } = useAuth()
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '',
    phone: ''
  })
  const [localError, setLocalError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (event) => {
    event.preventDefault()
    setLocalError('')
    
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email.includes('@') || form.password.length < 6 || !form.phone) {
      setLocalError('Fill all fields with valid values.')
      return
    }

    const result = await register(form)
    
    if (result.success) {
      navigate('/dashboard', { replace: true })
    } else {
      setLocalError(result.error)
    }
  }

  return (
    <div className="app-shell flex items-center justify-center p-6">
      <FuturisticBackground />
      <PageMotion>
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-md rounded-2xl p-6 glass glow-border">
          <h1 className="text-3xl font-semibold gradient-text">Create Account</h1>
          <p className="mt-1 text-sm text-slate-300">Join Salood in seconds</p>
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input 
                className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" 
                placeholder="First name" 
                value={form.firstName} 
                onChange={(event) => setForm({ ...form, firstName: event.target.value })} 
              />
              <input 
                className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" 
                placeholder="Last name" 
                value={form.lastName} 
                onChange={(event) => setForm({ ...form, lastName: event.target.value })} 
              />
            </div>
            <input 
              className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" 
              placeholder="Email" 
              value={form.email} 
              onChange={(event) => setForm({ ...form, email: event.target.value })} 
            />
            <input 
              className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" 
              placeholder="Phone number" 
              value={form.phone} 
              onChange={(event) => setForm({ ...form, phone: event.target.value })} 
            />
            <input 
              className="w-full rounded-xl border border-white/15 bg-slate-950/50 p-3 text-sm" 
              placeholder="Password" 
              type="password" 
              value={form.password} 
              onChange={(event) => setForm({ ...form, password: event.target.value })} 
            />
          </div>
          {(localError || error) && <p className="mt-3 text-sm text-rose-300">{localError || error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-indigo-400/25 p-3 font-medium text-indigo-100 hover:bg-indigo-400/35 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <button type="button" className="rounded-xl border border-white/15 p-2">Google</button>
            <button type="button" className="rounded-xl border border-white/15 p-2">Facebook</button>
          </div>
          <p className="mt-5 text-sm text-slate-300">
            Already registered? <Link to="/auth/login" className="text-cyan-300">Login</Link>
          </p>
        </form>
      </PageMotion>
    </div>
  )
}

export default RegisterPage
