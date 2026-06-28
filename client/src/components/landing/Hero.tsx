import Badge from '../common/BadgeTemp'
import Button from '../common/Button'
import Card from '../common/Card'

const campusMetrics = [
  ['98%', 'Automation Accuracy'],
  ['24/7', 'AI Assistance'],
  ['10K+', 'Campus Users'],
]

const dashboardItems = [
  ['Today’s Schedule', '5 classes optimized', 'bg-cyan-400'],
  ['Complaint Queue', '3 urgent issues routed', 'bg-rose-400'],
  ['Lab Availability', 'AI Lab free at 2:00 PM', 'bg-emerald-400'],
  ['Attendance Risk', '12 students need attention', 'bg-amber-400'],
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,#06b6d433,transparent_35%),radial-gradient(circle_at_80%_30%,#3b82f633,transparent_30%),radial-gradient(circle_at_50%_90%,#8b5cf633,transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1fr_0.95fr]">
        <div className="max-w-3xl">
          <Badge>SIH 2026 • Intelligent Campus Management Platform</Badge>

          <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Transform campus operations with{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              AI intelligence
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            CampusSync AI unifies timetable scheduling, attendance monitoring,
            complaints, announcements, resource booking, and analytics into one
            enterprise-grade platform for modern institutions.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button>Explore Platform</Button>
            <Button variant="secondary">View Architecture</Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            {campusMetrics.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-2xl font-black text-cyan-300">{value}</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="relative p-4">
          <div className="rounded-2xl bg-slate-950/90 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  CampusSync Command Center
                </h3>
                <p className="text-sm text-slate-400">
                  Real-time AI campus operations
                </p>
              </div>

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                LIVE
              </span>
            </div>

            <div className="grid gap-4">
              {dashboardItems.map(([title, value, color]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start gap-4">
                    <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />

                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm text-slate-400">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-sm font-semibold text-cyan-300">
                AI Recommendation
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Move Lab Session B to 2:00 PM to reduce room conflict and improve
                faculty availability.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Hero