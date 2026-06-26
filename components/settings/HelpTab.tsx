"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "How do I add a new customer?",
    answer:
      "Navigate to the Customers section and click the 'Add Customer' button. Fill in the customer name, phone number (optional), and address. Click Save to add the customer. You can then record credits and payments for this customer.",
  },
  {
    id: "2",
    question: "How do I record a payment from a customer?",
    answer:
      "Go to the Payments section and click 'Add Payment'. Select the customer from the dropdown, enter the payment amount, select the date, and click Save. The payment will be recorded immediately and the outstanding balance will be updated automatically.",
  },
  {
    id: "3",
    question: "How do I export reports to Excel?",
    answer:
      "In the Reports section, select your desired date filter (Last 7 Days, Last 30 Days, etc.). Click the Export button and choose your preferred format - XLSX for Excel or CSV for spreadsheet programs. The file will download automatically.",
  },
  {
    id: "4",
    question: "How do I send WhatsApp reminders to customers?",
    answer:
      "Select a customer from the Customers list and click the WhatsApp icon in their details. Customize the reminder message and click Send. WhatsApp must be configured in your settings first, and the customer must have a valid phone number on file.",
  },
  {
    id: "5",
    question: "How do I view outstanding balances for all customers?",
    answer:
      "Go to the Balances section to see a complete list of all customers with their total credits, payments, and outstanding balances. You can sort by different columns and filter by customer name using the search feature.",
  },
  {
    id: "6",
    question: "How do I generate and download a customer statement?",
    answer:
      "In the Customers section, click on a customer name to view their details. Scroll down and click 'Download Statement' to generate a PDF statement showing all credits, payments, and outstanding balance. The statement includes your shop information.",
  },
  {
    id: "7",
    question: "Can I edit or delete a customer record?",
    answer:
      "Yes. In the Customers section, click on the customer name to edit their details. To delete credits or payments, go to the Credits or Payments sections, find the entry, and click Delete. Note that deleting records will immediately affect balances.",
  },
  {
    id: "8",
    question: "How do I update my shop settings and profile?",
    answer:
      "Go to Settings and click the 'Shop Settings' tab to add your shop name, phone, address, and logo. Use the 'Profile Photo' tab to upload your profile picture. Use the 'Profile & Account' tab to update your personal information and password.",
  },
  {
    id: "9",
    question: "How do I see a summary of my business metrics?",
    answer:
      "The Dashboard shows quick overview statistics including total customers, total credit amount, total payments, and outstanding balance. The Reports section provides detailed charts showing monthly trends and customer-wise summaries.",
  },
  {
    id: "10",
    question: "What if I forget my password?",
    answer:
      "Currently, there is no automatic password reset. Please contact support at support@lenden.dev to reset your password. Make sure to provide your registered email address.",
  },
];

export default function HelpTab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Frequently Asked Questions</p>

        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-white/5 rounded-2xl overflow-hidden transition">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition text-left"
              >
                <span className="text-sm font-medium text-slate-200">{faq.question}</span>
                <span
                  className={`text-emerald-400 transition-transform flex-shrink-0 ${
                    expandedId === faq.id ? "transform rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {expandedId === faq.id && (
                <div className="border-t border-white/5 bg-slate-950/50 p-4">
                  <p className="text-sm leading-6 text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Still Need Help?</p>

        <div className="mt-6">
          <p className="text-sm text-slate-300 mb-4">
            If you couldn't find the answer you're looking for, feel free to reach out to our support team.
          </p>
          <a
            href="mailto:support@lenden.dev"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
