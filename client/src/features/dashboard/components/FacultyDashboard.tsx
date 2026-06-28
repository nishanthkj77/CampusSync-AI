 import { useEffect, useState } from 'react'
import {
  CalendarClock,
  ClipboardCheck,
  Megaphone,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getFacultyClasses } from '../services/dashboard.service'
import { getMyTimetable } from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import type { TimetableEntry } from '../../timetable/types/timetable.types'

type FacultyClass = {
  course: string
  className: string
  time: string
  room: string
}

type FacultyDashboardData = {
  classes: FacultyClass[]
}

const FacultyDashboard = () => {
  const [data, setData] = useState<FacultyDashboardData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [facultyResult, timetableResult] = await Promise.all([
          getFacultyClasses(),
          getMyTimetable(),
        ])

        setData(facultyResult)
        setTimetables(timetableResult)
      } catch {
        setError('Unable to load faculty dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacultyData()
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-line bg-panel p-6 text-slate">
        Loading faculty dashboard...
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
        <p className="mono-label text-xs text-signal">Faculty workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Manage classes and student progress
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Handle class schedules, attendance marking, academic announcements,
          and student performance tracking.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Assigned Timetable"
          value={String(timetables.length)}
          description="Classes assigned from backend"
          icon={CalendarClock}
        />

        <StatsCard
          title="Students"
          value="132"
          description="Students under your courses"
          icon={UsersRound}
        />

        <StatsCard
          title="Attendance Pending"
          value="02"
          description="Sessions waiting for marking"
          icon={ClipboardCheck}
        />

        <StatsCard
          title="Announcements"
          value="03"
          description="Published this week"
          icon={Megaphone}
        />
      </section>

      <TimetableList title="My Assigned Timetable" timetables={timetables} />

      <section className="rounded-lg border border-line bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper">
          Faculty Classes from Backend
        </h3>

        <div className="mt-6 overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-soft text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Room</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {data?.classes.map((item) => (
                <tr key={`${item.course}-${item.time}`}>
                  <td className="px-4 py-3 text-paper">{item.course}</td>
                  <td className="px-4 py-3 text-slate">{item.className}</td>
                  <td className="px-4 py-3 text-signal">{item.time}</td>
                  <td className="px-4 py-3 text-slate">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default FacultyDashboard