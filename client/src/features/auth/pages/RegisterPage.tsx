 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import RoleSelector from '../components/RoleSelector'
import type { UserRole } from '../types/auth.types'
import { useAuthStore } from '../../../store/authStore'
import { registerUser } from '../services/auth.service'
import { setToken } from '../../../utils/token'

const RegisterPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [role, setRole] = useState<UserRole>('student')
  const [fullName, setFullName] = useState('Demo Student')
  const [email, setEmail] = useState('student2@campus.edu')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const result = await registerUser({
        name: fullName,
        email,
        password,
        role,
      })

      setToken(result.token)
      login(result.user, result.token)

      navigate('/dashboard')
    } catch {
      setError('Registration failed. This email may already be registered.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register as student, faculty, HOD, or admin to join CampusSync AI."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        <RoleSelector selectedRole={role} onRoleChange={setRole} />

        {error && (
          <div className="flex gap-3 rounded-md border border-bad/30 bg-bad/10 px-4 py-3 text-sm leading-6 text-bad">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none transition placeholder:text-slate-dim focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Email Address
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="name@campus.edu"
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
            placeholder="Create a password"
            minLength={6}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none transition placeholder:text-slate-dim focus:border-signal"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
          {!isLoading && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-sm text-slate">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-signal transition hover:text-[#ff9c5c]"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage