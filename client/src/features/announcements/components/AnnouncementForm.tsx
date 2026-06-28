import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Megaphone } from 'lucide-react'
import { createAnnouncement } from '../services/announcement.service'
import type {
  Announcement,
  AnnouncementAudienceRole,
  AnnouncementCategory,
  AnnouncementPriority,
  CreateAnnouncementPayload,
} from '../types/announcement.types'

type AnnouncementFormProps = {
  onCreated: (announcement: Announcement) => void
}

const categories: AnnouncementCategory[] = [
  'general',
  'academic',
  'exam',
  'event',
  'urgent',
]

const priorities: AnnouncementPriority[] = ['low', 'medium', 'high']

const roles: AnnouncementAudienceRole[] = ['student', 'faculty', 'hod', 'admin']

const initialFormData: CreateAnnouncementPayload = {
  title: 'Internal Exam Schedule Released',
  message:
    'Students are informed that the internal exam timetable has been published.',
  category: 'exam',
  priority: 'high',
  audienceRoles: ['student', 'faculty', 'hod', 'admin'],
}

const AnnouncementForm = ({ onCreated }: AnnouncementFormProps) => {
  const [formData, setFormData] =
    useState<CreateAnnouncementPayload>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = event.target.name as keyof CreateAnnouncementPayload
    const value = event.target.value

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleToggle = (role: AnnouncementAudienceRole) => {
    setFormData((prev) => {
      const alreadySelected = prev.audienceRoles.includes(role)

      return {
        ...prev,
        audienceRoles: alreadySelected
          ? prev.audienceRoles.filter((item) => item !== role)
          : [...prev.audienceRoles, role],
      }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.audienceRoles.length === 0) {
      setError('Select at least one audience role.')
      return
    }

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const createdAnnouncement = await createAnnouncement(formData)

      onCreated(createdAnnouncement)
      setSuccess('Announcement created successfully.')
      setFormData(initialFormData)
    } catch {
      setError('Unable to create announcement. Please check the details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <Megaphone size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          Create Announcement
        </h3>
      </div>

      <p className="mt-2 text-sm text-slate">
        Create academic, exam, event, or urgent announcements for selected campus
        roles.
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
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-ink text-paper"
              >
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-md border border-line bg-ink-soft px-4 py-3 text-paper outline-none focus:border-signal"
          >
            {priorities.map((priority) => (
              <option
                key={priority}
                value={priority}
                className="bg-ink text-paper"
              >
                {priority.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 block text-sm font-medium text-slate">
            Audience Roles
          </label>

          <div className="flex flex-wrap gap-3">
            {roles.map((role) => {
              const selected = formData.audienceRoles.includes(role)

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`rounded-md border px-4 py-2 text-xs font-medium uppercase transition ${
                    selected
                      ? 'border-signal bg-signal-soft text-signal'
                      : 'border-line bg-ink-soft text-slate hover:border-signal hover:text-paper'
                  }`}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating announcement...' : 'Create Announcement'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AnnouncementForm