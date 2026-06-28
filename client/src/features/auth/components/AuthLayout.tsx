 import type { ReactNode } from 'react'
import { Grid2x2 } from 'lucide-react'
import { Link } from 'react-router-dom'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <main className="grid min-h-screen bg-ink text-paper lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden border-r border-line bg-panel lg:block">
        <div className="grid-texture-fine absolute inset-0 opacity-70" />

        <div className="relative flex h-full flex-col justify-between p-10">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-signal text-ink">
              <Grid2x2 size={17} strokeWidth={2.5} />
            </span>
            CampusSync AI
          </Link>

          <div>
            <p className="mono-label text-xs text-signal">
              Smart campus platform
            </p>

            <h1 className="mt-5 max-w-lg font-display text-5xl font-semibold leading-tight tracking-tight">
              Access the campus control center.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate">
              Sign in to manage schedules, attendance, complaints,
              announcements, resources, and AI-powered campus insights.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate">
            <p>✓ Role-based access for Student, Faculty, HOD, and Admin</p>
            <p>✓ JWT-secured backend authentication</p>
            <p>✓ MongoDB-powered campus data foundation</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 flex items-center gap-2.5 font-display text-lg font-semibold lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-signal text-ink">
              <Grid2x2 size={17} strokeWidth={2.5} />
            </span>
            CampusSync AI
          </Link>

          <p className="mono-label text-xs text-signal">Secure access</p>

          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate">{subtitle}</p>

          <div className="mt-8 rounded-xl border border-line bg-panel p-6">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout