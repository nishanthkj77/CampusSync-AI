import type { LucideIcon } from 'lucide-react'

type StatsCardProps = {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

const StatsCard = ({ title, value, description, icon: Icon }: StatsCardProps) => {
  return (
    <article className="rounded-lg border border-line bg-panel p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-signal-soft text-signal">
          <Icon size={21} />
        </div>

        <span className="mono-label text-[10px] text-slate-dim">Live</span>
      </div>

      <p className="mt-6 font-display text-4xl font-semibold text-paper">
        {value}
      </p>

      <h3 className="mt-2 text-sm font-semibold text-paper">{title}</h3>

      <p className="mt-1 text-sm text-slate">{description}</p>
    </article>
  )
}

export default StatsCard