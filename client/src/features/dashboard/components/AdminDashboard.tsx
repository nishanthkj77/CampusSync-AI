 import { useEffect, useState } from 'react'
import {
  Activity,
  Building2,
  CalendarClock,
  Database,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'
import { getAdminUsers } from '../services/dashboard.service'
import {
  deleteTimetable,
  getAllTimetables,
} from '../../timetable/services/timetable.service'
import TimetableList from '../../timetable/components/TimetableList'
import TimetableForm from '../../timetable/components/TimetableForm'
import type { TimetableEntry } from '../../timetable/types/timetable.types'

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
  const [deletingId, setDeletingId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersResult, timetableResult] = await Promise.all([
          getAdminUsers(),
          getAllTimetables(),
        ])

        setData(usersResult)
        setTimetables(timetableResult)
      } catch {
        setError('Unable to load admin dashboard data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  const handleTimetableCreated = (entry: TimetableEntry) => {
    setTimetables((prev) => [entry, ...prev])
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
          Manage users, rooms, campus resources, system analytics, departments,
          timetable records, and platform-level operations.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Users"
          value={String(data?.count || 0)}
          description="Registered campus users"
          icon={UsersRound}
        />

        <StatsCard
          title="Timetable Entries"
          value={String(timetables.length)}
          description="Active academic schedule records"
          icon={CalendarClock}
        />

        <StatsCard
          title="Rooms"
          value="86"
          description="Classrooms, labs, and halls"
          icon={Building2}
        />

        <StatsCard
          title="Database"
          value="Live"
          description="MongoDB connection active"
          icon={Database}
        />
      </section>

      <TimetableForm onCreated={handleTimetableCreated} />

      <TimetableList
        title="Campus Timetable from Backend"
        timetables={timetables}
        canManage
        deletingId={deletingId}
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

            <div className="rounded-md bg-ink-soft p-4">
              <div className="flex items-center gap-2 text-signal">
                <Activity size={16} />
                <p className="text-sm font-medium">System status stable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard