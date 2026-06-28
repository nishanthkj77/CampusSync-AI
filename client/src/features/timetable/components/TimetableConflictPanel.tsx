import { AlertTriangle, BrainCircuit, CheckCircle2 } from 'lucide-react'
import type { TimetableConflictReport } from '../types/timetable.types'

type TimetableConflictPanelProps = {
  report: TimetableConflictReport | null
}

const formatConflictType = (type: string) => {
  return type.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

const TimetableConflictPanel = ({ report }: TimetableConflictPanelProps) => {
  if (!report) {
    return (
      <section className="rounded-lg border border-line bg-panel p-6">
        <p className="text-sm text-slate">Loading AI conflict analysis...</p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center gap-2">
        <BrainCircuit size={19} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          AI Timetable Conflict Analysis
        </h3>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate">
        CampusSync AI checks room clashes, faculty double-booking, and section
        overlap using timetable data from MongoDB.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-line bg-ink-soft p-4">
          <p className="text-xs text-slate">Total Entries</p>
          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.totalEntries}
          </p>
        </div>

        <div className="rounded-md border border-line bg-ink-soft p-4">
          <p className="text-xs text-slate">Conflicts Found</p>
          <p className="mt-2 font-display text-2xl font-semibold text-signal">
            {report.conflictCount}
          </p>
        </div>

        <div className="rounded-md border border-line bg-ink-soft p-4">
          <p className="text-xs text-slate">AI Status</p>
          <p className="mt-2 font-display text-2xl font-semibold text-paper">
            {report.conflictCount === 0 ? 'Clear' : 'Review'}
          </p>
        </div>
      </div>

      {report.conflictCount === 0 ? (
        <div className="mt-6 flex items-start gap-3 rounded-md border border-good/30 bg-good/10 p-4">
          <CheckCircle2 size={18} className="mt-0.5 text-good" />
          <div>
            <p className="text-sm font-semibold text-good">
              No timetable conflicts detected.
            </p>
            <p className="mt-1 text-sm text-slate">
              Current schedule looks stable.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {report.conflicts.map((conflict) => (
            <div
              key={conflict.id}
              className="rounded-lg border border-bad/30 bg-bad/10 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-bad" />

                  <p className="font-display text-lg font-semibold text-paper">
                    {formatConflictType(conflict.type)}
                  </p>
                </div>

                <span className="rounded-md bg-ink px-3 py-1 text-xs uppercase text-bad">
                  {conflict.severity}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-paper-dim">
                {conflict.message}
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-ink-soft p-3">
                  <p className="text-xs text-slate">Day</p>
                  <p className="mt-1 text-sm text-paper">
                    {conflict.dayOfWeek.toUpperCase()}
                  </p>
                </div>

                <div className="rounded-md bg-ink-soft p-3">
                  <p className="text-xs text-slate">Conflict Time</p>
                  <p className="mt-1 text-sm text-paper">
                    {conflict.timeWindow}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-md border border-line bg-ink-soft p-4">
                <p className="text-xs text-slate">AI Suggestion</p>
                <p className="mt-2 text-sm leading-6 text-signal">
                  {conflict.suggestion}
                </p>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {conflict.entries.map((entry) => (
                  <div
                    key={entry._id}
                    className="rounded-md border border-line bg-ink p-4"
                  >
                    <p className="font-medium text-paper">
                      {entry.courseTitle}
                    </p>
                    <p className="mt-1 text-xs text-slate">
                      {entry.courseCode} • {entry.room} • {entry.startTime} -{' '}
                      {entry.endTime}
                    </p>
                    <p className="mt-2 text-xs text-slate">
                      {entry.facultyName} • Sem {entry.semester} Sec{' '}
                      {entry.section}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TimetableConflictPanel