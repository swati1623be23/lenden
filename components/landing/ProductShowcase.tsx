import { CheckCircle2, Search, Filter, MoreVertical, FileText, Share2, Printer } from "lucide-react";

export function ProductShowcase() {
  return (
    <section className="py-24 sm:py-32 bg-[#edf2ed] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32">
        
        {/* Section 1: Dashboard */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl mb-6">
              Know exactly what your business is owed
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Get a clear, real-time overview of your cash flow. See total receivables, active customers, and prioritize collections effortlessly from a central dashboard.
            </p>
            <ul className="space-y-4 text-slate-700">
              {['Real-time dashboard metrics', 'Visual credit vs payment insights', 'Automatic overdue alerts'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl">
              <div className="rounded-xl border border-white/5 bg-slate-900 overflow-hidden shadow-inner">
                {/* Mockup Header */}
                <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                   <div className="flex gap-4 items-center">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                        <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                        <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                      </div>
                      <div className="hidden sm:block text-xs text-slate-400 font-medium">Dashboard Overview</div>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="bg-slate-800 rounded px-2 py-1 text-[10px] text-slate-300">This Month</div>
                   </div>
                </div>
                {/* Mockup Content */}
                <div className="p-4 sm:p-6 bg-slate-900">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                     {[{label: "Receivables", val: "₹ 24,500", color: "text-white"}, {label: "Given", val: "₹ 85,200", color: "text-rose-400"}, {label: "Collected", val: "₹ 60,700", color: "text-emerald-400"}, {label: "Customers", val: "142", color: "text-indigo-400"}].map((s,i) => (
                        <div key={i} className="bg-slate-950/50 rounded-xl border border-white/5 p-3 sm:p-4">
                           <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
                           <p className={`text-base sm:text-lg font-bold ${s.color}`}>{s.val}</p>
                        </div>
                     ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     <div className="sm:col-span-2 rounded-xl border border-white/5 bg-slate-950/30 p-4">
                        <p className="text-sm font-medium text-white mb-4">Cash Flow</p>
                        <div className="h-32 flex items-end gap-2">
                           {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                              <div key={i} className="flex-1 flex gap-0.5 items-end justify-center group h-full">
                                <div className="w-1/2 bg-rose-500/40 rounded-t" style={{ height: `${h}%` }}></div>
                                <div className="w-1/2 bg-emerald-500/40 rounded-t" style={{ height: `${h * 0.7}%` }}></div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="sm:col-span-1 rounded-xl border border-white/5 bg-slate-950/30 p-4">
                        <p className="text-sm font-medium text-white mb-3">Priority</p>
                        <div className="space-y-2">
                           {[1, 2, 3].map((i) => (
                             <div key={i} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-white/5">
                               <div>
                                 <div className="h-2 w-16 bg-slate-700 rounded mb-1"></div>
                                 <div className="h-1.5 w-10 bg-rose-500/50 rounded"></div>
                               </div>
                               <div className="h-3 w-12 bg-slate-600 rounded"></div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Ledger & Payments */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 mb-10 lg:mb-0 lg:order-last">
            <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl mb-6">
              Never lose track of customer payments
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Maintain a transparent ledger for every customer. Record partial payments, track credit history, and generate PDF statements instantly.
            </p>
            <ul className="space-y-4 text-slate-700">
              {['Detailed transaction ledgers', 'Record partial & full payments', 'Instant PDF statement exports'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl">
               <div className="rounded-xl border border-white/5 bg-slate-900 overflow-hidden shadow-inner flex flex-col">
                 {/* Top Customer Header */}
                 <div className="p-4 sm:p-6 border-b border-white/5 bg-slate-800/30 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">AS</div>
                     <div>
                       <h3 className="text-white font-bold text-lg">Amit Singh</h3>
                       <p className="text-xs text-slate-400">+91 98765 12345</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Outstanding</p>
                     <p className="text-xl font-bold text-rose-400">₹ 800</p>
                   </div>
                 </div>
                 {/* Action Bar */}
                 <div className="px-4 py-3 bg-slate-950/50 border-b border-white/5 flex gap-2">
                   <button className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 text-xs font-semibold px-3 py-1.5 rounded-lg">
                     Add Credit
                   </button>
                   <button className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg">
                     Record Payment
                   </button>
                   <div className="flex-1"></div>
                   <button className="flex items-center gap-1.5 bg-slate-800 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5">
                     <FileText size={14} /> PDF
                   </button>
                 </div>
                 {/* Ledger List */}
                 <div className="p-4 sm:p-6 space-y-3 bg-slate-900">
                   {[
                     { date: "Oct 1, 2026", desc: "Payment (Partial)", type: "payment", amt: "₹ 1,200", bal: "₹ 800" },
                     { date: "Sep 28, 2026", desc: "Groceries & Supplies", type: "credit", amt: "₹ 2,000", bal: "₹ 2,000" },
                     { date: "Sep 15, 2026", desc: "Payment (Full)", type: "payment", amt: "₹ 500", bal: "₹ 0" },
                     { date: "Sep 12, 2026", desc: "Milk & Bread", type: "credit", amt: "₹ 500", bal: "₹ 500" }
                   ].map((tx, i) => (
                     <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-950/30 border border-white/5">
                       <div>
                         <p className="text-sm font-medium text-slate-200">{tx.desc}</p>
                         <p className="text-[10px] text-slate-500">{tx.date}</p>
                       </div>
                       <div className="text-right">
                         <p className={`text-sm font-semibold ${tx.type === 'payment' ? 'text-emerald-400' : 'text-rose-400'}`}>
                           {tx.type === 'payment' ? '+' : '-'}{tx.amt}
                         </p>
                         <p className="text-[10px] text-slate-500">Bal: {tx.bal}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section 3: WhatsApp Reminders */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl mb-6">
              Turn overdue payments into reminders
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Stop feeling awkward about asking for money. Send polite, pre-filled WhatsApp reminders directly from the customer profile.
            </p>
            <ul className="space-y-4 text-slate-700">
              {['One-click WhatsApp integration', 'Pre-filled smart message templates', 'Professional communication format'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            
            {/* Split Mockup: Left LenDen UI, Right Phone */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl">
              
              {/* Reminder UI Panel */}
              <div className="flex-1 w-full rounded-xl border border-white/10 bg-slate-900 shadow-2xl p-5 relative z-10 hidden sm:block">
                <h4 className="text-white font-medium text-sm mb-4">Send Reminder</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase">Customer</label>
                    <div className="bg-slate-950 border border-white/5 rounded-lg p-2.5 text-sm text-white mt-1">Rahul Sharma</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase">Message Preview</label>
                    <div className="bg-slate-950 border border-white/5 rounded-lg p-3 text-xs text-slate-300 mt-1 leading-relaxed">
                      Hi Rahul, this is a reminder from LenDen Shop that your payment of ₹2,400 is due. Please make the payment by the due date. Thank you!
                    </div>
                  </div>
                  <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-900 font-bold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 transition">
                    Send via WhatsApp
                  </button>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="w-70 shrink-0 rounded-[2.5rem] border-8 border-slate-800 bg-[#E5DDD5] shadow-2xl overflow-hidden relative h-125">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-xl w-32 mx-auto z-20"></div>
                
                <div className="bg-[#075E54] text-white px-4 pt-10 pb-3 flex items-center gap-3 shadow-md z-10 relative">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">L</div>
                  <div>
                    <h4 className="text-sm font-semibold">LenDen Shop</h4>
                    <p className="text-[10px] text-white/70">Business Account</p>
                  </div>
                </div>
                
                <div className="p-4 bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r_QNTqHnN1P.png')] bg-cover h-full relative">
                  <div className="bg-emerald-50 p-3 rounded-lg rounded-tl-none mr-4 shadow-sm relative text-slate-800 mb-2">
                    <p className="text-[13px] leading-snug">
                      Hi Rahul, this is a reminder from <span className="font-bold">LenDen Shop</span> that your payment of <span className="font-bold text-rose-600">₹ 2,400</span> is due.
                    </p>
                    <span className="text-[9px] text-slate-500 block text-right mt-1">10:42 AM</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg rounded-tl-none mr-4 shadow-sm relative text-slate-800">
                    <p className="text-[13px] leading-snug">
                      Please make the payment by the due date. Thank you!
                    </p>
                    <span className="text-[9px] text-slate-500 block text-right mt-1">10:42 AM</span>
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
