import Card from '../common/Card'
import SectionTitle from '../common/SectionTitle'

const stats = [
  {
    value: '10K+',
    title: 'Students',
  },
  {
    value: '98%',
    title: 'Automation',
  },
  {
    value: '24/7',
    title: 'AI Assistant',
  },
  {
    value: '150+',
    title: 'Campus Resources',
  },
]

const Statistics = () => {
  return (
    <section id="stats" className="bg-slate-900 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          badge="Platform Impact"
          title="Designed for modern educational institutions"
          description="CampusSync AI helps institutions automate operations, improve student services, and make data-driven decisions."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="text-center">
              <h3 className="text-5xl font-black text-cyan-400">
                {stat.value}
              </h3>

              <p className="mt-4 text-lg font-semibold text-white">
                {stat.title}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics