import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Bot, CalendarPlus, Save, Sparkles } from 'lucide-react'
import {
  generateAITimetablePreview,
  saveAITimetablePreview,
} from '../services/aiTimetable.service'
import type {
  AICourseInput,
  AITimeSlot,
  AITimetablePreviewData,
  AITimetablePreviewEntry,
  GenerateAITimetablePayload,
} from '../types/aiTimetable.types'
import type {
  DayOfWeek,
  SessionType,
  TimetableEntry,
} from '../../timetable/types/timetable.types'

type AITimetableGeneratorPanelProps = {
  onSaved?: (entries: TimetableEntry[]) => void
}

const days: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
]

const initialCourses: AICourseInput[] = [
  {
    courseCode: 'MCA-DBMS',
    courseTitle: 'Database Management System',
    facultyName: 'Demo Faculty',
    facultyEmail: 'faculty.demo@campus.edu',
    sessionsPerWeek: 3,
    sessionType: 'lecture',
  },
  {
    courseCode: 'MCA-JAVA',
    courseTitle: 'Advanced Java Programming',
    facultyName: 'Prof. Meena',
    facultyEmail: 'meena.demo@campus.edu',
    sessionsPerWeek: 3,
    sessionType: 'lecture',
  },
  {
    courseCode: 'MCA-CN',
    courseTitle: 'Computer Networks',
    facultyName: 'Prof. Arjun',
    facultyEmail: 'arjun.faculty@campus.edu',
    sessionsPerWeek: 3,
    sessionType: 'lecture',
  },
  {
    courseCode: 'MCA-LAB',
    courseTitle: 'Database Lab',
    facultyName: 'Demo Faculty',
    facultyEmail: 'faculty.demo@campus.edu',
    sessionsPerWeek: 2,
    sessionType: 'lab',
  },
]

