import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-14">
          <span className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-200">
            LenDen Credit Management
          </span>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Manage customers, credits, payments, and outstanding balances.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            A responsive credit management system built with Next.js, Prisma, Tailwind CSS and PostgreSQL.
            Register or log in to start tracking customers, add credit and payment entries, and view balances in one dashboard.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
