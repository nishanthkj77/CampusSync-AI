import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  ClipboardCheck,
  Filter,
  UsersRound,
} from 'lucide-react'
import { updateAttendance } from '../services/attendance.service'
import type {
  Attendance,
  AttendanceStatus,
} from '../types/attendance.types'

type AttendanceSummaryPanelProps = {
  title: string
  attendance: Attendance[]
  canManage?: boolean
  updatingId?: string
  setUpdatingId?: (id: string) => void
  onUpdated?: (attendance: Attendance) => void
}

type StatusFilter = 'all' | AttendanceStatus

type FilterState = {
  department: string
  semester: string
  section: string
  date: string
  status: StatusFilter
}

const initialFilters: FilterState = {
  department: 'all',
  semester: 'all',
  section: 'all',
  date: 'all',
  status: 'all',
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

const getUniqueStrings = (values: string[]) => {
  return Array.from(new Set(values.filter(Boolean))).sort()
}

const AttendanceSummaryPanel = ({
  title,
  attendance,
  canManage = false,
  updatingId = '',
  setUpdatingId,
  onUpdated,
}: AttendanceSummaryPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const departments = useMemo(
    () => getUniqueStrings(attendance.map((entry) => entry.department)),
    [attendance]
  )

  const semesters = useMemo(
    () =>
      getUniqueStrings(
        attendance.map((entry) => String(entry.semester))
      ),
    [attendance]
  )

  const sections = useMemo(
    () => getUniqueStrings(attendance.map((entry) => entry.section)),
    [attendance]
  )

  const dates = useMemo(
    () => getUniqueStrings(attendance.map((entry) => entry.date)),
    [attendance]
  )

  const filteredAttendance = useMemo(() => {
    return attendance.filter((entry) => {
      const departmentMatch =
        filters.department === 'all' || entry.department === filters.department

      const semesterMatch =
        filters.semester === 'all' || String(entry.semester) === filters.semester

      const sectionMatch =
        filters.section === 'all' || entry.section === filters.section

      const dateMatch = filters.date === 'all' || entry.date === filters.date

      const statusMatch =
        filters.status === 'all' ||
        entry.records.some((record) => record.status === filters.status)

      return (
        departmentMatch &&
        semesterMatch &&
        sectionMatch &&
        dateMatch &&
        statusMatch
      )
    })
  }, [attendance, filters])

  const flatRecords = useMemo(() => {
    return filteredAttendance.flatMap((entry) =>
      entry.records
        .filter((record) => {
          if (filters.status === 'all') {
            return true
          }

          return record.status === filters.status
        })
        .map((record) => ({
          entry,
          record,
        }))
    )
  }, [filteredAttendance, filters.status])

  const totalRecords = flatRecords.length

  const presentCount = flatRecords.filter(
    (item) => item.record.status === 'present'
  ).length

  const absentCount = flatRecords.filter(
    (item) => item.record.status === 'absent'
  ).length

  const lateCount = flatRecords.filter(
    (item) => item.record.status === 'late'
  ).length

  const attendancePercentage =
    totalRecords === 0 ? 0 : Math.round((presentCount / totalRecords) * 100)

  const absentLateRecords = flatRecords.filter(
    (item) => item.record.status === 'absent' || item.record.status === 'late'
  )

  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters(initialFilters)
  }

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={18} className="text-signal" />

          <h3 className="font-display text-xl font-semibold text-paper">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleResetFilters}
          className="rounded-md border border-line bg-ink-soft px-4 py-2 text-xs font-medium text-slate transition hover:border-signal hover:text-signal"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <CalendarDays size={16} />
            <p className="text-xs uppercase tracking-wide">Classes</p>
          </div>
          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {filteredAttendance.length}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2 text-signal">
            <UsersRound size={16} />
            <p className="text-xs uppercase tracking-wide">Students Marked</p>
          </div>
          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {totalRecords}
          </p>
        </div>

        <div className="rounded-lg border border-good/30 bg-good/10 p-4">
          <p className="text-xs uppercase tracking-wide text-good">Present</p>
          <p className="mt-2 font-display text-2xl font-semibold text-good">
            {presentCount}
          </p>
        </div>

        <div className="rounded-lg border border-bad/30 bg-bad/10 p-4">
          <p className="text-xs uppercase tracking-wide text-bad">Absent</p>
          <p className="mt-2 font-display text-2xl font-semibold text-bad">
            {absentCount}
          </p>
        </div>

        <div className="rounded-lg border border-signal/30 bg-signal-soft p-4">
          <p className="text-xs uppercase tracking-wide text-signal">
            Attendance %
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-signal">
            {attendancePercentage}%
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-signal" />
          <p className="font-display text-lg font-semibold text-paper">
            Filters
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <select
            value={filters.department}
            onChange={(event) =>
              handleFilterChange('department', event.target.value)
            }
            className="rounded-md border border-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-signal"
          >
            <option value="all">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={filters.semester}
            onChange={(event) =>
              handleFilterChange('semester', event.target.value)
            }
            className="rounded-md border border-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-signal"
          >
            <option value="all">All Semesters</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>

          <select
            value={filters.section}
            onChange={(event) =>
              handleFilterChange('section', event.target.value)
            }
            className="rounded-md border border-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-signal"
          >
            <option value="all">All Sections</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                Section {section}
              </option>
            ))}
          </select>

          <select
            value={filters.date}
            onChange={(event) => handleFilterChange('date', event.target.value)}
            className="rounded-md border border-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-signal"
          >
            <option value="all">All Dates</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(event) =>
              handleFilterChange('status', event.target.value)
            }
            className="rounded-md border border-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-signal"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-signal" />
          <p className="font-display text-lg font-semibold text-paper">
            Absent / Late Students
          </p>
        </div>

        {absentLateRecords.length === 0 ? (
          <div className="mt-4 rounded-md border border-line bg-ink p-4 text-sm text-slate">
            No absent or late students found for selected filters.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-slate">
                <tr>
                  <th className="px-4 py-3 font-medium">Roll No</th>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Remarks</th>
                  {canManage && (
                    <th className="px-4 py-3 font-medium">Update</th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {absentLateRecords.map(({ entry, record }) => (
                  <tr key={`${entry._id}-${record.studentEmail}`}>
                    <td className="px-4 py-3 text-signal">
                      {record.rollNumber || '-'}
                    </td>

                    <td className="px-4 py-3 text-paper">
                      {record.studentName}
                    </td>

                    <td className="px-4 py-3 text-slate">
                      {entry.courseCode} • Sem {entry.semester} • Sec{' '}
                      {entry.section}
                    </td>

                    <td className="px-4 py-3 text-slate">
                      {formatDate(entry.date)}
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
        )}
      </div>

      <div className="mt-6 rounded-lg border border-line bg-ink-soft p-4">
        <p className="font-display text-lg font-semibold text-paper">
          Filtered Class Records
        </p>

        {filteredAttendance.length === 0 ? (
          <div className="mt-4 rounded-md border border-line bg-ink p-4 text-sm text-slate">
            No attendance records found for selected filters.
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            {filteredAttendance.map((entry) => (
              <div
                key={entry._id}
                className="rounded-md border border-line bg-ink p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold text-paper">
                      {entry.courseCode} — {entry.courseTitle}
                    </p>

                    <p className="mt-1 text-xs text-slate">
                      {entry.department} • Semester {entry.semester} • Section{' '}
                      {entry.section} • {formatDate(entry.date)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate">Faculty</p>
                    <p className="text-sm text-signal">{entry.facultyName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AttendanceSummaryPanel