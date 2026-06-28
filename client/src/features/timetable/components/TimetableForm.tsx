 import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { PlusCircle } from 'lucide-react'
import { createTimetable } from '../services/timetable.service'
import type {
  CreateTimetablePayload,
  DayOfWeek,
  SessionType,
  TimetableEntry,
} from '../types/timetable.types'

type TimetableFormProps = {
  onCreated: (entry: TimetableEntry) => void
}

const initialFormData: CreateTimetablePayload = {
  courseCode: 'MCA-AI',
  courseTitle: 'Artificial Intelligence',
  department: 'Computer Applications',
  semester: 2,
  section: 'A',
  facultyName: 'Demo Faculty',
  facultyEmail: 'faculty.demo@campus.edu',
  room: 'Lab-3',
  dayOfWeek: 'tuesday',
  startTime: '11:00',
  endTime: '12:30',
  sessionType: 'lecture',
}

const days: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const sessionTypes: SessionType[] = ['lecture', 'lab', 'seminar', 'exam']

const TimetableForm = ({ onCreated }: TimetableFormProps) => {
  const [formData, setFormData] =
    useState<CreateTimetablePayload>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = event.target.name as keyof CreateTimetablePayload
    const value = event.target.value

    setFormData((prev) => ({
      ...prev,
      [field]: field === 'semester' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const createdEntry = await createTimetable(formData)

      onCreated(createdEntry)
      setSuccess('Timetable entry created successfully.')
      setFormData(initialFormData)
    } catch {
      setError('Unable to create timetable entry. Please check the details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <PlusCircle size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          Create Timetable Entry
        </h3>
      </div>

      <p className="mt-2 text-sm text-slate">
        Add a new academic schedule entry. Only Admin and HOD users can use this
        form.
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Semester
          </label>
          <input
            name="semester"
            type="number"
            min={1}
            max={10}
            value={formData.semester}
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Room
          </label>
          <input
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Faculty Name
          </label>
          <input
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Faculty Email
          </label>
          <input
            name="facultyEmail"
            type="email"
            value={formData.facultyEmail}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Day
          </label>
          <select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          >
            {days.map((day) => (
              <option key={day} value={day} className="bg-ink text-paper">
                {day.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Session Type
          </label>
          <select
            name="sessionType"
            value={formData.sessionType}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          >
            {sessionTypes.map((type) => (
              <option key={type} value={type} className="bg-ink text-paper">
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Start Time
          </label>
          <input
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            End Time
          </label>
          <input
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating entry...' : 'Create Timetable Entry'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TimetableForm