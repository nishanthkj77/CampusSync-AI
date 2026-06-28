import Card from '../common/Card'
import SectionTitle from '../common/SectionTitle'

const features = [
  {
    title: 'Smart Timetable Scheduling',
    description:
      'AI-assisted academic scheduling that reduces timetable conflicts and improves faculty and room allocation.',
  },
  {
    title: 'Attendance Intelligence',
    description:
      'Track attendance patterns, identify risk students, and support early intervention using analytics.',
  },
  {
    title: 'Complaint Management',
    description:
      'Route student complaints to the right department with priority detection and status tracking.',
  },
  {
    title: 'Resource Booking',
    description:
      'Manage classrooms, labs, halls, and equipment availability from one centralized system.',
  },
  {
    title: 'Campus Announcements',
    description:
      'Publish important updates, notices, events, and emergency alerts instantly across the campus.',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Give administrators real-time insights into campus performance, usage, and student services.',
  },
]

const Features = () => {
  return (
    <section id="features" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="Core Features"
          title="Everything a smart campus needs"
          description="CampusSync AI brings academic operations, student services, and administrative intelligence into one connected digital platform."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transition hover:-translate-y-2">
              <div className="mb-5 h-12 w-12 rounded-2xl bg-cyan-400/10" />

              <h3 className="text-xl font-bold text-white">{feature.title}</h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features