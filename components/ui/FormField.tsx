import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-sm text-rose-400">{error}</p> : null}
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 ${className}`}
    />
  );
}

type SubmitButtonProps = {
  isLoading: boolean;
  loadingLabel: string;
  label: string;
};

export function SubmitButton({ isLoading, loadingLabel, label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
}
