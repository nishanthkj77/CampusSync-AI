 import { useAuthStore } from '../store/authStore'
import DashboardHeader from '../features/dashboard/components/DashboardHeader'
import StudentDashboard from '../features/dashboard/components/StudentDashboard'
import FacultyDashboard from '../features/dashboard/components/FacultyDashboard'
import HodDashboard from '../features/dashboard/components/HodDashboard'
import AdminDashboard from '../features/dashboard/components/AdminDashboard'

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user)

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />

      case 'faculty':
        return <FacultyDashboard />

      case 'hod':
        return <HodDashboard />

      case 'admin':
        return <AdminDashboard />

      default:
        return <StudentDashboard />
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <DashboardHeader />

      <section className="mx-auto max-w-7xl px-6 py-8">
        {renderDashboard()}
      </section>
    </main>
  )
}

export default DashboardPage