const initialTimeSlots: AITimeSlot[] = [
  { startTime: '09:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '11:00' },
  { startTime: '11:15', endTime: '12:15' },
  { startTime: '13:15', endTime: '14:15' },
  { startTime: '14:15', endTime: '15:15' },
  { startTime: '15:15', endTime: '16:15' },
]

const AITimetableGeneratorPanel = ({
  onSaved,
}: AITimetableGeneratorPanelProps) => {
  const [department, setDepartment] = useState('Computer Applications')
  const [semester, setSemester] = useState(2)
  const [section, setSection] = useState('A')
  const [roomsText, setRoomsText] = useState('B-201, B-202, B-203, Lab-1')
  const [courses, setCourses] = useState<AICourseInput[]>(initialCourses)
  const [previewData, setPreviewData] =
    useState<AITimetablePreviewData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCourseChange = (
    index: number,
    field: keyof AICourseInput,
    value: string
  ) => {
    setCourses((prev) =>
      prev.map((course, courseIndex) => {
        if (courseIndex !== index) {
          return course
        }

        if (field === 'sessionsPerWeek') {
          return {
            ...course,
            sessionsPerWeek: Number(value),
          }
        }

        if (field === 'sessionType') {
          return {
            ...course,
            sessionType: value as SessionType,
          }
        }

        return {
          ...course,
          [field]: value,
        }
      })
    )
  }

  const handleAddCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        courseCode: '',
        courseTitle: '',
        facultyName: '',
        facultyEmail: '',
        sessionsPerWeek: 3,
        sessionType: 'lecture',
      },
    ])
  }

  const handleRemoveCourse = (index: number) => {
    if (courses.length === 1) {
      setError('At least one course is required.')
      return
    }

    setCourses((prev) => prev.filter((_, courseIndex) => courseIndex !== index))
  }

  const buildPayload = (): GenerateAITimetablePayload => {
    const rooms = roomsText
      .split(',')
      .map((room) => room.trim())
      .filter(Boolean)

    return {
      department,
      semester,
      section,
      rooms,
      days,
      timeSlots: initialTimeSlots,
      courses: courses.filter(
        (course) =>
          course.courseCode.trim() &&
          course.courseTitle.trim() &&
          course.facultyName.trim() &&
          course.facultyEmail.trim()
      ),
    }
  }

  const handleGeneratePreview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setPreviewData(null)
    setIsGenerating(true)

    try {
      const payload = buildPayload()

      if (payload.courses.length === 0) {
        setError('Please add at least one valid course.')
        return
      }

      if (payload.rooms.length === 0) {
        setError('Please enter at least one room.')
        return
      }

      const result = await generateAITimetablePreview(payload)

      setPreviewData(result)
      setSuccess(result.message)
    } catch {
      setError('Unable to generate AI timetable preview.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSavePreview = async () => {
    if (!previewData || previewData.preview.length === 0) {
      setError('Generate preview before saving.')
      return
    }

    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      const result = await saveAITimetablePreview({
        entries: previewData.preview,
      })

      onSaved?.(result.timetables)
      setSuccess(`${result.savedCount} AI generated timetable entries saved.`)
      setPreviewData(null)
    } catch {
      setError('Unable to save AI generated timetable. Please check conflicts.')
    } finally {
      setIsSaving(false)
    }
  }

  const groupPreviewByDay = (entries: AITimetablePreviewEntry[]) => {
    return days.map((day) => ({
      day,
      entries: entries.filter((entry) => entry.dayOfWeek === day),
    }))
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <Bot size={20} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          AI Timetable Generator
        </h3>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate">
        Generate a conflict-free timetable preview by checking room conflicts,
        faculty double-booking, and section overlaps before saving.
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

      <form onSubmit={handleGeneratePreview} className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Department
            </label>
            <input
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
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
              min={1}
              max={10}
              value={semester}
              onChange={(event) => setSemester(Number(event.target.value))}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Section
            </label>
            <input
              value={section}
              onChange={(event) => setSection(event.target.value.toUpperCase())}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate">
              Rooms
            </label>
            <input
              value={roomsText}
              onChange={(event) => setRoomsText(event.target.value)}
              className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
              placeholder="B-201, B-202, Lab-1"
              required
            />
          </div>
        </div>

        <div className="rounded-lg border border-line bg-ink-soft p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg font-semibold text-paper">
                Courses to Schedule
              </p>
              <p className="mt-1 text-sm text-slate">
                Add subject, faculty, weekly sessions, and session type.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddCourse}
              className="rounded-md border border-signal/30 bg-signal-soft px-4 py-2 text-xs font-medium text-signal transition hover:bg-signal-soft/80"
            >
              Add Course
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            {courses.map((course, index) => (
              <div
                key={`${course.courseCode}-${index}`}
                className="rounded-lg border border-line bg-ink p-4"
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                  <input
                    value={course.courseCode}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCourseChange(index, 'courseCode', event.target.value)
                    }
                    placeholder="Course Code"
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal"
                    required
                  />

                  <input
                    value={course.courseTitle}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCourseChange(index, 'courseTitle', event.target.value)
                    }
                    placeholder="Course Title"
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal xl:col-span-2"
                    required
                  />

                  <input
                    value={course.facultyName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCourseChange(index, 'facultyName', event.target.value)
                    }
                    placeholder="Faculty Name"
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal"
                    required
                  />

                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={course.sessionsPerWeek}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCourseChange(
                        index,
                        'sessionsPerWeek',
                        event.target.value
                      )
                    }
                    placeholder="Sessions"
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal"
                    required
                  />

                  <select
                    value={course.sessionType}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      handleCourseChange(index, 'sessionType', event.target.value)
                    }
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal"
                  >
                    <option value="lecture">Lecture</option>
                    <option value="lab">Lab</option>
                    <option value="seminar">Seminar</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
                  <input
                    type="email"
                    value={course.facultyEmail}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCourseChange(index, 'facultyEmail', event.target.value)
                    }
                    placeholder="Faculty Email"
                    className="rounded-md border border-line bg-ink-soft px-3 py-3 text-sm text-paper outline-none focus:border-signal"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(index)}
                    className="rounded-md border border-bad/30 bg-bad/10 px-4 py-2 text-xs font-medium text-bad transition hover:bg-bad/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={16} />
          {isGenerating ? 'Generating AI timetable...' : 'Generate AI Preview'}
        </button>
      </form>

      {previewData && (
        <div className="mt-8 rounded-lg border border-line bg-ink-soft p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarPlus size={18} className="text-signal" />

              <div>
                <p className="font-display text-lg font-semibold text-paper">
                  AI Generated Preview
                </p>
                <p className="mt-1 text-sm text-slate">
                  Generated: {previewData.generatedCount} • Unscheduled:{' '}
                  {previewData.unscheduledCount}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSavePreview}
              disabled={isSaving || previewData.preview.length === 0}
              className="inline-flex items-center gap-2 rounded-md bg-good px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-good/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Approve & Save'}
            </button>
          </div>

          {previewData.unscheduled.length > 0 && (
            <div className="mt-4 rounded-md border border-bad/30 bg-bad/10 p-4">
              <p className="text-sm font-semibold text-bad">
                Unscheduled Sessions
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {previewData.unscheduled.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-ink px-2 py-1 text-xs text-bad"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 grid gap-4">
            {groupPreviewByDay(previewData.preview).map(({ day, entries }) => (
              <div key={day} className="rounded-lg border border-line bg-ink p-4">
                <p className="font-display text-base font-semibold capitalize text-paper">
                  {day}
                </p>

                {entries.length === 0 ? (
                  <p className="mt-3 text-sm text-slate">No generated class.</p>
                ) : (
                  <div className="mt-4 overflow-hidden rounded-lg border border-line">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-ink-soft text-slate">
                        <tr>
                          <th className="px-4 py-3 font-medium">Time</th>
                          <th className="px-4 py-3 font-medium">Course</th>
                          <th className="px-4 py-3 font-medium">Faculty</th>
                          <th className="px-4 py-3 font-medium">Room</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-line">
                        {entries.map((entry) => (
                          <tr key={entry.tempId}>
                            <td className="px-4 py-3 text-signal">
                              {entry.startTime} - {entry.endTime}
                            </td>

                            <td className="px-4 py-3 text-paper">
                              {entry.courseCode}
                              <span className="block text-xs text-slate">
                                {entry.courseTitle}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-slate">
                              {entry.facultyName}
                            </td>

                            <td className="px-4 py-3 text-paper">
                              {entry.room}
                            </td>

                            <td className="px-4 py-3 text-signal capitalize">
                              {entry.sessionType}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default AITimetableGeneratorPanel