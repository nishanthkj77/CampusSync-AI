 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
      setError('Registration failed. Email may already exist.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to join the CampusSync AI platform."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        <RoleSelector selectedRole={role} onRoleChange={setRole} />

        {error && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="name@campus.edu"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Create a password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage