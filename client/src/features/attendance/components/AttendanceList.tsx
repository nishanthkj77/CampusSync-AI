import { CalendarDays, ClipboardCheck, UserCheck } from 'lucide-react'
import { updateAttendance } from '../services/attendance.service'
import type {
  Attendance,
  AttendanceStatus,
} from '../types/attendance.types'

type AttendanceListProps = {
  title: string
  attendance: Attendance[]
  canManage?: boolean
  updatingId?: string
  setUpdatingId?: (id: string) => void
  onUpdated?: (attendance: Attendance) => void
}

const formatDate = (dateValue: string) => {
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const getStatusClass = (status: AttendanceStatus) => {
  if (status === 'present') {
    return 'bg-good/10 text-good border-good/30'
  }

  if (status === 'late') {
    return 'bg-signal-soft text-signal border-signal/30'
  }

  return 'bg-bad/10 text-bad border-bad/30'
}

const AttendanceList = ({
  title,
  attendance,
  canManage = false,
  updatingId = '',
  setUpdatingId,
  onUpdated,
}: AttendanceListProps) => {
  const handleStatusChange = async (
    attendanceEntry: Attendance,
    studentEmail: string,
    status: AttendanceStatus
  ) => {
    try {
      setUpdatingId?.(attendanceEntry._id)

      const updatedRecords = attendanceEntry.records.map((record) =>
        record.studentEmail === studentEmail
          ? {
              ...record,
              status,
              remarks:
                status === 'present'
                  ? 'Updated as present'
                  : status === 'late'
                    ? 'Updated as late'
                    : 'Updated as absent',
            }
          : record
      )

      const updatedAttendance = await updateAttendance(attendanceEntry._id, {
        records: updatedRecords,
      })

      onUpdated?.(updatedAttendance)
    } catch {
      alert('Unable to update attendance status.')
    } finally {
      setUpdatingId?.('')
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <ClipboardCheck size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          {title}
        </h3>
      </div>

      {attendance.length === 0 ? (
        <div className="mt-6 rounded-md border border-line bg-ink-soft p-5 text-sm text-slate">
          No attendance records available yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {attendance.map((entry) => (
            <article
              key={entry._id}
              className="rounded-lg border border-line bg-ink-soft p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-paper">
                    {entry.courseCode} — {entry.courseTitle}
                  </p>

                  <p className="mt-2 text-sm text-slate">
                    {entry.department} • Semester {entry.semester} • Section{' '}
                    {entry.section}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                  <CalendarDays size={14} />
                  {formatDate(entry.date)}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-md border border-line bg-ink p-4">
                  <p className="text-xs text-slate">Faculty</p>
                  <p className="mt-1 text-sm font-semibold text-paper">
                    {entry.facultyName}
                  </p>
                </div>

                <div className="rounded-md border border-line bg-ink p-4">
                  <p className="text-xs text-slate">Faculty Email</p>
                  <p className="mt-1 text-sm text-paper">{entry.facultyEmail}</p>
                </div>

                <div className="rounded-md border border-line bg-ink p-4">
                  <p className="text-xs text-slate">Students Marked</p>
                  <p className="mt-1 text-sm font-semibold text-signal">
                    {entry.records.length}
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ink text-slate">
                    <tr>
                      <th className="px-4 py-3 font-medium">Student</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Remarks</th>
                      {canManage && (
                        <th className="px-4 py-3 font-medium">Action</th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-line">
                    {entry.records.map((record) => (
                      <tr key={`${entry._id}-${record.studentEmail}`}>
                        <td className="px-4 py-3 text-paper">
                          <div className="flex items-center gap-2">
                            <UserCheck size={14} className="text-signal" />
                            {record.studentName}
                          </div>
                        </td>

                        <td className="px-4 py-3 text-slate">
                          {record.studentEmail}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md border px-2 py-1 text-xs uppercase ${getStatusClass(
                              record.status
                            )}`}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-slate">
                          {record.remarks || '-'}
                        </td>

                        {canManage && (
                          <td className="px-4 py-3">
                            <select
                              value={record.status}
                              disabled={updatingId === entry._id}
                              onChange={(event) =>
                                handleStatusChange(
                                  entry,
                                  record.studentEmail,
                                  event.target.value as AttendanceStatus
                                )
                              }
                              className="rounded-md border border-line bg-ink px-3 py-2 text-xs text-paper outline-none focus:border-signal disabled:opacity-60"
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="late">Late</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AttendanceList