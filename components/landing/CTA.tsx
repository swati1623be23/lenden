import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center rounded-3xl bg-slate-950/50 backdrop-blur-xl border border-white/10 p-10 sm:p-16 shadow-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to simplify your credit management?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Bring your customer credit, payments and outstanding balances into one simple system.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
