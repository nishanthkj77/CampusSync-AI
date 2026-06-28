import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const dashboardCards = [
  ['Today’s Classes', '08', '2 rooms optimized'],
  ['Open Complaints', '06', '3 high priority'],
  ['Attendance Alerts', '12', 'Students at risk'],
  ['Available Labs', '04', 'Ready for booking'],
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              CampusSync AI Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              Welcome, {user?.fullName}
            </h1>
            <p className="mt-2 text-slate-400">
              Role: <span className="capitalize text-cyan-300">{user?.role}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2 font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map(([title, value, subtitle]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-500/5">
              <p className="text-sm text-slate-400">{title}</p>
              <h2 className="mt-3 text-4xl font-black text-cyan-300">{value}</h2>
              <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">AI Operations Timeline</h2>
            <div className="mt-6 space-y-4">
              {[
                'AI resolved timetable conflict between MCA Lab and DBMS lecture.',
                'Complaint priority detected: hostel water issue marked HIGH.',
                'Attendance warning generated for 12 students below threshold.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
            <h2 className="text-xl font-bold text-cyan-200">AI Recommendation</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Move Lab Session B to 2:00 PM to reduce room conflict and improve faculty availability.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
