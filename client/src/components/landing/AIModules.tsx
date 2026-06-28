 import { BrainCircuit, Clock3, ShieldCheck, Sparkles } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'

const modules = [
  {
    title: 'Timetable Optimizer',
    description:
      'Detects clashes between faculty, rooms, labs, and courses before schedules are published.',
    icon: Clock3,
  },
  {
    title: 'Complaint Classifier',
    description:
      'Understands complaint category and urgency, then routes it to the correct authority.',
    icon: BrainCircuit,
  },
  {
    title: 'Risk Insights',
    description:
      'Highlights attendance issues, repeated complaints, and service delays for early action.',
    icon: ShieldCheck,
  },
  {
    title: 'Campus Assistant',
    description:
      'Provides quick responses for students, faculty, and admin users through AI-driven support.',
    icon: Sparkles,
  },
]

const AIModules = () => {
  return (
    <section className="bg-ink px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="AI modules"
          title="Built with intelligence at the core"
          description="CampusSync AI is not only a management portal. It uses AI-driven assistance to reduce manual effort and improve campus decisions."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon

            return (
              <article
                key={module.title}
                className="rounded-lg border border-line bg-panel p-7 transition-colors hover:bg-panel-raised"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-signal-soft text-signal">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-paper">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate">
                  {module.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AIModules