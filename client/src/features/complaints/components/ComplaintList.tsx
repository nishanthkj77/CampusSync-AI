import { ClipboardList, Clock3 } from 'lucide-react'
import { updateComplaintStatus } from '../services/complaint.service'
import type {
  Complaint,
  ComplaintStatus,
} from '../types/complaint.types'

type ComplaintListProps = {
  title: string
  complaints: Complaint[]
  canManage?: boolean
  updatingId?: string
  onUpdated?: (complaint: Complaint) => void
  setUpdatingId?: (id: string) => void
}

const formatDate = (dateValue: string) => {
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const getStatusClass = (status: string) => {
  if (status === 'resolved') {
    return 'bg-good/10 text-good border-good/30'
  }

  if (status === 'in_progress') {
    return 'bg-signal-soft text-signal border-signal/30'
  }

  return 'bg-bad/10 text-bad border-bad/30'
}

const getPriorityClass = (priority: string) => {
  if (priority === 'high') {
    return 'bg-bad/10 text-bad border-bad/30'
  }

  if (priority === 'medium') {
    return 'bg-signal-soft text-signal border-signal/30'
  }

  return 'bg-good/10 text-good border-good/30'
}

const ComplaintList = ({
  title,
  complaints,
  canManage = false,
  updatingId = '',
  onUpdated,
  setUpdatingId,
}: ComplaintListProps) => {
  const handleStatusUpdate = async (
    complaintId: string,
    status: ComplaintStatus
  ) => {
    try {
      setUpdatingId?.(complaintId)

      const updatedComplaint = await updateComplaintStatus(complaintId, {
        status,
        responseNote:
          status === 'in_progress'
            ? 'Your complaint is currently being reviewed.'
            : 'Your complaint has been resolved.',
      })

      onUpdated?.(updatedComplaint)
    } catch {
      alert('Unable to update complaint status.')
    } finally {
      setUpdatingId?.('')
    }
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <ClipboardList size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          {title}
        </h3>
      </div>

      {complaints.length === 0 ? (
        <div className="mt-6 rounded-md border border-line bg-ink-soft p-5 text-sm text-slate">
          No complaints available yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {complaints.map((complaint) => (
            <article
              key={complaint._id}
              className="rounded-lg border border-line bg-ink-soft p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-paper">
                    {complaint.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-md bg-ink px-2 py-1 text-xs uppercase text-signal">
                      {complaint.category}
                    </span>

                    <span
                      className={`rounded-md border px-2 py-1 text-xs uppercase ${getPriorityClass(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority}
                    </span>

                    <span
                      className={`rounded-md border px-2 py-1 text-xs uppercase ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                  <Clock3 size={14} />
                  {formatDate(complaint.createdAt)}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-paper-dim">
                {complaint.description}
              </p>

              {complaint.responseNote && (
                <div className="mt-4 rounded-md border border-line bg-ink p-4">
                  <p className="text-xs text-slate">Response Note</p>
                  <p className="mt-2 text-sm leading-6 text-signal">
                    {complaint.responseNote}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <p className="text-xs text-slate">
                  Raised by{' '}
                  <span className="text-paper">
                    {complaint.createdBy?.name || 'Student'}
                  </span>
                </p>

                {canManage && complaint.status !== 'resolved' && (
                  <div className="flex flex-wrap gap-2">
                    {complaint.status === 'pending' && (
                      <button
                        type="button"
                        disabled={updatingId === complaint._id}
                        onClick={() =>
                          handleStatusUpdate(complaint._id, 'in_progress')
                        }
                        className="rounded-md border border-signal/30 bg-signal-soft px-3 py-2 text-xs font-medium text-signal transition hover:bg-signal-soft/80 disabled:opacity-60"
                      >
                        {updatingId === complaint._id
                          ? 'Updating...'
                          : 'Mark In Progress'}
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={updatingId === complaint._id}
                      onClick={() =>
                        handleStatusUpdate(complaint._id, 'resolved')
                      }
                      className="rounded-md border border-good/30 bg-good/10 px-3 py-2 text-xs font-medium text-good transition hover:bg-good/20 disabled:opacity-60"
                    >
                      {updatingId === complaint._id
                        ? 'Updating...'
                        : 'Mark Resolved'}
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ComplaintList