import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-[#eaf1eb]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#eaf1eb]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-900/15 to-transparent" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center rounded-2xl bg-white border border-[#dce5dd] p-10 sm:p-16 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl">
            Ready to simplify your credit management?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Bring your customer credit, payments and outstanding balances into one simple system.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex justify-center rounded-lg bg-emerald-800 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-[#cbd7ce] bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-800/30 hover:bg-emerald-50"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
