type CardProps = {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  )
}

export default Card