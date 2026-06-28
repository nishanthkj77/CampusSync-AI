 type SectionTitleProps = {
  badge: string
  title: string
  description: string
}

const SectionTitle = ({ badge, title, description }: SectionTitleProps) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mono-label text-xs font-medium text-signal">{badge}</p>

      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-7 text-slate">{description}</p>
    </div>
  )
}

export default SectionTitle