 import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ClipboardCheck,
  ClipboardList,
  Megaphone,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getHodOverview } from '../services/dashboard.service'
import {
  deleteTimetable,
  getAllTimetables,
  getTimetableConflicts,
} from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import TimetableForm from '../../timetable/components/TimetableForm'
import TimetableConflictPanel from '../../timetable/components/TimetableConflictPanel'
import AnnouncementForm from '../../announcements/components/AnnouncementForm'
import AnnouncementList from '../../announcements/components/AnnouncementList'
import { getAnnouncements } from '../../announcements/services/announcement.service'
import ComplaintList from '../../complaints/components/ComplaintList'
import { getComplaints } from '../../complaints/services/complaint.service'
import AttendanceSummaryPanel from '../../attendance/components/AttendanceSummaryPanel'
import { getAttendance } from '../../attendance/services/attendance.service'
import AITimetableGeneratorPanel from '../../ai-timetable/components/AITimetableGeneratorPanel'
import ReportsOverviewPanel from '../../reports/components/ReportsOverviewPanel'
import { getOverviewReport } from '../../reports/services/report.service'
import type {
  TimetableConflictReport,
  TimetableEntry,
} from '../../timetable/types/timetable.types'
import type { Announcement } from '../../announcements/types/announcement.types'
import type { Complaint } from '../../complaints/types/complaint.types'
import type { Attendance } from '../../attendance/types/attendance.types'
import type { OverviewReport } from '../../reports/types/report.types'

type HodOverviewData = {
  department: string
  overview: {
    facultyCount: number
    studentCount: number
    pendingComplaints: number
    attendanceAverage: string
  }
}

