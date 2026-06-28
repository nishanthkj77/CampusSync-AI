 import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ClipboardCheck, UsersRound } from 'lucide-react'
import { createAttendance } from '../services/attendance.service'
import { getStudentRoster } from '../services/studentRoster.service'
import type {
  Attendance,
  AttendanceStatus,
  AttendanceStudentRecord,
  CreateAttendancePayload,
} from '../types/attendance.types'

type AttendanceFormProps = {
  onCreated: (attendance: Attendance) => void
}

const today = new Date().toISOString().slice(0, 10)

const initialFormData: CreateAttendancePayload = {
  courseCode: 'MCA-DBMS',
  courseTitle: 'Database Management System',
  department: 'Computer Applications',
  semester: 2,
  section: 'A',
  date: today,
  records: [],
}

const AttendanceForm = ({ onCreated }: AttendanceFormProps) => {
  const [formData, setFormData] =
    useState<CreateAttendancePayload>(initialFormData)
  const [records, setRecords] = useState<AttendanceStudentRecord[]>([])
  const [isLoadingRoster, setIsLoadingRoster] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const presentCount = records.filter(
    (record) => record.status === 'present'
  ).length

  const absentCount = records.filter(
    (record) => record.status === 'absent'
  ).length

  const lateCount = records.filter((record) => record.status === 'late').length

  const handleClassChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' ? Number(value) : value,
    }))

    setRecords([])
    setSuccess('')
    setError('')
  }

  const handleLoadRoster = async () => {
    setError('')
    setSuccess('')
    setIsLoadingRoster(true)

    try {
      const students = await getStudentRoster({
        department: formData.department,
        semester: formData.semester,
        section: formData.section,
      })

      if (students.length === 0) {
        setRecords([])
        setError('No students found for this department, semester, and section.')
        return
      }

      const rosterRecords: AttendanceStudentRecord[] = students.map(
        (student) => ({
          rollNumber: student.rollNumber || '',
          studentName: student.name,
          studentEmail: student.email,
          status: 'present',
          remarks: 'Marked from class roster',
        })
      )

      setRecords(rosterRecords)
      setSuccess(`${students.length} students loaded from roster.`)
    } catch {
      setError('Unable to load student roster.')
    } finally {
      setIsLoadingRoster(false)
    }
  }

  const handleStatusChange = (
    studentEmail: string,
    status: AttendanceStatus
  ) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentEmail === studentEmail
          ? {
              ...record,
              status,
              remarks:
                status === 'present'
                  ? 'Present'
                  : status === 'late'
                    ? 'Late to class'
                    : 'Absent',
            }
          : record
      )
    )
  }

  const handleRemarksChange = (studentEmail: string, remarks: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentEmail === studentEmail
          ? {
              ...record,
              remarks,
            }
          : record
      )
    )
  }

  const handleMarkAllPresent = () => {
    setRecords((prev) =>
      prev.map((record) => ({
        ...record,
        status: 'present',
        remarks: 'Present',
      }))
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (records.length === 0) {
      setError('Please load student roster before submitting attendance.')
      return
    }

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const payload: CreateAttendancePayload = {
        ...formData,
        records,
      }

      const createdAttendance = await createAttendance(payload)

      onCreated(createdAttendance)
      setSuccess('Attendance submitted successfully for the full class.')
      setRecords([])
      setFormData(initialFormData)
    } catch {
      setError('Unable to submit attendance. Please check the details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <ClipboardCheck size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          Mark Attendance
        </h3>
      </div>

      <p className="mt-2 text-sm text-slate">
        Select class details, load the student roster, then only change absent
        or late students. All students are marked present by default.
      </p>

      {error && (
        <div className="mt-5 rounded-md border border-bad/30 bg-bad/10 px-4 py-3 text-sm text-bad">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-md border border-good/30 bg-good/10 px-4 py-3 text-sm text-good">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Course Code
            </label>
            <input
              name="courseCode"
              value={formData.courseCode}
              onChange={handleClassChange}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Course Title
            </label>
            <input
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleClassChange}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Department
            </label>
            <input
              name="department"
              value={formData.department}
              onChange={handleClassChange}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Semester
            </label>
            <input
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleClassChange}
              min={1}
              max={10}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Section
            </label>
            <input
              name="section"
              value={formData.section}
              onChange={handleClassChange}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleClassChange}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex items-center gap-2">
            <UsersRound size={18} className="text-signal" />

            <div>
              <p className="font-display text-lg font-semibold text-paper">
                Student Roster
              </p>
              <p className="text-sm text-slate">
                Load students using department, semester, and section.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLoadRoster}
            disabled={isLoadingRoster}
            className="rounded-md bg-signal px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingRoster ? 'Loading roster...' : 'Load Student Roster'}
          </button>
        </div>

        {records.length > 0 && (
          <div className="rounded-lg border border-line bg-ink-soft p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold text-paper">
                  Attendance Sheet
                </p>
                <p className="mt-1 text-sm text-slate">
                  Present: {presentCount} • Absent: {absentCount} • Late:{' '}
                  {lateCount}
                </p>
              </div>

              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="rounded-md border border-good/30 bg-good/10 px-4 py-2 text-xs font-medium text-good transition hover:bg-good/20"
              >
                Mark All Present
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink text-slate">
                  <tr>
                    <th className="px-4 py-3 font-medium">Roll No</th>
                    <th className="px-4 py-3 font-medium">Student</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Remarks</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-line">
                  {records.map((record) => (
                    <tr key={record.studentEmail}>
                      <td className="px-4 py-3 text-signal">
                        {record.rollNumber || '-'}
                      </td>

                      <td className="px-4 py-3 text-paper">
                        {record.studentName}
                      </td>

                      <td className="px-4 py-3 text-slate">
                        {record.studentEmail}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={record.status}
                          onChange={(event) =>
                            handleStatusChange(
                              record.studentEmail,
                              event.target.value as AttendanceStatus
                            )
                          }
                          className="rounded-md border border-line bg-ink px-3 py-2 text-xs text-paper outline-none focus:border-signal"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          value={record.remarks || ''}
                          onChange={(event) =>
                            handleRemarksChange(
                              record.studentEmail,
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-line bg-ink px-3 py-2 text-xs text-paper outline-none focus:border-signal"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || records.length === 0}
          className="inline-flex w-full items-center justify-center rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting attendance...' : 'Submit Class Attendance'}
        </button>
      </form>
    </section>
  )
}

export default AttendanceForm
