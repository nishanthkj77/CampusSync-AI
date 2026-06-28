 import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-ink font-body text-paper">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout