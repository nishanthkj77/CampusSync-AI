import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">

          {/* Left Side */}

          <div className="hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 p-12 lg:flex lg:flex-col lg:justify-between">

            <div>
              <h1 className="text-4xl font-black">
                CampusSync AI
              </h1>

              <p className="mt-6 text-lg leading-8 text-cyan-100">
                Intelligent Campus Management Platform built for
                Smart India Hackathon 2026.
              </p>
            </div>

            <div className="space-y-4 text-cyan-100">
              <p>✓ AI Timetable Optimization</p>
              <p>✓ Smart Attendance Tracking</p>
              <p>✓ Complaint Intelligence</p>
              <p>✓ Resource Management</p>
            </div>

          </div>

          {/* Right Side */}

          <div className="p-10 lg:p-14">

            <h2 className="text-4xl font-bold">
              {title}
            </h2>

            <p className="mt-3 text-slate-400">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default AuthLayout