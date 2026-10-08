import { CheckCircle2 } from "lucide-react";

export function SocialProof() {
  const points = [
    "Simple credit tracking",
    "Payment management",
    "WhatsApp reminders",
    "Reports & analytics"
  ];

  return (
    <section className="border-y border-[#e1e8e2] bg-white/70 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 mb-8">
          Everything you need to manage business credit
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-700" />
              <span className="text-sm font-medium text-slate-700">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
