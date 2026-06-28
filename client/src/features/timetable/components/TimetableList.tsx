 import { CalendarClock, Pencil, Trash2 } from 'lucide-react'
import type { TimetableEntry } from '../types/timetable.types'

type TimetableListProps = {
  title: string
  timetables: TimetableEntry[]
  canManage?: boolean
  deletingId?: string
  onEdit?: (entry: TimetableEntry) => void
  onDelete?: (id: string) => void
}

const formatDay = (day: string) => {
  return day.charAt(0).toUpperCase() + day.slice(1)
}

const TimetableList = ({
  title,
  timetables,
  canManage = false,
  deletingId = '',
  onEdit,
  onDelete,
}: TimetableListProps) => {
  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <CalendarClock size={18} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          {title}
        </h3>
      </div>

      {timetables.length === 0 ? (
        <div className="mt-6 rounded-md border border-line bg-ink-soft p-5 text-sm text-slate">
          No timetable entries available yet.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-ink-soft text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Day</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Faculty</th>
                <th className="px-4 py-3 font-medium">Room</th>
                <th className="px-4 py-3 font-medium">Type</th>

                {canManage && (
                  <th className="px-4 py-3 font-medium">Actions</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {timetables.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 text-signal">
                    {formatDay(item.dayOfWeek)}
                  </td>

                  <td className="px-4 py-3 text-slate">
                    {item.startTime} - {item.endTime}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium text-paper">
                      {item.courseTitle}
                    </p>

                    <p className="mt-1 text-xs text-slate">
                      {item.courseCode}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-slate">{item.facultyName}</td>

                  <td className="px-4 py-3 text-paper">{item.room}</td>

                  <td className="px-4 py-3">
                    <span className="rounded-md bg-signal-soft px-2 py-1 text-xs text-signal">
                      {item.sessionType}
                    </span>
                  </td>

                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit?.(item)}
                          className="inline-flex items-center gap-2 rounded-md border border-signal/30 bg-signal-soft px-3 py-2 text-xs font-medium text-signal transition hover:bg-signal-soft/80"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={() => onDelete?.(item._id)}
                          className="inline-flex items-center gap-2 rounded-md border border-bad/30 bg-bad/10 px-3 py-2 text-xs font-medium text-bad transition hover:bg-bad/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={14} />
                          {deletingId === item._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default TimetableList