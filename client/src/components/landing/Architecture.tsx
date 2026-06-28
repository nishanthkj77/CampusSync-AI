 import SectionTitle from '../common/SectionTitle'

const layers = [
  {
    name: 'Frontend',
    tech: 'React + TypeScript + Tailwind',
    description: 'Role-based UI for students, faculty, HOD, and administrators.',
  },
  {
    name: 'Backend',
    tech: 'Express + TypeScript',
    description: 'REST APIs for authentication, users, academic operations, and workflows.',
  },
  {
    name: 'Database',
    tech: 'MongoDB + Mongoose',
    description: 'Stores users, schedules, complaints, attendance, rooms, and announcements.',
  },
  {
    name: 'AI Engine',
    tech: 'Python / ML services',
    description: 'Future module for timetable optimization, complaint classification, and insights.',
  },
]

const Architecture = () => {
  return (
    <section id="architecture" className="border-t border-line bg-ink px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="System architecture"
          title="Clean structure for a real SIH project"
          description="The platform is designed as a modular full-stack system so every major feature can grow without breaking the rest of the project."
        />

        <div className="mt-16 grid gap-4">
          {layers.map((layer, index) => (
            <div
              key={layer.name}
              className="grid gap-5 rounded-lg border border-line bg-panel p-6 md:grid-cols-[120px_1fr_1.4fr]"
            >
              <p className="mono-label text-xs text-signal">
                Layer {index + 1}
              </p>

              <div>
                <h3 className="font-display text-xl font-semibold text-paper">
                  {layer.name}
                </h3>
                <p className="mt-1 text-sm text-slate">{layer.tech}</p>
              </div>

              <p className="text-sm leading-6 text-slate">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Architecture