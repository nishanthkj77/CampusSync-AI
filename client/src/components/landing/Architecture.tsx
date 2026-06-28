import Card from '../common/Card'
import SectionTitle from '../common/SectionTitle'

const layers = [
  {
    title: 'Frontend',
    tech: 'React + TypeScript',
    description:
      'Responsive interface for students, faculty, and administrators.',
  },
  {
    title: 'Backend',
    tech: 'Node.js + Express',
    description:
      'REST APIs, authentication, role-based access, and business logic.',
  },
  {
    title: 'AI Engine',
    tech: 'Python',
    description:
      'AI scheduling, complaint priority detection, and predictive analytics.',
  },
  {
    title: 'Database',
    tech: 'MongoDB',
    description:
      'Stores users, attendance, schedules, complaints, and campus data.',
  },
]

const Architecture = () => {
  return (
    <section id="architecture" className="bg-slate-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="Enterprise Architecture"
          title="Scalable system design for a real campus"
          description="CampusSync AI is structured into separate layers so the platform stays secure, maintainable, and ready for future expansion."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer) => (
            <Card key={layer.title} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                ⚙️
              </div>

              <h3 className="text-xl font-bold text-white">{layer.title}</h3>

              <p className="mt-2 font-semibold text-cyan-300">{layer.tech}</p>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {layer.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Architecture