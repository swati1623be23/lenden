export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add your customers",
      description: "Create profiles for the people or businesses you deal with regularly."
    },
    {
      number: "02",
      title: "Record credits and payments",
      description: "Log every transaction, whether it's new credit given or a payment received."
    },
    {
      number: "03",
      title: "Track balances and collect faster",
      description: "Monitor outstanding amounts and send WhatsApp reminders to get paid on time."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#f6f8f5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Three simple steps to digitize your credit notebook.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 z-0"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#dce5dd] bg-white shadow-sm mb-6">
                <span className="text-2xl font-bold text-emerald-800">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-[#18231f] mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
