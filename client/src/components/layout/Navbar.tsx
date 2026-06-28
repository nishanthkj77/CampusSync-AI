 import { Link } from 'react-router-dom'
import { Grid2x2 } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-line bg-ink/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-paper"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-signal text-ink">
            <Grid2x2 size={16} strokeWidth={2.5} />
          </span>
          CampusSync AI
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate md:flex">
          <a href="/#features" className="transition-colors hover:text-paper">
            Features
          </a>
          <a href="/#stats" className="transition-colors hover:text-paper">
            Impact
          </a>
          <a href="/#architecture" className="transition-colors hover:text-paper">
            Architecture
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-md px-4 py-2 text-sm font-medium text-slate transition-colors hover:text-paper sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#ff9c5c]"
          >
            Launch demo
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar