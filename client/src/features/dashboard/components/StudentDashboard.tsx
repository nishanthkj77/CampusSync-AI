 import { useEffect, useState } from 'react'
import {
  CalendarClock,
  ClipboardList,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getStudentProfile } from '../services/dashboard.service'

type StudentProfileData = {
  modules: string[]
}

const StudentDashboard = () => {
  const [data, setData] = useState<StudentProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const result = await getStudentProfile()
        setData(result)
      } catch {
        setError('Unable to load student dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-line bg-panel p-6 text-slate">
        Loading student dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-bad/30 bg-bad/10 p-6 text-bad">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-line bg-panel p-6">
        <p className="mono-label text-xs text-signal">Student workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Your academic command center
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          View your timetable, attendance, complaints, announcements, and
          academic updates in one place.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {data?.modules.map((module) => (
            <span
              key={module}
              className="rounded-md border border-line bg-ink-soft px-3 py-1.5 text-xs text-slate"
            >
              {module}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Today Classes"
          value="06"
          description="Scheduled academic sessions"
          icon={CalendarClock}
        />

        <StatsCard
          title="Attendance"
          value="91%"
          description="Current semester average"
          icon={TrendingUp}
        />

        <StatsCard
          title="Assignments"
          value="04"
          description="Pending academic submissions"
          icon={GraduationCap}
        />

        <StatsCard
          title="Complaints"
          value="02"
          description="Active service requests"
          icon={ClipboardList}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            Today&apos;s Timetable
          </h3>

          <div className="mt-6 space-y-3">
            {[
              ['09:00 AM', 'DBMS', 'Room B-204'],
              ['11:00 AM', 'Artificial Intelligence Lab', 'Lab 3'],
              ['01:30 PM', 'Software Project Management', 'Room A-102'],
            ].map(([time, subject, room]) => (
              <div
                key={subject}
                className="flex items-center justify-between rounded-md bg-ink-soft p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-paper">{subject}</p>
                  <p className="mt-1 text-xs text-slate">{room}</p>
                </div>

                <span className="font-mono text-xs text-signal">{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            Smart Alerts
          </h3>

          <div className="mt-6 space-y-3">
            <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
              Your attendance is strong, but AI Lab attendance needs attention.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              New announcement published by MCA department.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentDashboard