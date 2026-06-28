 import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold font-display transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary: 'bg-signal text-ink hover:bg-[#ff9c5c] active:bg-signal-dim',
    secondary:
      'border border-line bg-transparent text-paper hover:border-paper-dim hover:bg-panel',
    ghost: 'text-slate hover:text-paper',
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button