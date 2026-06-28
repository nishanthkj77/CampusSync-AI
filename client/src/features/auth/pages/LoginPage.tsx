 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import RoleSelector from '../components/RoleSelector'
import type { UserRole } from '../types/auth.types'
import { useAuthStore } from '../../../store/authStore'
import { loginUser } from '../services/auth.service'
import { setToken } from '../../../utils/token'

const LoginPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [role, setRole] = useState<UserRole>('student')
  const [email, setEmail] = useState('student@test.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const result = await loginUser({
        email,
        password,
      })

      if (result.user.role !== role) {
        setError(`This account is registered as ${result.user.role}. Please select the correct role.`)
        return
      }

      setToken(result.token)
      login(result.user, result.token)

      navigate('/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login using your campus account to access your role-based dashboard."
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <RoleSelector selectedRole={role} onRoleChange={setRole} />

        {error && (
          <div className="flex gap-3 rounded-md border border-bad/30 bg-bad/10 px-4 py-3 text-sm leading-6 text-bad">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Email Address
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="student@campus.edu"
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none transition placeholder:text-slate-dim focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Password
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none transition placeholder:text-slate-dim focus:border-signal"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Logging in...' : 'Login to Dashboard'}
          {!isLoading && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-sm text-slate">
          New to CampusSync AI?{' '}
          <Link
            to="/register"
            className="font-semibold text-signal transition hover:text-[#ff9c5c]"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage