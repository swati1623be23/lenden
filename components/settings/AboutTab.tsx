"use client";

export default function AboutTab() {
  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Application</p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200">App Name</label>
            <p className="mt-2 text-lg text-white">LenDen</p>
            <p className="mt-1 text-sm text-slate-400">Credit & Payment Management System</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">Version</label>
            <p className="mt-2 text-lg text-emerald-400">v0.1.0</p>
            <p className="mt-1 text-sm text-slate-400">Latest version installed</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <label className="block text-sm font-medium text-slate-200 mb-4">Features</label>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">Customer & Credit Management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">Payment Tracking & Reminders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">PDF Statements & Reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">WhatsApp Integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">Data Export & Analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Developer Contact</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/50 p-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-400/20 flex-shrink-0">
              <span className="text-xs text-emerald-400">✉</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400">Email</p>
              <a
                href="mailto:support@lenden.dev"
                className="text-white hover:text-emerald-400 transition font-medium"
              >
                support@lenden.dev
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-900/50 p-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-400/20 flex-shrink-0">
              <span className="text-xs text-emerald-400">↗</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400">Documentation</p>
              <a
                href="https://docs.lenden.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition font-medium"
              >
                docs.lenden.dev
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">About This Software</p>

        <div className="mt-6">
          <p className="text-sm leading-6 text-slate-300">
            LenDen is a comprehensive credit and payment management system designed to help businesses track customer credits, manage payments, and maintain accurate records. Built with modern web technologies, it provides a secure, scalable platform for credit management with integrated WhatsApp notifications and detailed reporting capabilities.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            © 2026 LenDen. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
