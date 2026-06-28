 import {
  Bell,
  CalendarClock,
  ClipboardList,
  DoorOpen,
  LogOut,
  Megaphone,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { removeToken } from '../utils/token'

const cards = [
  {
    title: 'Today Classes',
    value: '06',
    description: 'Scheduled academic sessions',
    icon: CalendarClock,
  },
  {
    title: 'Attendance',
    value: '91%',
    description: 'Current semester average',
    icon: TrendingUp,
  },
  {
    title: 'Complaints',
    value: '12',
    description: 'Open campus service issues',
    icon: ClipboardList,
  },
  {
    title: 'Rooms Available',
    value: '18',
    description: 'Free classrooms and labs',
    icon: DoorOpen,
  },
]

const activity = [
  'AI resolved a lab scheduling conflict in Block A.',
  'New announcement published for MCA department.',
  'Hostel maintenance complaint moved to high priority.',
  'Attendance report generated for today.',
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    removeToken()
    logout()
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <header className="border-b border-line bg-ink/95 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="mono-label text-xs text-signal">CampusSync AI</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">
              Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-slate transition hover:border-paper-dim hover:text-paper"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-xl border border-line bg-panel p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mono-label text-xs text-signal">
                {user?.role || 'student'} workspace
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                Welcome, {user?.fullName || 'Campus User'}
              </h2>
              <p className="mt-2 text-sm text-slate">
                Monitor classes, attendance, complaints, announcements, and
                resources from one unified control center.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-line bg-ink-soft px-4 py-3">
              <UserRound size={20} className="text-signal" />
              <div>
                <p className="text-sm font-medium text-paper">{user?.email}</p>
                <p className="text-xs text-slate">Authenticated user</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-lg border border-line bg-panel p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-signal-soft text-signal">
                    <Icon size={21} />
                  </div>

                  <span className="mono-label text-[10px] text-slate-dim">
                    Live
                  </span>
                </div>

                <p className="mt-6 font-display text-4xl font-semibold text-paper">
                  {card.value}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-paper">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-slate">{card.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-lg border border-line bg-panel p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">
                Campus Operations
              </h3>
              <Bell size={18} className="text-signal" />
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-soft text-slate">
                  <tr>
                    <th className="px-4 py-3 font-medium">Module</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-3 text-paper">Timetable</td>
                    <td className="px-4 py-3 text-good">Optimized</td>
                    <td className="px-4 py-3 text-slate">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-paper">Attendance</td>
                    <td className="px-4 py-3 text-signal">Monitoring</td>
                    <td className="px-4 py-3 text-slate">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-paper">Complaints</td>
                    <td className="px-4 py-3 text-bad">Action Needed</td>
                    <td className="px-4 py-3 text-slate">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-panel p-6">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-signal" />
              <h3 className="font-display text-xl font-semibold">
                Recent Activity
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div key={item} className="rounded-md bg-ink-soft p-4">
                  <p className="text-sm leading-6 text-slate">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default DashboardPage