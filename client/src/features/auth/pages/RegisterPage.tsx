import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import RoleSelector from '../components/RoleSelector'
import type { UserRole } from '../types/auth.types'
import { useAuthStore } from '../../../store/authStore'

const RegisterPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [role, setRole] = useState<UserRole>('student')
  const [fullName, setFullName] = useState('Demo Student')
  const [email, setEmail] = useState('student@campus.edu')

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    login(
      {
        id: 'new-user-1',
        fullName,
        email,
        role,
      },
      'demo-token'
    )

    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to join the CampusSync AI platform."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        <RoleSelector selectedRole={role} onRoleChange={setRole} />

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
            type="password"
            placeholder="Create a password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
