import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { SocialProof } from "../components/landing/SocialProof";
import { Features } from "../components/landing/Features";
import { ProductShowcase } from "../components/landing/ProductShowcase";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Benefits } from "../components/landing/Benefits";
import { BilingualSupport } from "../components/landing/BilingualSupport";
import { CTA } from "../components/landing/CTA";
import { FAQ } from "../components/landing/FAQ";
import { Footer } from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8f5] text-[#18231f] font-sans selection:bg-emerald-500/20 selection:text-emerald-950">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <ProductShowcase />
        <HowItWorks />
        <Benefits />
        <BilingualSupport />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