const HodDashboard = () => {
  const [data, setData] = useState<HodOverviewData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [report, setReport] = useState<OverviewReport | null>(null)
  const [conflictReport, setConflictReport] =
    useState<TimetableConflictReport | null>(null)
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [updatingComplaintId, setUpdatingComplaintId] = useState('')
  const [updatingAttendanceId, setUpdatingAttendanceId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshConflictReport = async () => {
    try {
      const result = await getTimetableConflicts()
      setConflictReport(result)
    } catch {
      setConflictReport(null)
    }
  }

  const refreshReport = async () => {
    try {
      const result = await getOverviewReport()
      setReport(result)
    } catch {
      setReport(null)
    }
  }

  useEffect(() => {
    const fetchHodData = async () => {
      try {
        const [
          overviewResult,
          timetableResult,
          conflictResult,
          announcementResult,
          complaintResult,
          attendanceResult,
          reportResult,
        ] = await Promise.all([
          getHodOverview(),
          getAllTimetables(),
          getTimetableConflicts(),
          getAnnouncements(),
          getComplaints(),
          getAttendance(),
          getOverviewReport(),
        ])

        setData(overviewResult)
        setTimetables(timetableResult)
        setConflictReport(conflictResult)
        setAnnouncements(announcementResult)
        setComplaints(complaintResult)
        setAttendance(attendanceResult)
        setReport(reportResult)
      } catch {
        setError('Unable to load HOD dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHodData()
  }, [])

  const handleAnnouncementCreated = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev])
    refreshReport()
  }

  const handleComplaintUpdated = (updatedComplaint: Complaint) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === updatedComplaint._id ? updatedComplaint : item
      )
    )
    refreshReport()
  }

  const handleAttendanceUpdated = (updatedAttendance: Attendance) => {
    setAttendance((prev) =>
      prev.map((item) =>
        item._id === updatedAttendance._id ? updatedAttendance : item
      )
    )
    refreshReport()
  }

  const handleAITimetableSaved = (entries: TimetableEntry[]) => {
    setTimetables((prev) => [...entries, ...prev])
    refreshConflictReport()
    refreshReport()
  }

  const handleTimetableCreated = (entry: TimetableEntry) => {
    setTimetables((prev) => [entry, ...prev])
    refreshConflictReport()
    refreshReport()
  }

  const handleTimetableEdit = (entry: TimetableEntry) => {
    setEditingEntry(entry)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTimetableUpdated = (updatedEntry: TimetableEntry) => {
    setTimetables((prev) =>
      prev.map((item) => (item._id === updatedEntry._id ? updatedEntry : item))
    )

    setEditingEntry(null)
    refreshConflictReport()
    refreshReport()
  }

  const handleCancelEdit = () => {
    setEditingEntry(null)
  }

  const handleTimetableDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this timetable entry?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      setDeletingId(id)
      await deleteTimetable(id)

      setTimetables((prev) => prev.filter((item) => item._id !== id))

      if (editingEntry?._id === id) {
        setEditingEntry(null)
      }

      refreshConflictReport()
      refreshReport()
    } catch {
      alert('Unable to delete timetable entry.')
    } finally {
      setDeletingId('')
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-line bg-panel p-6 text-slate">
        Loading HOD dashboard...
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
        <p className="mono-label text-xs text-signal">HOD workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Department monitoring and decisions
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Track department performance, reports, AI timetable generation,
          attendance, complaints, announcements, faculty workload, and timetable
          efficiency.
        </p>

        <div className="mt-5 rounded-md border border-line bg-ink-soft px-4 py-3">
          <p className="text-sm text-slate">Department</p>
          <p className="mt-1 font-display text-lg font-semibold text-paper">
            {data?.department}
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <StatsCard
          title="Faculty"
          value={String(data?.overview.facultyCount || 0)}
          description="Active department faculty"
          icon={UsersRound}
        />

        <StatsCard
          title="Students"
          value={String(data?.overview.studentCount || 0)}
          description="Students under department"
          icon={UsersRound}
        />

        <StatsCard
          title="Timetable"
          value={String(timetables.length)}
          description="Active schedule records"
          icon={ClipboardList}
        />

        <StatsCard
          title="Announcements"
          value={String(announcements.length)}
          description="Visible department notices"
          icon={Megaphone}
        />

        <StatsCard
          title="Attendance"
          value={String(attendance.length)}
          description="Department attendance records"
          icon={ClipboardCheck}
        />

        <StatsCard
          title="AI Conflicts"
          value={String(conflictReport?.conflictCount || 0)}
          description="Detected timetable issues"
          icon={AlertTriangle}
        />
      </section>

      <ReportsOverviewPanel
        title="Department Reports & Analytics"
        report={report}
      />

      <AITimetableGeneratorPanel onSaved={handleAITimetableSaved} />

      <AttendanceSummaryPanel
        title="Department Attendance Summary from Backend"
        attendance={attendance}
        canManage
        updatingId={updatingAttendanceId}
        setUpdatingId={setUpdatingAttendanceId}
        onUpdated={handleAttendanceUpdated}
      />

      <ComplaintList
        title="Department Complaint Management from Backend"
        complaints={complaints}
        canManage
        updatingId={updatingComplaintId}
        setUpdatingId={setUpdatingComplaintId}
        onUpdated={handleComplaintUpdated}
      />

      <AnnouncementForm onCreated={handleAnnouncementCreated} />

      <AnnouncementList
        title="Department Announcements from Backend"
        announcements={announcements}
      />

      <TimetableForm
        onCreated={handleTimetableCreated}
        editEntry={editingEntry}
        onUpdated={handleTimetableUpdated}
        onCancelEdit={handleCancelEdit}
      />

      <TimetableConflictPanel report={conflictReport} />

      <TimetableList
        title="Department Timetable from Backend"
        timetables={timetables}
        canManage
        deletingId={deletingId}
        onEdit={handleTimetableEdit}
        onDelete={handleTimetableDelete}
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            Faculty Workload
          </h3>

          <div className="mt-6 space-y-3">
            {[
              ['Dr. Raman', '18 hrs/week', 'Balanced'],
              ['Prof. Meena', '22 hrs/week', 'High'],
              ['Mr. Arjun', '14 hrs/week', 'Available'],
            ].map(([name, hours, status]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-md bg-ink-soft p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-paper">{name}</p>
                  <p className="mt-1 text-xs text-slate">{hours}</p>
                </div>

                <span className="mono-label text-[10px] text-signal">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            AI Department Insights
          </h3>

          <div className="mt-6 space-y-3">
            <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
              AI timetable generator can create conflict-free schedule previews
              before saving them.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Reports help the HOD monitor department timetable, attendance, and
              complaint performance.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              AI checks room conflicts, faculty double-booking, and section
              overlaps.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Department has {data?.overview.studentCount || 0} active students
              under monitoring.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HodDashboard
