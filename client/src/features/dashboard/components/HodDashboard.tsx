 import { useEffect, useState } from 'react'
import {
  AlertTriangle,
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
import type {
  TimetableConflictReport,
  TimetableEntry,
} from '../../timetable/types/timetable.types'
import type { Announcement } from '../../announcements/types/announcement.types'

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
  const [conflictReport, setConflictReport] =
    useState<TimetableConflictReport | null>(null)
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null)
  const [deletingId, setDeletingId] = useState('')
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

  useEffect(() => {
    const fetchHodData = async () => {
      try {
        const [
          overviewResult,
          timetableResult,
          conflictResult,
          announcementResult,
        ] = await Promise.all([
          getHodOverview(),
          getAllTimetables(),
          getTimetableConflicts(),
          getAnnouncements(),
        ])

        setData(overviewResult)
        setTimetables(timetableResult)
        setConflictReport(conflictResult)
        setAnnouncements(announcementResult)
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
  }

  const handleTimetableCreated = (entry: TimetableEntry) => {
    setTimetables((prev) => [entry, ...prev])
    refreshConflictReport()
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
          Track department performance, announcements, faculty workload,
          timetable efficiency, and academic risk indicators.
        </p>

        <div className="mt-5 rounded-md border border-line bg-ink-soft px-4 py-3">
          <p className="text-sm text-slate">Department</p>
          <p className="mt-1 font-display text-lg font-semibold text-paper">
            {data?.department}
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Faculty"
          value={String(data?.overview.facultyCount || 0)}
          description="Active department faculty"
          icon={UsersRound}
        />

        <StatsCard
          title="Timetable Entries"
          value={String(timetables.length)}
          description="Active academic schedule records"
          icon={ClipboardList}
        />

        <StatsCard
          title="Announcements"
          value={String(announcements.length)}
          description="Visible department notices"
          icon={Megaphone}
        />

        <StatsCard
          title="AI Conflicts"
          value={String(conflictReport?.conflictCount || 0)}
          description="Detected timetable issues"
          icon={AlertTriangle}
        />
      </section>

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
              AI recommends checking room conflicts across timetable entries.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Department has {data?.overview.studentCount || 0} active students
              under monitoring.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Department attendance average is{' '}
              {data?.overview.attendanceAverage || '0%'}.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HodDashboard