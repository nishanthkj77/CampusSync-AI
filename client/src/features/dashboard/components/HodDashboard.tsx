import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'

const HodDashboard = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-line bg-panel p-6">
        <p className="mono-label text-xs text-signal">HOD workspace</p>

        <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
          Department monitoring and decisions
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
          Track department performance, faculty workload, complaints, timetable
          efficiency, and academic risk indicators.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Faculty"
          value="18"
          description="Active department faculty"
          icon={UsersRound}
        />

        <StatsCard
          title="Department Attendance"
          value="87%"
          description="Overall student attendance"
          icon={BarChart3}
        />

        <StatsCard
          title="Complaints"
          value="09"
          description="Department-level pending issues"
          icon={ClipboardList}
        />

        <StatsCard
          title="Risk Alerts"
          value="05"
          description="AI-detected academic risks"
          icon={AlertTriangle}
        />
      </section>

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
              AI recommends shifting one lab session to reduce room conflicts.
            </p>

            <p className="rounded-md bg-ink-soft p-4 text-sm leading-6 text-slate">
              MCA II attendance has dropped by 4% compared to last week.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HodDashboard