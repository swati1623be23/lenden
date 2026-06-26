import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">{description}</p>
        {children}
        <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
      </div>
    </div>
  );
}
