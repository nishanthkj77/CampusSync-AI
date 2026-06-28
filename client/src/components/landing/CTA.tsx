import Button from '../common/Button'

const CTA = () => {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-16 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Ready to build the future of campus management?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          CampusSync AI is designed to help institutions automate operations,
          improve student support, and make smarter decisions with AI-powered
          insights.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button>Start Demo</Button>
          <Button variant="secondary">View Project Plan</Button>
        </div>
      </div>
    </section>
  )
}

export default CTA