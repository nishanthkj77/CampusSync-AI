type BadgeProps = {
  children: React.ReactNode
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
      {children}
    </span>
  )
}

export default Badge