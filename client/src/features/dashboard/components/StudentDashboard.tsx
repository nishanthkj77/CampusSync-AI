 import { useEffect, useState } from 'react'
import {
  CalendarClock,
  ClipboardList,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getStudentProfile } from '../services/dashboard.service'
import { getMyTimetable } from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import type { TimetableEntry } from '../../timetable/types/timetable.types'

type StudentProfileData = {
  modules: string[]
}

const StudentDashboard = () => {
  const [profileData, setProfileData] = useState<StudentProfileData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [profileResult, timetableResult] = await Promise.all([
          getStudentProfile(),
          getMyTimetable(),
        ])

        setProfileData(profileResult)
        setTimetables(timetableResult)
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
          {profileData?.modules.map((module) => (
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
          value={String(timetables.length)}
          description="Timetable entries from backend"
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

      <TimetableList title="My Timetable from Backend" timetables={timetables} />

      <section className="rounded-lg border border-line bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper">
          Smart Alerts
        </h3>

        <div className="mt-6 space-y-3">
          <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
            Your timetable is now loaded from MongoDB through protected backend
            APIs.
          </p>

          <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
            Next AI module will detect timetable conflicts automatically.
          </p>
        </div>
      </section>
    </div>
  )
}

export default StudentDashboard