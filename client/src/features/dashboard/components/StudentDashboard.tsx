 import { useEffect, useState } from 'react'
import {
  Bell,
  CalendarClock,
  ClipboardList,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getStudentProfile } from '../services/dashboard.service'
import { getMyTimetable } from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import AnnouncementList from '../../announcements/components/AnnouncementList'
import { getAnnouncements } from '../../announcements/services/announcement.service'
import ComplaintForm from '../../complaints/components/ComplaintForm'
import ComplaintList from '../../complaints/components/ComplaintList'
import { getComplaints } from '../../complaints/services/complaint.service'
import type { TimetableEntry } from '../../timetable/types/timetable.types'
import type { Announcement } from '../../announcements/types/announcement.types'
import type { Complaint } from '../../complaints/types/complaint.types'

type StudentProfileData = {
  modules: string[]
}

const StudentDashboard = () => {
  const [profileData, setProfileData] = useState<StudentProfileData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [
          profileResult,
          timetableResult,
          announcementResult,
          complaintResult,
        ] = await Promise.all([
          getStudentProfile(),
          getMyTimetable(),
          getAnnouncements(),
          getComplaints(),
        ])

        setProfileData(profileResult)
        setTimetables(timetableResult)
        setAnnouncements(announcementResult)
        setComplaints(complaintResult)
      } catch {
        setError('Unable to load student dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  const handleComplaintCreated = (complaint: Complaint) => {
    setComplaints((prev) => [complaint, ...prev])
  }

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
          View your timetable, announcements, complaints, attendance,
          assignments, and academic updates in one place.
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
          title="Announcements"
          value={String(announcements.length)}
          description="Visible student notices"
          icon={Bell}
        />

        <StatsCard
          title="Complaints"
          value={String(complaints.length)}
          description="Your submitted service requests"
          icon={ClipboardList}
        />

        <StatsCard
          title="Attendance"
          value="91%"
          description="Current semester average"
          icon={TrendingUp}
        />
      </section>

      <AnnouncementList
        title="Student Announcements from Backend"
        announcements={announcements}
      />

      <ComplaintForm onCreated={handleComplaintCreated} />

      <ComplaintList
        title="My Complaints from Backend"
        complaints={complaints}
      />

      <TimetableList title="My Timetable from Backend" timetables={timetables} />

      <section className="rounded-lg border border-line bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper">
          Smart Alerts
        </h3>

        <div className="mt-6 space-y-3">
          <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
            Your announcements, complaints, and timetable are loaded from
            MongoDB through protected backend APIs.
          </p>

          <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
            Students can raise complaints and track status updates from Admin or
            HOD.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper">
          Student Service Summary
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-ink-soft p-4">
            <div className="flex items-center gap-2 text-signal">
              <ClipboardList size={16} />
              <p className="text-sm font-semibold">Complaint Tracking</p>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate">
              Complaint module is now connected. You can submit and monitor your
              requests directly from this dashboard.
            </p>
          </div>

          <div className="rounded-md border border-line bg-ink-soft p-4">
            <div className="flex items-center gap-2 text-signal">
              <GraduationCap size={16} />
              <p className="text-sm font-semibold">Academic Progress</p>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate">
              Attendance and AI risk prediction will be connected in upcoming
              sprints.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentDashboard