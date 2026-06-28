import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ClipboardCheck } from 'lucide-react'
import { createAttendance } from '../services/attendance.service'
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

const initialStudentRecord: AttendanceStudentRecord = {
  studentName: 'Demo Student',
  studentEmail: 'student.demo@campus.edu',
  status: 'present',
  remarks: 'On time',
}

const AttendanceForm = ({ onCreated }: AttendanceFormProps) => {
  const [formData, setFormData] =
    useState<CreateAttendancePayload>(initialFormData)
  const [studentRecord, setStudentRecord] =
    useState<AttendanceStudentRecord>(initialStudentRecord)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleClassChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' ? Number(value) : value,
    }))
  }

  const handleStudentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    if (name === 'status') {
      setStudentRecord((prev) => ({
        ...prev,
        status: value as AttendanceStatus,
      }))
      return
    }

    if (name === 'studentName') {
      setStudentRecord((prev) => ({
        ...prev,
        studentName: value,
      }))
      return
    }

    if (name === 'studentEmail') {
      setStudentRecord((prev) => ({
        ...prev,
        studentEmail: value,
      }))
      return
    }

    setStudentRecord((prev) => ({
      ...prev,
      remarks: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const payload: CreateAttendancePayload = {
        ...formData,
        records: [studentRecord],
      }

      const createdAttendance = await createAttendance(payload)

      onCreated(createdAttendance)
      setSuccess('Attendance marked successfully.')
      setFormData(initialFormData)
      setStudentRecord(initialStudentRecord)
    } catch {
      setError('Unable to mark attendance. Please check the details.')
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
        Faculty can mark class-wise attendance for students. This data will be
        visible to students, HOD, and Admin.
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

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
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

        <div className="md:col-span-2 border-t border-line pt-4">
          <p className="font-display text-lg font-semibold text-paper">
            Student Record
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Student Name
          </label>
          <input
            name="studentName"
            value={studentRecord.studentName}
            onChange={handleStudentChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Student Email
          </label>
          <input
            type="email"
            name="studentEmail"
            value={studentRecord.studentEmail}
            onChange={handleStudentChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Status
          </label>
          <select
            name="status"
            value={studentRecord.status}
            onChange={handleStudentChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          >
            <option value="present" className="bg-ink text-paper">
              PRESENT
            </option>
            <option value="absent" className="bg-ink text-paper">
              ABSENT
            </option>
            <option value="late" className="bg-ink text-paper">
              LATE
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Remarks
          </label>
          <input
            name="remarks"
            value={studentRecord.remarks}
            onChange={handleStudentChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Marking attendance...' : 'Mark Attendance'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AttendanceForm