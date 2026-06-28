 const stats = [
  {
    value: '40%',
    label: 'less timetable conflict',
  },
  {
    value: '3x',
    label: 'faster complaint routing',
  },
  {
    value: '24/7',
    label: 'campus service visibility',
  },
  {
    value: '100%',
    label: 'role-based dashboard access',
  },
]

const Statistics = () => {
  return (
    <section id="stats" className="border-y border-line bg-panel px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink px-6 py-8 text-center">
            <p className="font-display text-4xl font-semibold text-signal">
              {stat.value}
            </p>
            <p className="mono-label mt-3 text-xs text-slate">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Statistics