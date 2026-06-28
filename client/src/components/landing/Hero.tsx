 import { ArrowUpRight, CircleDot } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '../common/BadgeTemp'
import Button from '../common/Button'

const campusMetrics = [
  ['98%', 'Schedule accuracy'],
  ['24/7', 'AI assistance'],
  ['10K+', 'Campus users'],
]

const scheduleRows = [
  { time: '09:00', course: 'DBMS Lecture', room: 'B-204', status: 'confirmed' },
  { time: '11:00', course: 'AI Lab Session', room: 'Lab-3', status: 'optimized' },
  { time: '13:00', course: 'Faculty Review', room: 'Conf-1', status: 'pending' },
  { time: '15:00', course: 'Hostel Maintenance', room: 'Block-C', status: 'flagged' },
]

const statusStyle: Record<string, string> = {
  confirmed: 'text-good',
  optimized: 'text-signal',
  pending: 'text-slate',
  flagged: 'text-bad',
}

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink px-6 pt-32">
      <div className="grid-texture grid-fade absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-16 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <Badge>SIH 2026 — Campus operations platform</Badge>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl md:text-6xl">
            One schedule.
            <br />
            Every campus operation, <span className="text-signal">in sync.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate sm:text-lg">
            CampusSync AI unifies timetable scheduling, attendance, complaints,
            announcements, and resource booking into one intelligent campus
            management platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button onClick={() => navigate('/login')}>
              Explore platform <ArrowUpRight size={16} />
            </Button>
            <Button variant="secondary" onClick={() => navigate('/register')}>
              Create account
            </Button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line">
            {campusMetrics.map(([value, label]) => (
              <div key={label} className="bg-ink-soft px-4 py-4">
                <p className="font-display text-2xl font-semibold text-paper">
                  {value}
                </p>
                <p className="mono-label mt-1 text-[11px] text-slate-dim">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-line bg-panel">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="font-display text-sm font-semibold text-paper">
                Today — Block A Schedule
              </p>
              <p className="mono-label mt-1 text-[11px] text-slate-dim">
                Live operations feed
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-sm bg-good/10 px-2.5 py-1 text-[11px] font-medium text-good">
              <CircleDot size={11} />
              LIVE
            </span>
          </div>

          <div className="divide-y divide-line">
            {scheduleRows.map((row) => (
              <div
                key={row.time}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4"
              >
                <span className="font-mono text-xs text-slate-dim">
                  {row.time}
                </span>
                <div>
                  <p className="text-sm font-medium text-paper">{row.course}</p>
                  <p className="mt-0.5 text-xs text-slate">{row.room}</p>
                </div>
                <span className={`mono-label text-[10px] ${statusStyle[row.status]}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-line bg-signal-soft px-5 py-4">
            <p className="mono-label text-[11px] font-medium text-signal">
              AI recommendation
            </p>
            <p className="mt-2 text-sm leading-6 text-paper-dim">
              Move Lab Session B to 14:00 to resolve the room conflict in Block
              A and free up faculty for review.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero