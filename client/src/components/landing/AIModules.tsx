import Card from '../common/Card'
import SectionTitle from '../common/SectionTitle'

const modules = [
  {
    title: 'AI Smart Scheduling',
    description:
      'Automatically generates conflict-free class schedules by optimizing faculty, classrooms, and academic resources.',
  },
  {
    title: 'AI Attendance Insights',
    description:
      'Identifies attendance trends, detects at-risk students, and provides early intervention recommendations.',
  },
  {
    title: 'Complaint Intelligence',
    description:
      'Analyzes complaints, detects urgency, and routes them to the appropriate department automatically.',
  },
  {
    title: 'Predictive Analytics',
    description:
      'Provides administrators with insights into campus operations using historical and real-time data.',
  },
  {
    title: 'Resource Optimization',
    description:
      'Optimizes the usage of classrooms, laboratories, seminar halls, and campus facilities.',
  },
  {
    title: 'Campus AI Assistant',
    description:
      'A virtual assistant that answers student and faculty queries 24/7 using natural language processing.',
  },
]

const AIModules = () => {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="AI Modules"
          title="Intelligence at the core of CampusSync AI"
          description="Artificial Intelligence powers every major decision—from scheduling and attendance to analytics and student support."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card
              key={module.title}
              className="transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
                🤖
              </div>

              <h3 className="text-xl font-bold text-white">
                {module.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {module.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIModules