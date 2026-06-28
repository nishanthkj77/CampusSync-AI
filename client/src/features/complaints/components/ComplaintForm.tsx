import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import { createComplaint } from '../services/complaint.service'
import type {
  Complaint,
  ComplaintCategory,
  ComplaintPriority,
  CreateComplaintPayload,
} from '../types/complaint.types'

type ComplaintFormProps = {
  onCreated: (complaint: Complaint) => void
}

const categories: ComplaintCategory[] = [
  'academic',
  'hostel',
  'maintenance',
  'transport',
  'canteen',
  'other',
]

const priorities: ComplaintPriority[] = ['low', 'medium', 'high']

const initialFormData: CreateComplaintPayload = {
  title: 'Projector not working',
  description: 'The projector in room B-204 is not working during DBMS class.',
  category: 'maintenance',
  priority: 'high',
}

const ComplaintForm = ({ onCreated }: ComplaintFormProps) => {
  const [formData, setFormData] =
    useState<CreateComplaintPayload>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = event.target.name as keyof CreateComplaintPayload
    const value = event.target.value

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const createdComplaint = await createComplaint(formData)

      onCreated(createdComplaint)
      setSuccess('Complaint submitted successfully.')
      setFormData(initialFormData)
    } catch {
      setError('Unable to submit complaint. Please check the details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <MessageSquarePlus size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          Raise Complaint
        </h3>
      </div>

      <p className="mt-2 text-sm text-slate">
        Submit academic, hostel, maintenance, transport, canteen, or other
        campus service complaints.
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
            Complaint Title
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
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-md bg-signal px-6 py-3 font-display text-sm font-semibold text-ink transition hover:bg-[#ff9c5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting complaint...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ComplaintForm