 type BadgeProps = {
  children: React.ReactNode
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="mono-label inline-flex items-center gap-2 rounded-sm border border-line bg-panel px-3 py-1.5 text-xs font-medium text-slate">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </span>
  )
}

export default Badge