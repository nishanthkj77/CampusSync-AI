import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-cyan-500/10 md:grid-cols-2">
          <section className="flex min-h-[420px] flex-col justify-between bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 p-8 text-white">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                CampusSync AI
              </h1>
              <p className="mt-4 max-w-md text-lg text-cyan-50">
                Intelligent Campus Management Platform built for Smart India
                Hackathon 2026.
              </p>
            </div>

            <div className="space-y-3 text-base font-medium">
              <p>✓ AI Timetable Optimization</p>
              <p>✓ Smart Attendance Tracking</p>
              <p>✓ Complaint Intelligence</p>
              <p>✓ Resource Management</p>
            </div>
          </section>

          <section className="flex items-center p-8">
            <div className="w-full">
              <h2 className="text-4xl font-black">{title}</h2>
              <p className="mt-2 text-slate-400">{subtitle}</p>

              <div className="mt-8">{children}</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout