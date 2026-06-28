 import MainLayout from '../layouts/MainLayout'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Statistics from '../components/landing/Statistics'
import AIModules from '../components/landing/AIModules'
import Architecture from '../components/landing/Architecture'
import CTA from '../components/landing/CTA'

const LandingPage = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Statistics />
      <AIModules />
      <Architecture />
      <CTA />
    </MainLayout>
  )
}

export default LandingPage