import {
  Bot,
  CheckCircle2,
  ClipboardCheck,
  LayoutDashboard,
  LogIn,
  Megaphone,
  Presentation,
  UserCheck,
} from 'lucide-react'

const demoSteps = [
  {
    title: 'Open Landing Page',
    description:
      'Introduce CampusSync AI as an AI-powered smart campus timetable and coordination platform.',
    icon: Presentation,
  },
  {
    title: 'Login as Admin',
    description:
      'Show campus-wide control, reports, AI timetable generator, attendance, complaints, and users.',
    icon: LogIn,
  },
  {
    title: 'Show Reports & Analytics',
    description:
      'Explain attendance summary, complaint report, timetable report, department breakdown, and alerts.',
    icon: LayoutDashboard,
  },
  {
    title: 'Generate AI Timetable',
    description:
      'Use AI generator to create a conflict-free timetable preview for department, semester, and section.',
    icon: Bot,
  },
  {
    title: 'Approve & Save Timetable',
    description:
      'Save AI-generated timetable entries and show that they appear in the timetable list.',
    icon: CheckCircle2,
  },
  {
    title: 'Show AI Conflict Detection',
    description:
      'Explain room conflict, faculty double-booking, and section overlap detection.',
    icon: Bot,
  },
  {
    title: 'Login as Faculty',
    description:
      'Show assigned timetable and roster-based attendance marking.',
    icon: ClipboardCheck,
  },
  {
    title: 'Login as Student',
    description:
      'Show student timetable, attendance, announcements, and complaint tracking.',
    icon: UserCheck,
  },
  {
    title: 'Login as HOD',
    description:
      'Show department reports, AI timetable generation, attendance summary, and complaint management.',
    icon: Megaphone,
  },
]

const DemoGuidePanel = () => {
  return (
    <section className="rounded-lg border border-signal/30 bg-signal-soft p-6">
      <div className="flex items-center gap-2">
        <Presentation size={20} className="text-signal" />

        <h3 className="font-display text-xl font-semibold text-paper">
          SIH Demo Guide
        </h3>
      </div>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-paper-dim">
        Use this flow during project review to explain CampusSync AI clearly:
        start with the problem, show AI timetable generation, then prove that
        each role has a real workflow.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoSteps.map((step, index) => {
          const Icon = step.icon

          return (
            <div
              key={step.title}
              className="rounded-lg border border-line bg-panel p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink-soft text-signal">
                  <Icon size={17} />
                </div>

                <div>
                  <p className="text-xs text-signal">Step {index + 1}</p>

                  <h4 className="mt-1 font-display text-base font-semibold text-paper">
                    {step.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-md border border-line bg-panel p-4">
        <p className="text-sm leading-6 text-slate">
          Main explanation line:{' '}
          <span className="text-paper">
            CampusSync AI automatically generates conflict-free timetables,
            detects scheduling issues, and connects timetable operations with
            attendance, complaints, announcements, and analytics.
          </span>
        </p>
      </div>
    </section>
  )
}

export default DemoGuidePanel