import {
  Activity,
  Building2,
  Database,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-line bg-panel p-6">
        <p className="mono-label text-xs text-signal">Admin workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Campus-wide system control
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Manage users, rooms, campus resources, system analytics, departments,
          and platform-level operations.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Users"
          value="2.4K"
          description="Registered campus users"
          icon={UsersRound}
        />

        <StatsCard
          title="Rooms"
          value="86"
          description="Classrooms, labs, and halls"
          icon={Building2}
        />

        <StatsCard
          title="System Health"
          value="99%"
          description="Platform uptime status"
          icon={Activity}
        />

        <StatsCard
          title="Database"
          value="Live"
          description="MongoDB connection active"
          icon={Database}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-line bg-panel p-6">
          <h3 className="font-display text-xl font-semibold text-paper">
            System Modules
          </h3>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              'User Management',
              'Room Allocation',
              'Department Control',
              'Announcement System',
              'Complaint Routing',
              'AI Engine Monitor',
            ].map((module) => (
              <div
                key={module}
                className="rounded-md border border-line bg-ink-soft p-4"
              >
                <p className="text-sm font-medium text-paper">{module}</p>
                <p className="mt-1 text-xs text-good">Active</p>
              </div>
            ))}
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
              Next: backend role authorization middleware.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard