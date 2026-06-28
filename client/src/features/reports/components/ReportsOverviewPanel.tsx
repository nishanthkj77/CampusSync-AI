import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  UsersRound,
} from 'lucide-react'
import type { OverviewReport } from '../types/report.types'

type ReportsOverviewPanelProps = {
  title: string
  report: OverviewReport | null
}

const formatDateTime = (dateValue: string) => {
  return new Date(dateValue).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getAttendanceClass = (percentage: number) => {
  if (percentage >= 85) {
    return 'text-good'
  }

  if (percentage >= 75) {
    return 'text-signal'
  }

  return 'text-bad'
}

const ReportsOverviewPanel = ({ title, report }: ReportsOverviewPanelProps) => {
  if (!report) {
    return (
      <section className="rounded-lg border border-line bg-panel p-6">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-signal" />

          <h3 className="font-display text-xl font-semibold text-paper">
            {title}
          </h3>
        </div>

        <div className="mt-6 rounded-md border border-line bg-ink-soft p-5 text-sm text-slate">
          Report data is not available yet.
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-signal" />

          <div>
            <h3 className="font-display text-xl font-semibold text-paper">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate">
              Scope: {report.scope.toUpperCase()} • {report.department}
            </p>
          </div>
        </div>

        <div className="rounded-md border border-line bg-ink-soft px-4 py-2 text-xs text-slate">
          Generated: {formatDateTime(report.generatedAt)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <GraduationCap size={16} />
            <p className="text-xs uppercase tracking-wide">Students</p>
          </div>

          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.summary.students}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <UsersRound size={16} />
            <p className="text-xs uppercase tracking-wide">Faculty</p>
          </div>

          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.summary.faculty}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <CalendarClock size={16} />
            <p className="text-xs uppercase tracking-wide">Timetable</p>
          </div>

          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.summary.timetableEntries}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <ClipboardCheck size={16} />
            <p className="text-xs uppercase tracking-wide">Attendance</p>
          </div>

          <p
            className={`mt-2 font-display text-2xl font-semibold ${getAttendanceClass(
              report.attendanceSummary.attendancePercentage
            )}`}
          >
            {report.attendanceSummary.attendancePercentage}%
          </p>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <ClipboardList size={16} />
            <p className="text-xs uppercase tracking-wide">Complaints</p>
          </div>

          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.summary.complaints}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-signal" />

          <p className="font-display text-lg font-semibold text-paper">
            Operational Alerts
          </p>
        </div>

        <div className="mt-4 grid gap-3">
          {report.alerts.map((alert) => (
            <div
              key={alert}
              className="rounded-md border border-line bg-ink px-4 py-3 text-sm text-slate"
            >
              {alert}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <p className="font-display text-lg font-semibold text-paper">
            Attendance Report
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Classes</span>
              <span className="text-paper">
                {report.attendanceSummary.totalClasses}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Students Marked</span>
              <span className="text-paper">
                {report.attendanceSummary.totalMarked}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-good/10 p-3">
              <span className="text-good">Present</span>
              <span className="text-good">
                {report.attendanceSummary.presentCount}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-bad/10 p-3">
              <span className="text-bad">Absent</span>
              <span className="text-bad">
                {report.attendanceSummary.absentCount}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-signal-soft p-3">
              <span className="text-signal">Late</span>
              <span className="text-signal">
                {report.attendanceSummary.lateCount}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <p className="font-display text-lg font-semibold text-paper">
            Complaint Report
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Total</span>
              <span className="text-paper">
                {report.complaintSummary.totalComplaints}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-bad/10 p-3">
              <span className="text-bad">Pending</span>
              <span className="text-bad">
                {report.complaintSummary.byStatus.pending}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-signal-soft p-3">
              <span className="text-signal">In Progress</span>
              <span className="text-signal">
                {report.complaintSummary.byStatus.in_progress}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-good/10 p-3">
              <span className="text-good">Resolved</span>
              <span className="text-good">
                {report.complaintSummary.byStatus.resolved}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">High Priority</span>
              <span className="text-paper">
                {report.complaintSummary.byPriority.high}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <p className="font-display text-lg font-semibold text-paper">
            Timetable Report
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Entries</span>
              <span className="text-paper">
                {report.timetableSummary.totalEntries}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Rooms Used</span>
              <span className="text-paper">
                {report.timetableSummary.roomCount}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-ink p-3">
              <span className="text-slate">Faculty Scheduled</span>
              <span className="text-paper">
                {report.timetableSummary.facultyCount}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-signal-soft p-3">
              <span className="text-signal">Lectures</span>
              <span className="text-signal">
                {report.timetableSummary.bySessionType.lecture}
              </span>
            </div>

            <div className="flex justify-between rounded-md bg-signal-soft p-3">
              <span className="text-signal">Labs</span>
              <span className="text-signal">
                {report.timetableSummary.bySessionType.lab}
              </span>
            </div>
          </div>
        </div>
      </div>

      {report.departmentBreakdown.length > 0 && (
        <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
          <p className="font-display text-lg font-semibold text-paper">
            Department Breakdown
          </p>

          <div className="mt-4 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-slate">
                <tr>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Students</th>
                  <th className="px-4 py-3 font-medium">Timetable</th>
                  <th className="px-4 py-3 font-medium">Complaints</th>
                  <th className="px-4 py-3 font-medium">Attendance</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {report.departmentBreakdown.map((item) => (
                  <tr key={item.department}>
                    <td className="px-4 py-3 text-paper">
                      {item.department}
                    </td>

                    <td className="px-4 py-3 text-slate">{item.students}</td>

                    <td className="px-4 py-3 text-slate">
                      {item.timetableEntries}
                    </td>

                    <td className="px-4 py-3 text-slate">
                      {item.complaints}
                    </td>

                    <td
                      className={`px-4 py-3 font-medium ${getAttendanceClass(
                        item.attendancePercentage
                      )}`}
                    >
                      {item.attendancePercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {report.sectionBreakdown.length > 0 && (
        <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
          <p className="font-display text-lg font-semibold text-paper">
            Section Breakdown
          </p>

          <div className="mt-4 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-slate">
                <tr>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Semester</th>
                  <th className="px-4 py-3 font-medium">Section</th>
                  <th className="px-4 py-3 font-medium">Students</th>
                  <th className="px-4 py-3 font-medium">Timetable</th>
                  <th className="px-4 py-3 font-medium">Attendance</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {report.sectionBreakdown.map((item) => (
                  <tr
                    key={`${item.department}-${item.semester}-${item.section}`}
                  >
                    <td className="px-4 py-3 text-paper">
                      {item.department}
                    </td>

                    <td className="px-4 py-3 text-slate">
                      Semester {item.semester}
                    </td>

                    <td className="px-4 py-3 text-signal">
                      {item.section}
                    </td>

                    <td className="px-4 py-3 text-slate">{item.students}</td>

                    <td className="px-4 py-3 text-slate">
                      {item.timetableEntries}
                    </td>

                    <td
                      className={`px-4 py-3 font-medium ${getAttendanceClass(
                        item.attendancePercentage
                      )}`}
                    >
                      {item.attendancePercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

export default ReportsOverviewPanel