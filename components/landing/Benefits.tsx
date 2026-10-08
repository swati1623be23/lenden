import { Check } from "lucide-react";

export function Benefits() {
  const benefits = [
    "Replace paper notebooks",
    "Track every transaction",
    "Know who owes you money",
    "Send payment reminders",
    "Generate statements",
    "Monitor business cash flow"
  ];

  return (
    <section id="benefits" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl">
            Why choose LenDen?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Ditch the old methods and upgrade your business with a system designed for simplicity and efficiency.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-x-3 rounded-xl bg-[#f6f8f5] p-6 border border-[#e1e8e2]">
                <Check className="h-6 w-6 flex-none text-emerald-800" aria-hidden="true" />
                <span className="text-base font-semibold leading-7 text-slate-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
