"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "What is LenDen?",
      answer: "LenDen is a credit and payment management platform designed for small businesses, freelancers, and shop owners to track customer transactions digitally instead of using paper notebooks."
    },
    {
      question: "Who can use LenDen?",
      answer: "Anyone who sells goods or services on credit! It's perfect for retail shops, wholesale businesses, contractors, and freelancers."
    },
    {
      question: "Can I track customer credit?",
      answer: "Yes, you can easily add credit entries for any customer, categorize them, add due dates, and attach notes."
    },
    {
      question: "Can I record partial payments?",
      answer: "Absolutely. When a customer makes a payment, you can record the exact amount they paid, and LenDen will automatically recalculate their outstanding balance."
    },
    {
      question: "Can I send WhatsApp reminders?",
      answer: "Yes, LenDen allows you to generate pre-filled payment reminder messages and send them directly via WhatsApp with one click."
    },
    {
      question: "Does LenDen support Nepali?",
      answer: "Yes, we support both English and Nepali. You can switch between languages in your account settings."
    },
    {
      question: "Can I export reports?",
      answer: "Yes, you can export customer statements and general business reports in PDF or CSV formats."
    },
    {
      question: "Can I use LenDen on mobile?",
      answer: "Yes! LenDen is fully responsive and supports PWA (Progressive Web App) capabilities, so you can install it on your mobile device for quick access and offline support."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#f6f8f5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#18231f] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-[#dce5dd] bg-white overflow-hidden shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left text-[#18231f]"
                onClick={() => toggleOpen(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
