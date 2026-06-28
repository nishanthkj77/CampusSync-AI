import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          CampusSync <span className="text-cyan-400">AI</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="/#features" className="transition hover:text-cyan-300">
            Features
          </a>
          <a href="/#stats" className="transition hover:text-cyan-300">
            Impact
          </a>
          <a href="/#architecture" className="transition hover:text-cyan-300">
            Architecture
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Launch Demo
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
