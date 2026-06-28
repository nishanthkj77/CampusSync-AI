 import { useEffect, useState } from 'react'
import {
  Bell,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getFacultyClasses } from '../services/dashboard.service'
import { getMyTimetable } from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import AnnouncementForm from '../../announcements/components/AnnouncementForm'
import AnnouncementList from '../../announcements/components/AnnouncementList'
import { getAnnouncements } from '../../announcements/services/announcement.service'
import AttendanceForm from '../../attendance/components/AttendanceForm'
import AttendanceList from '../../attendance/components/AttendanceList'
import { getAttendance } from '../../attendance/services/attendance.service'
import type { TimetableEntry } from '../../timetable/types/timetable.types'
import type { Announcement } from '../../announcements/types/announcement.types'
import type { Attendance } from '../../attendance/types/attendance.types'

type FacultyClass = {
  _id: string
  subject: string
  department: string
  semester: number
  section: string
  students: number
}

type FacultyClassesData = {
  count: number
  classes: FacultyClass[]
}

const FacultyDashboard = () => {
  const [data, setData] = useState<FacultyClassesData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [updatingAttendanceId, setUpdatingAttendanceId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [
          classesResult,
          timetableResult,
          announcementResult,
          attendanceResult,
        ] = await Promise.all([
          getFacultyClasses(),
          getMyTimetable(),
          getAnnouncements(),
          getAttendance(),
        ])

        setData(classesResult)
        setTimetables(timetableResult)
        setAnnouncements(announcementResult)
        setAttendance(attendanceResult)
      } catch {
        setError('Unable to load faculty dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacultyData()
  }, [])

  const handleAnnouncementCreated = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev])
  }

  const handleAttendanceCreated = (newAttendance: Attendance) => {
    setAttendance((prev) => [newAttendance, ...prev])
  }

  const handleAttendanceUpdated = (updatedAttendance: Attendance) => {
    setAttendance((prev) =>
      prev.map((item) =>
        item._id === updatedAttendance._id ? updatedAttendance : item
      )
    )
  }

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
          Teaching and class operations
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Manage assigned classes, timetable, student attendance,
          announcements, and academic activity from one connected dashboard.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Assigned Classes"
          value={String(data?.count || 0)}
          description="Faculty class groups"
          icon={UsersRound}
        />

        <StatsCard
          title="Timetable"
          value={String(timetables.length)}
          description="Assigned schedule records"
          icon={CalendarClock}
        />

        <StatsCard
          title="Announcements"
          value={String(announcements.length)}
          description="Visible notices"
          icon={Bell}
        />

        <StatsCard
          title="Attendance"
          value={String(attendance.length)}
          description="Marked attendance records"
          icon={ClipboardCheck}
        />
      </section>

      <AttendanceForm onCreated={handleAttendanceCreated} />

      <AttendanceList
        title="Faculty Attendance Records from Backend"
        attendance={attendance}
        canManage
        updatingId={updatingAttendanceId}
        setUpdatingId={setUpdatingAttendanceId}
        onUpdated={handleAttendanceUpdated}
      />

      <AnnouncementForm onCreated={handleAnnouncementCreated} />

      <AnnouncementList
        title="Faculty Announcements from Backend"
        announcements={announcements}
      />

      <TimetableList
        title="My Teaching Timetable from Backend"
        timetables={timetables}
      />

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-line bg-panel p-6">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-signal" />

            <h3 className="font-display text-xl font-semibold text-paper">
              Assigned Classes from Backend
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {data?.classes.map((classItem) => (
              <div
                key={classItem._id}
                className="rounded-lg border border-line bg-ink-soft p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold text-paper">
                      {classItem.subject}
                    </p>

                    <p className="mt-1 text-sm text-slate">
                      {classItem.department} • Semester {classItem.semester} •
                      Section {classItem.section}
                    </p>
                  </div>

                  <span className="rounded-md border border-signal/30 bg-signal-soft px-3 py-1 text-xs text-signal">
                    {classItem.students} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            Faculty Activity Summary
          </h3>

          <div className="mt-6 space-y-3">
            <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
              Attendance marking is now connected with protected backend APIs.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Faculty can mark and update student attendance status.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Attendance records are stored in MongoDB and visible to Student,
              HOD, and Admin based on role.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FacultyDashboard