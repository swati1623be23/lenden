import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import SettingsForm from "@/components/settings/SettingsForm";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Settings</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Profile & settings</h1>
            <p className="mt-3 text-slate-400">View and update your account profile, photos, and shop settings.</p>
          </div>

          <SettingsForm user={user} />
        </section>
      </div>
    </div>
  );
}
