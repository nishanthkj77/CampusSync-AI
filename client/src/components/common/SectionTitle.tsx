type SectionTitleProps = {
  badge: string
  title: string
  description: string
}

const SectionTitle = ({ badge, title, description }: SectionTitleProps) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {badge}
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-400">
        {description}
      </p>
    </div>
  )
}

export default SectionTitle