import Link from "next/link";
import { ArrowRight, TrendingUp, Users, CreditCard, Banknote, AlertCircle, BellRing, UserPlus } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#f6f8f5]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#f6f8f5]">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-900/15 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="col-span-5 text-left mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/80 px-3 py-1.5 text-sm text-emerald-900 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-700"></span>
              Built for small businesses
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#18231f] sm:text-6xl mb-6 leading-[1.08]">
              Credit & Payment Management for <span className="text-emerald-800">Every Business</span>
            </h1>
            <p className="text-lg leading-8 text-slate-600 mb-8 max-w-xl">
              Track customer credit, payments, outstanding balances and reminders — all in one simple platform. Say goodbye to paper notebooks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex justify-center items-center gap-2 rounded-lg bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-emerald-900"
              >
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="inline-flex justify-center items-center gap-2 rounded-lg border border-[#cbd7ce] bg-white px-6 py-3.5 text-sm font-semibold text-[#24332b] transition hover:bg-emerald-50 hover:border-emerald-800/30"
              >
                Explore Dashboard
              </Link>
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="col-span-7 relative mx-auto w-full max-w-2xl lg:max-w-none">
            
            {/* Desktop Tilted Container */}
            <div className="relative w-full lg:translate-x-8">
              
              {/* Floating Card 1: Payment Received */}
              <div className="absolute -left-12 top-12 z-20 animate-[bounce_6s_infinite] hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-2xl shadow-emerald-500/20">
                <div className="rounded-full bg-emerald-500/20 p-2.5 text-emerald-400">
                  <Banknote size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Payment Received</p>
                  <p className="text-sm font-bold text-white">+₹ 5,000</p>
                </div>
              </div>

              {/* Floating Card 2: Outstanding */}
              <div className="absolute -right-8 top-32 z-20 animate-[bounce_5s_infinite_0.5s] hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-2xl shadow-indigo-500/20">
                <div className="rounded-full bg-indigo-500/20 p-2.5 text-indigo-400">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Outstanding</p>
                  <p className="text-sm font-bold text-white">₹ 24,500</p>
                </div>
              </div>

              {/* Floating Card 3: Overdue */}
              <div className="absolute -left-8 bottom-24 z-20 animate-[bounce_5.5s_infinite_1s] hidden md:flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-slate-900/90 backdrop-blur-md p-4 shadow-2xl shadow-rose-500/20">
                <div className="rounded-full bg-rose-500/20 p-2.5 text-rose-400">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Overdue</p>
                  <p className="text-sm font-bold text-white">3 Customers</p>
                </div>
              </div>

              {/* Floating Card 4: New Customer */}
              <div className="absolute right-12 -bottom-6 z-20 animate-[bounce_6s_infinite_1.5s] hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-2xl">
                <div className="rounded-full bg-emerald-500/20 p-2.5 text-emerald-400">
                  <UserPlus size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">New Customer</p>
                  <p className="text-sm font-bold text-white">Rahul Sharma</p>
                </div>
              </div>

              {/* Main Mockup Window */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden ring-1 ring-white/10 bg-linear-to-b from-slate-900 to-slate-950">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 backdrop-blur px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="h-4 w-48 rounded bg-white/5 hidden sm:block"></div>
                    <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center">
                      <BellRing size={12} className="text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Window Content (Mockup Dashboard) */}
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Stats Row */}
                  <div className="col-span-1 sm:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <p className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">Total Given</p>
                      <p className="text-lg sm:text-xl font-semibold text-rose-400">₹ 85,200</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <p className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">Total Collected</p>
                      <p className="text-lg sm:text-xl font-semibold text-emerald-400">₹ 60,700</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <p className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">Receivables</p>
                      <p className="text-lg sm:text-xl font-semibold text-white">₹ 24,500</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <p className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">Active Customers</p>
                      <p className="text-lg sm:text-xl font-semibold text-indigo-400">142</p>
                    </div>
                  </div>
                  
                  {/* Main Content Area */}
                  <div className="col-span-1 sm:col-span-2 space-y-4">
                    {/* Chart Mockup */}
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-5 h-48 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-medium text-white">Credit vs Payment</p>
                        <span className="text-xs text-slate-500">This Month</span>
                      </div>
                      <div className="flex items-end gap-2 h-24 w-full pt-4">
                        {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                          <div key={i} className="flex-1 flex gap-1 items-end justify-center group h-full">
                            <div className="w-1/2 bg-rose-500/20 rounded-t group-hover:bg-rose-500/40 transition-colors" style={{ height: `${h}%` }}></div>
                            <div className="w-1/2 bg-emerald-500/20 rounded-t group-hover:bg-emerald-500/40 transition-colors" style={{ height: `${h * 0.7}%` }}></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-5">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-medium text-white">Recent Transactions</p>
                        <span className="text-xs text-emerald-400 font-medium cursor-pointer">View all</span>
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: "Rahul Sharma", type: "Payment (Partial)", amount: "₹ 1,500", date: "Today, 10:42 AM", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                          { name: "Amit Singh", type: "Credit (Goods)", amount: "₹ 800", date: "Yesterday", color: "text-rose-400", bg: "bg-rose-500/10" },
                          { name: "Neha Gupta", type: "Payment (Full)", amount: "₹ 3,200", date: "Yesterday", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        ].map((tx, i) => (
                          <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className={`h-9 w-9 rounded-full ${tx.bg} flex items-center justify-center text-xs font-semibold ${tx.color}`}>
                                {tx.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-200 group-hover:text-white transition">{tx.name}</p>
                                <p className="text-[11px] text-slate-500">{tx.type} • {tx.date}</p>
                              </div>
                            </div>
                            <p className={`text-sm font-semibold ${tx.color}`}>{tx.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="col-span-1 space-y-4">
                    {/* Collection Priority */}
                    <div className="rounded-xl border border-white/5 bg-slate-900/50 p-5">
                      <p className="text-sm font-medium text-white mb-4">Collection Priority</p>
                      <div className="space-y-3">
                        {[
                          { name: "Vikram Das", amount: "₹ 4,500", due: "Overdue by 3 days", urgent: true },
                          { name: "Sunita Devi", amount: "₹ 2,100", due: "Overdue by 1 day", urgent: true },
                          { name: "Rajesh K.", amount: "₹ 1,800", due: "Due today", urgent: false },
                        ].map((c, i) => (
                          <div key={i} className="p-3 rounded-lg border border-white/5 bg-slate-800/30">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm text-slate-200">{c.name}</p>
                              <p className="text-sm font-medium text-rose-400">{c.amount}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {c.urgent && <AlertCircle size={10} className="text-rose-500" />}
                              <p className={`text-[10px] ${c.urgent ? 'text-rose-400' : 'text-amber-400'}`}>{c.due}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition">
                        Send Reminders
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
