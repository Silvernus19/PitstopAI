import Link from "next/link";
import Image from "next/image";

function HeroIllustration() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_60s_linear_infinite]">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="70" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
        <circle cx="100" cy="100" r="50" stroke="url(#grad1)" strokeWidth="0.5" fill="none" className="animate-[pulse_4s_ease-in-out_infinite]" />
        <path d="M100 20 L100 0" stroke="#2563EB" strokeWidth="1" />
        <path d="M100 180 L100 200" stroke="#2563EB" strokeWidth="1" />
        <path d="M20 100 L0 100" stroke="#2563EB" strokeWidth="1" />
        <path d="M180 100 L200 100" stroke="#2563EB" strokeWidth="1" />
      </svg>
      {/* Abstract Car Silhouette */}
      <svg viewBox="0 0 400 200" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] opacity-40">
        <path d="M50 140 L80 90 L280 90 L330 140 Z" fill="none" stroke="#2563EB" strokeWidth="2" />
        <path d="M90 90 L120 40 L240 40 L270 90" fill="none" stroke="#2563EB" strokeWidth="2" />
        <circle cx="90" cy="140" r="25" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        <circle cx="290" cy="140" r="25" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="group p-8 rounded-2xl bg-pit-card/60 backdrop-blur-sm border border-white/5 hover:border-pit-blue/50 transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-black/50">
      <div className="w-12 h-12 mb-6 text-pit-blue group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-pit-subtext leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, text }: { number: string, title: string, text: string }) {
  return (
    <div className="flex flex-col items-start p-6">
      <div className="text-4xl font-bold text-pit-blue/20 mb-4">{number}</div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-pit-subtext">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-pit-black selection:bg-pit-blue selection:text-white overflow-hidden">
      {/* Navbar Placeholder - Minimal */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tighter text-white">PitStopAI</div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-pit-subtext">
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors">Mechanics</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/signin" className="text-sm font-medium text-pit-subtext hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/auth/signup" className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-all text-sm font-bold">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f"
            alt="Sleek premium car on open road"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-black/60 md:bg-black/50 bg-gradient-to-b from-black/80 via-black/40 to-pit-black" />
        </div>

        <HeroIllustration />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pit-blue to-white">
              Drive Smarter?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Diagnose issues. Get real KES prices. Avoid fakes. <br className="hidden md:block" />
            The smartest way to maintain your car in Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/auth/signup" className="px-8 py-4 bg-pit-blue hover:bg-pit-blue-hover text-white rounded-full text-lg font-semibold transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] hover:scale-105">
              Get Started for Free
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full text-lg font-medium transition-all">
              View Demo
            </button>
          </div>

          <div className="text-sm text-gray-300 pt-8 flex items-center justify-center gap-2 opacity-80">
            <svg className="w-4 h-4 text-pit-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            Trusted by 2,000+ Kenyan Drivers
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-32 px-4 bg-pit-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Built for Nairobi Roads.</h2>
                <p className="text-pit-subtext text-xl">Don't get ripped off at Grogan or Industrial Area again. We give you the data you need to negotiate with confidence.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FeatureCard
                  title="Instant Diagnosis"
                  description="Describe the sound. Our AI identifies common issues for Premio, Demio, or Prado."
                  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                />
                <FeatureCard
                  title="Real KES Prices"
                  description="Get market prices for parts in Nairobi. Know exactly what a shock absorber costs."
                  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <FeatureCard
                  title="Fake Part Alerts"
                  description="We warn you about common counterfeits and tell you how to spot a fake KYB shock."
                  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                />
                <FeatureCard
                  title="Legit Mechanics"
                  description="Access verified garages and mechanics with real user reviews and ratings."
                  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
                alt="Car dashboard interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pit-dark via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-32 px-4 border-t border-white/5 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="Premium car on road"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-pit-black/80" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Fixing your car shouldn't be a mystery.</h2>
            <div className="space-y-8">
              <StepCard
                number="01"
                title="Ask PitStopAI"
                text="Just type 'My Premio is making a clicking noise when I turn' or 'Price of air cleaner for Mazda Demio'."
              />
              <StepCard
                number="02"
                title="Get Instant Intel"
                text="Receive immediate diagnosis, estimated part costs in KES, and warning signs to look out for."
              />
              <StepCard
                number="03"
                title="Decide Confidently"
                text="Go to the mechanic knowing exactly what needs to be done and what it should cost. No more guessing."
              />
            </div>
            <div className="mt-12 px-6">
              <button className="text-pit-blue font-semibold hover:text-white transition-colors flex items-center gap-2 group">
                See how it works <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
          <div className="relative h-[600px] bg-pit-card/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 flex flex-col justify-center shadow-2xl overflow-hidden">
            {/* Glossy overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pit-blue/10 rounded-full blur-[100px]" />

            {/* Mock Chat Interface */}
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">You</div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-sm text-sm border border-white/5">
                  My car is overheating in traffic. Toyota Vitz 2015.
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse animate-pulse">
                <div className="w-10 h-10 rounded-full bg-pit-blue flex items-center justify-center text-xs text-white">AI</div>
                <div className="bg-pit-blue/20 border border-pit-blue/30 p-4 rounded-2xl rounded-tr-none max-w-sm text-sm">
                  <p className="mb-2 font-bold text-pit-blue">Potential Issue: Cooling Fan Failure</p>
                  <p className="mb-2 text-gray-200">This is common in the 2015 Vitz. Check if the fan spins when AC is on.</p>
                  <div className="mt-3 text-xs bg-black/40 p-3 rounded-lg border border-pit-blue/20">
                    <span className="text-pit-subtext uppercase tracking-wider text-[10px]">Estimated Repair</span> <br />
                    <span className="text-white font-mono text-base">KES 4,500 - 6,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust / Stats */}
      <section className="py-24 border-y border-white/5 bg-pit-card/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-pit-subtext uppercase mb-12">Powered by Advanced AI Technology</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {/* Text Logos for "Logos" */}
            <span className="text-2xl font-black font-mono tracking-tighter text-white">Groq</span>
            <span className="text-2xl font-black font-mono tracking-tighter text-white">Llama 3</span>
            <span className="text-2xl font-black font-mono tracking-tighter text-white">Next.js</span>
            <span className="text-2xl font-black font-mono tracking-tighter text-white">Vercel</span>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-40 px-4 text-center relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pit-blue/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Join the smart garage.</h2>
          <p className="text-xl text-pit-subtext font-light">Join thousands of Kenyan car owners saving money and avoiding headaches every day.</p>
          <Link href="/auth/signup" className="inline-block px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-xl">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-16 px-4 border-t border-white/5 bg-black text-sm text-pit-subtext">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-black text-white text-2xl tracking-tighter">PitStopAI</div>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
          <div className="font-medium">
            &copy; 2026 PitStopAI Kenya. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
