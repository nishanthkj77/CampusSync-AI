import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'rounded-xl px-7 py-3 font-bold transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary:
      'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/25 hover:bg-cyan-300',
    secondary:
      'border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10',
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
