const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="text-xl font-bold">
            CampusSync <span className="text-cyan-400">AI</span>
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Intelligent Campus Management Platform for SIH 2026.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 CampusSync AI. Built for Smart India Hackathon.
        </p>
      </div>
    </footer>
  )
}

export default Footer