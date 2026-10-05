import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-slate-950">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LenDen</span>
            </Link>
            <p className="text-sm leading-6 text-slate-400 max-w-xs">
              Credit & Payment Management for Every Business. Track balances, send reminders, and get paid faster.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="#features" className="text-sm leading-6 text-slate-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className="text-sm leading-6 text-slate-400 hover:text-white">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="text-sm leading-6 text-slate-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Account</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/login" className="text-sm leading-6 text-slate-400 hover:text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-sm leading-6 text-slate-400 hover:text-white">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="#" className="text-sm leading-6 text-slate-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm leading-6 text-slate-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-slate-400 text-center">
            &copy; 2026 LenDen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
