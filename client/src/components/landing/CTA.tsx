 import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'

const CTA = () => {
  const navigate = useNavigate()

  return (
    <section className="bg-ink px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-xl border border-line bg-panel p-10 text-center md:p-14">
        <p className="mono-label text-xs text-signal">Ready for demo</p>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
          Start managing the campus from one intelligent dashboard.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate">
          Login as student, faculty, HOD, or admin and experience the foundation
          of CampusSync AI.
        </p>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate('/login')}>
            Launch CampusSync AI <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA