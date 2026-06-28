 import { Grid2x2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center justify-center gap-2.5 md:justify-start">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-signal text-ink">
            <Grid2x2 size={14} strokeWidth={2.5} />
          </span>
          <span className="font-display text-base font-semibold text-paper">
            CampusSync AI
          </span>
        </div>

        <p className="mono-label text-xs text-slate-dim">
          © 2026 CampusSync AI — Built for Smart India Hackathon
        </p>
      </div>
    </footer>
  )
}

export default Footer