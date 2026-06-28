import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import RoleSelector from '../components/RoleSelector'
import type { UserRole } from '../types/auth.types'
import { useAuthStore } from '../../../store/authStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [role, setRole] = useState<UserRole>('student')
  const [email, setEmail] = useState('demo@campus.edu')
  const [password, setPassword] = useState('password123')

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    login(
      {
        id: 'demo-user-1',
        fullName: role === 'admin' ? 'Admin User' : 'Demo User',
        email,
        role,
      },
      'demo-token'
    )

    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to access your CampusSync AI dashboard."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <RoleSelector selectedRole={role} onRoleChange={setRole} />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="student@campus.edu"
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
            placeholder="Enter your password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Login to Dashboard
        </button>

        <p className="text-center text-sm text-slate-400">
          New to CampusSync AI?{' '}
          <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
