import {
  CalendarClock,
  ClipboardCheck,
  Megaphone,
  UsersRound,
} from 'lucide-react'
import StatsCard from './StatsCard'

const FacultyDashboard = () => {
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
          title="Classes Today"
          value="04"
          description="Assigned teaching sessions"
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

      <section className="rounded-lg border border-line bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper">
          Faculty Operations
        </h3>

        <div className="mt-6 overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-soft text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              <tr>
                <td className="px-4 py-3 text-paper">DBMS</td>
                <td className="px-4 py-3 text-slate">MCA II</td>
                <td className="px-4 py-3 text-good">Completed</td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-paper">AI Lab</td>
                <td className="px-4 py-3 text-slate">MCA II</td>
                <td className="px-4 py-3 text-signal">Pending Attendance</td>
              </tr>

              <tr>
                <td className="px-4 py-3 text-paper">SPM</td>
                <td className="px-4 py-3 text-slate">MCA I</td>
                <td className="px-4 py-3 text-slate">Scheduled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default FacultyDashboard