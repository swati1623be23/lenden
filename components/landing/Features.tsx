import { Users, CreditCard, Banknote, MessageCircle, BarChart3, FileDown, Languages, Smartphone, BellRing, ArrowRight } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#f6f8f5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl">
            Everything you need to stay on top of your money
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A complete suite of tools designed to help you manage credit and recover payments faster.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Feature 1: Customer Management (Large) */}
          <div className="md:col-span-2 rounded-2xl border border-[#dce5dd] bg-white overflow-hidden flex flex-col md:flex-row group shadow-sm">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 mb-6">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-[#18231f] mb-3">Customer Management</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Create comprehensive profiles for every customer. Track their total credit, payments made, and current outstanding balance at a glance.
              </p>
              <span className="text-indigo-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View all profiles <ArrowRight size={16} />
              </span>
            </div>
            <div className="md:w-1/2 bg-slate-900 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-l from-slate-900/50 to-transparent z-10" />
              {/* Mockup */}
              <div className="w-full max-w-sm rounded-xl border border-white/10 bg-slate-950 shadow-2xl p-4 rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl font-bold text-indigo-400">
                    RS
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Rahul Sharma</h4>
                    <p className="text-xs text-slate-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase">Outstanding</p>
                    <p className="text-lg font-bold text-rose-400">₹ 2,400</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase">Total Paid</p>
                    <p className="text-lg font-bold text-emerald-400">₹ 15,600</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-right text-slate-400">85% Recovery Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Credit Tracking */}
          <div className="rounded-2xl border border-[#dce5dd] bg-white overflow-hidden flex flex-col group shadow-sm">
            <div className="p-8 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 mb-6">
                <CreditCard className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-[#18231f] mb-3">Credit Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Record credit with due dates, categories, and descriptive notes in seconds.
              </p>
            </div>
            <div className="bg-slate-900 h-48 p-6 relative overflow-hidden flex items-end justify-center">
              {/* Mockup */}
              <div className="w-full rounded-t-xl border-x border-t border-white/10 bg-slate-950 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                  <h4 className="text-sm font-semibold text-white">Add Credit</h4>
                  <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded">Unpaid</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg">
                    <span className="text-xs text-slate-400">Amount</span>
                    <span className="text-sm font-bold text-rose-400">₹ 1,200</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg">
                    <span className="text-xs text-slate-400">Category</span>
                    <span className="text-xs text-slate-300">Groceries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Payment Management */}
          <div className="rounded-2xl border border-[#dce5dd] bg-white overflow-hidden flex flex-col group shadow-sm">
             <div className="p-8 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 mb-6">
                <Banknote className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-[#18231f] mb-3">Payment Management</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Log full or partial payments. LenDen automatically recalculates the remaining balance instantly.
              </p>
            </div>
            <div className="bg-slate-900 h-48 p-6 relative overflow-hidden flex items-center justify-center">
              {/* Mockup */}
              <div className="w-full rounded-xl border border-white/10 bg-slate-950 p-4 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-500">
                <div className="flex gap-2 mb-4 p-1 bg-slate-900 rounded-lg">
                  <div className="flex-1 bg-emerald-500 text-slate-950 text-xs font-semibold py-1.5 text-center rounded-md">Full Payment</div>
                  <div className="flex-1 text-slate-400 text-xs font-medium py-1.5 text-center rounded-md">Partial</div>
                </div>
                <div className="text-center py-2">
                  <p className="text-3xl font-bold text-emerald-400">₹ 2,400</p>
                  <p className="text-[10px] text-slate-500 mt-1">Clears outstanding balance</p>
                </div>
                <div className="mt-3 bg-emerald-500/10 text-emerald-400 text-xs text-center py-2 rounded-lg font-medium">
                  Record Payment
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: WhatsApp Reminders (Large) */}
          <div className="md:col-span-2 rounded-2xl border border-[#dce5dd] bg-white overflow-hidden flex flex-col md:flex-row-reverse group shadow-sm">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/20 mb-6">
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-bold text-[#18231f] mb-3">WhatsApp Reminders</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stop feeling awkward about asking for money. Send polite, pre-filled payment reminders directly via WhatsApp in one click.
              </p>
              <span className="text-[#25D366] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Send reminders faster <ArrowRight size={16} />
              </span>
            </div>
            <div className="md:w-1/2 bg-slate-900 p-6 flex items-center justify-center relative overflow-hidden">
               {/* Mockup */}
               <div className="w-full max-w-70 rounded-3xl border-4 border-slate-800 bg-[#E5DDD5] shadow-2xl overflow-hidden -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md z-10 relative">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">R</div>
                    <div>
                      <h4 className="text-sm font-semibold">Rahul Sharma</h4>
                      <p className="text-[10px] text-white/70">online</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r_QNTqHnN1P.png')] bg-cover relative">
                    <div className="bg-emerald-50 p-3 rounded-lg rounded-tr-none ml-4 shadow-sm relative text-slate-800 mb-2">
                      <p className="text-[13px] leading-snug">
                        Hi Rahul, this is a reminder from <span className="font-semibold">LenDen Shop</span> that your payment of <span className="font-semibold">₹ 2,400</span> is due.
                      </p>
                      <span className="text-[9px] text-slate-500 block text-right mt-1">10:42 AM</span>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg rounded-tr-none ml-4 shadow-sm relative text-slate-800">
                      <p className="text-[13px] leading-snug">
                        Please make the payment by the due date. Thank you!
                      </p>
                      <span className="text-[9px] text-slate-500 block text-right mt-1">10:42 AM</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 5: Reports */}
          <div className="rounded-2xl border border-[#dce5dd] bg-white p-8 flex flex-col group shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-[#18231f] mb-3">Reports & Analytics</h3>
            <p className="text-slate-600 text-sm mb-6 flex-1">
              Visualize credit trends, monthly collections, and outstanding balances with beautiful charts.
            </p>
            <div className="h-24 w-full bg-slate-900 rounded-xl border border-white/5 p-3 flex items-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              {[30, 45, 25, 60, 40, 75, 50, 90, 65, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/30 rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          {/* Feature 6: Exports */}
          <div className="rounded-2xl border border-[#dce5dd] bg-white p-8 flex flex-col group shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 mb-6">
              <FileDown className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-[#18231f] mb-3">PDF Statements</h3>
            <p className="text-slate-600 text-sm mb-6 flex-1">
              Generate professional customer statements and export business data to PDF or CSV instantly.
            </p>
            <div className="h-24 w-full bg-slate-900 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-orange-500/30 transition-colors">
               <div className="bg-slate-950 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                 <FileDown size={16} className="text-orange-400" />
                 <span className="text-xs text-white">Statement_Rahul.pdf</span>
               </div>
            </div>
          </div>

          {/* Feature 7: PWA / Offline */}
          <div className="rounded-2xl border border-[#dce5dd] bg-white p-8 flex flex-col group shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 mb-6">
              <Smartphone className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-[#18231f] mb-3">Mobile & Offline Ready</h3>
            <p className="text-slate-600 text-sm mb-6 flex-1">
              Install LenDen as an app on your phone. Works reliably even when your internet connection drops.
            </p>
            <div className="h-24 w-full bg-slate-900 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:shadow-inner">
               <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
               <p className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded">Offline Mode Active</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
