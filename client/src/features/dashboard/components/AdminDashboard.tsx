 import { useEffect, useState } from 'react'
import {
  Activity,
  Building2,
  CalendarClock,
  ClipboardList,
  Database,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getAdminUsers } from '../services/dashboard.service'
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
import type {
  TimetableConflictReport,
  TimetableEntry,
} from '../../timetable/types/timetable.types'
import type { Announcement } from '../../announcements/types/announcement.types'
import type { Complaint } from '../../complaints/types/complaint.types'

type AdminUser = {
  _id: string
  name: string
  email: string
  role: string
  isActive: boolean
}

type AdminUsersData = {
  count: number
  users: AdminUser[]
}

const AdminDashboard = () => {
  const [data, setData] = useState<AdminUsersData | null>(null)
  const [timetables, setTimetables] = useState<TimetableEntry[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [conflictReport, setConflictReport] =
    useState<TimetableConflictReport | null>(null)
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [updatingComplaintId, setUpdatingComplaintId] = useState('')
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
    const fetchAdminData = async () => {
      try {
        const [
          usersResult,
          timetableResult,
          conflictResult,
          announcementResult,
          complaintResult,
        ] = await Promise.all([
          getAdminUsers(),
          getAllTimetables(),
          getTimetableConflicts(),
          getAnnouncements(),
          getComplaints(),
        ])

        setData(usersResult)
        setTimetables(timetableResult)
        setConflictReport(conflictResult)
        setAnnouncements(announcementResult)
        setComplaints(complaintResult)
      } catch {
        setError('Unable to load admin dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  const handleAnnouncementCreated = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev])
  }

  const handleComplaintUpdated = (updatedComplaint: Complaint) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === updatedComplaint._id ? updatedComplaint : item
      )
    )
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
        Loading admin dashboard...
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
        <p className="mono-label text-xs text-signal">Admin workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Campus-wide system control
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Manage users, rooms, campus resources, announcements, complaints,
          timetable records, AI conflict reports, and platform-level operations.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          title="Users"
          value={String(data?.count || 0)}
          description="Registered campus users"
          icon={UsersRound}
        />

        <StatsCard
          title="Timetable"
          value={String(timetables.length)}
          description="Active schedule records"
          icon={CalendarClock}
        />

        <StatsCard
          title="Announcements"
          value={String(announcements.length)}
          description="Visible announcement records"
          icon={Building2}
        />

        <StatsCard
          title="Complaints"
          value={String(complaints.length)}
          description="Student service requests"
          icon={ClipboardList}
        />

        <StatsCard
          title="AI Conflicts"
          value={String(conflictReport?.conflictCount || 0)}
          description="Detected timetable issues"
          icon={Activity}
        />
      </section>

      <ComplaintList
        title="Complaint Management from Backend"
        complaints={complaints}
        canManage
        updatingId={updatingComplaintId}
        setUpdatingId={setUpdatingComplaintId}
        onUpdated={handleComplaintUpdated}
      />

      <AnnouncementForm onCreated={handleAnnouncementCreated} />

      <AnnouncementList
        title="Campus Announcements from Backend"
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
        title="Campus Timetable from Backend"
        timetables={timetables}
        canManage
        deletingId={deletingId}
        onEdit={handleTimetableEdit}
        onDelete={handleTimetableDelete}
      />

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            Registered Users from Backend
          </h3>

          <div className="mt-6 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-soft text-slate">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {data?.users.slice(0, 8).map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3 text-paper">{user.name}</td>
                    <td className="px-4 py-3 text-slate">{user.email}</td>
                    <td className="px-4 py-3 text-signal">{user.role}</td>
                    <td className="px-4 py-3 text-good">
                      {user.isActive ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-panel p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-signal" />

            <h3 className="font-display text-xl font-semibold text-paper">
              Security Overview
            </h3>
          </div>

          <div className="mt-6 space-y-3">
            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              JWT authentication enabled and active.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Role-based dashboard rendering enabled.
            </p>

            <p className="rounded-md bg-signal-soft p-4 text-sm leading-6 text-paper-dim">
              Backend role authorization middleware is active.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Complaint management is restricted to Admin and HOD users.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              Announcement visibility is controlled using audience roles.
            </p>

            <div className="rounded-md bg-ink-soft p-4">
              <div className="flex items-center gap-2 text-signal">
                <Database size={16} />
                <p className="text-sm font-medium">
                  MongoDB service modules active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard