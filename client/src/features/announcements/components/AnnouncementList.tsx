import { Bell, CalendarDays } from 'lucide-react'
import type { Announcement } from '../types/announcement.types'

type AnnouncementListProps = {
  title: string
  announcements: Announcement[]
}

const formatDate = (dateValue: string) => {
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
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

const AnnouncementList = ({ title, announcements }: AnnouncementListProps) => {
  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <Bell size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          {title}
        </h3>
      </div>

      {announcements.length === 0 ? (
        <div className="mt-6 rounded-md border border-line bg-ink-soft p-5 text-sm text-slate">
          No announcements available yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {announcements.map((announcement) => (
            <article
              key={announcement._id}
              className="rounded-lg border border-line bg-ink-soft p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-paper">
                    {announcement.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-md bg-ink px-2 py-1 text-xs uppercase text-signal">
                      {announcement.category}
                    </span>

                    <span
                      className={`rounded-md border px-2 py-1 text-xs uppercase ${getPriorityClass(
                        announcement.priority
                      )}`}
                    >
                      {announcement.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate">
                  <CalendarDays size={14} />
                  {formatDate(announcement.createdAt)}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-paper-dim">
                {announcement.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <p className="text-xs text-slate">
                  Posted by{' '}
                  <span className="text-paper">
                    {announcement.createdBy?.name || 'CampusSync User'}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {announcement.audienceRoles.map((role) => (
                    <span
                      key={role}
                      className="rounded-md border border-line bg-ink px-2 py-1 text-[10px] uppercase text-slate"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AnnouncementList