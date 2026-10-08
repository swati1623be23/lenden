export function BilingualSupport() {
  return (
    <section className="py-24 sm:py-32 bg-[#f6f8f5] border-y border-[#e1e8e2]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl mb-6">
            Local languages for local businesses
          </h2>
          <p className="text-lg leading-8 text-slate-600 mb-10">
            Manage your business in the language you&apos;re comfortable with. LenDen supports both English and Nepali interfaces natively.
          </p>
          
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-white p-1 border border-[#dce5dd] shadow-sm">
              <button className="rounded-md bg-emerald-800 text-white px-6 py-2 text-sm font-medium transition">
                English
              </button>
              <button className="rounded-md text-slate-600 hover:text-emerald-800 px-6 py-2 text-sm font-medium transition">
                नेपाली
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
