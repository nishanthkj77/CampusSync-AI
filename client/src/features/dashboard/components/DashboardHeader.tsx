import { LogOut, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import { removeToken } from '../../../utils/token'

const DashboardHeader = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    removeToken()
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-line bg-ink/95 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <p className="mono-label text-xs text-signal">CampusSync AI</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-paper">
            {user?.role?.toUpperCase()} Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 rounded-lg border border-line bg-panel px-4 py-3 md:flex">
            <UserRound size={18} className="text-signal" />
            <div>
              <p className="text-sm font-medium text-paper">
                {user?.fullName || 'Campus User'}
              </p>
              <p className="text-xs text-slate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-slate transition hover:border-paper-dim hover:text-paper"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader