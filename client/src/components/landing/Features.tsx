 import {
  CalendarClock,
  LineChart,
  MessageSquareWarning,
  DoorOpen,
  Megaphone,
  BarChart3,
} from 'lucide-react'
import SectionTitle from '../common/SectionTitle'

const features = [
  {
    title: 'Smart timetable scheduling',
    description:
      'AI-assisted academic scheduling that reduces conflicts and improves faculty and room allocation.',
    icon: CalendarClock,
  },
  {
    title: 'Attendance intelligence',
    description:
      'Track attendance patterns, identify at-risk students, and support early intervention with analytics.',
    icon: LineChart,
  },
  {
    title: 'Complaint management',
    description:
      'Route student complaints to the right department with priority detection and status tracking.',
    icon: MessageSquareWarning,
  },
  {
    title: 'Resource booking',
    description:
      'Manage classrooms, labs, halls, and equipment availability from one centralized system.',
    icon: DoorOpen,
  },
  {
    title: 'Campus announcements',
    description:
      'Publish updates, notices, events, and emergency alerts instantly across the campus.',
    icon: Megaphone,
  },
  {
    title: 'Analytics dashboard',
    description:
      'Give administrators real-time insight into campus performance, usage, and student services.',
    icon: BarChart3,
  },
]

const Features = () => {
  return (
    <section id="features" className="bg-ink px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="Core features"
          title="Everything a smart campus needs"
          description="CampusSync AI brings academic operations, student services, and administrative intelligence into one connected system."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group bg-ink-soft p-7 transition-colors duration-150 hover:bg-panel"
              >
                <Icon size={22} strokeWidth={1.75} className="text-signal" />

                <h3 className="mt-5 font-display text-lg font-semibold text-paper">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features