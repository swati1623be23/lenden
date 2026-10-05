export function BilingualSupport() {
  return (
    <section className="py-24 sm:py-32 bg-slate-950 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Local languages for local businesses
          </h2>
          <p className="text-lg leading-8 text-slate-400 mb-10">
            Manage your business in the language you're comfortable with. LenDen supports both English and Nepali interfaces natively.
          </p>
          
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-white/10 shadow-lg">
              <button className="rounded-md bg-emerald-500/20 text-emerald-400 px-6 py-2 text-sm font-medium transition">
                English
              </button>
              <button className="rounded-md text-slate-400 hover:text-white px-6 py-2 text-sm font-medium transition">
                नेपाली
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
