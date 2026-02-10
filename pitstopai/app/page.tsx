import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

/**
 * Root Page Implementation for PitStopAI
 * Resolves Vercel 404 error and handles authenticated redirect to dashboard.
 */
export default async function Home() {
  // 1. Check Supabase session on server
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Conditional redirect if authenticated
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-pit-black flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* 
        Subtle hero illustration placeholder 
        TODO: Replace with high-quality SVG/Illustration of a premium car silhouette 
      */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pit-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            PitStopAI
          </h1>
          <p className="text-xl md:text-2xl text-pit-subtext max-w-2xl mx-auto font-light leading-relaxed">
            Your Honest AI Mechanic for Kenyan Roads
          </p>
        </div>

        <div className="pt-8">
          <Button asChild size="lg" className="bg-pit-accent hover:opacity-90 text-white rounded-full px-10 py-7 text-xl font-bold transition-all hover:scale-105 shadow-[0_0_40px_-20px_rgba(82,0,255,0.8)]">
            <Link href="/auth/signup">
              Get Started for Free
            </Link>
          </Button>
        </div>

        <div className="pt-12 text-pit-subtext/30 text-sm font-medium tracking-widest uppercase">
          <p>© 2026 PitStopAI Kenya</p>
        </div>
      </div>
    </main>
  );
}
