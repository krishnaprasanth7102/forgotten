import { Navbar } from "@/components/Navbar";
import { SystemBoot } from "@/components/SystemBoot";
import { EntityAccess } from "@/components/EntityAccess";
import { IntegrationMode } from "@/components/IntegrationMode";
import { ContributionTerminal } from "@/components/ContributionTerminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      
      {/* 1. SYSTEM BOOT */}
      <SystemBoot />

      {/* 2. ENTITY ACCESS */}
      <div id="entities">
        <EntityAccess />
      </div>

      {/* 3. INTEGRATION MODE */}
      <div id="integration">
        <IntegrationMode />
      </div>

      {/* 4. CONTRIBUTION SYSTEM */}
      <div id="protocol">
        <ContributionTerminal />
      </div>

      <div id="contribute" className="bg-white/5 py-12 text-center border-y border-white/10">
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">End of Active Transmission Segment</p>
      </div>

      {/* SHUTDOWN / FOOTER */}
      <footer className="py-24 px-6 border-t border-white/10 flex flex-col items-center">
         <div className="text-[10px] font-bold text-red-600 tracking-[0.5em] mb-8 uppercase animate-pulse-red">System Operational</div>
         <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase mb-12 opacity-10 select-none">FORGOTTEN</div>
         <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-red-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-red-600 transition-colors">Changelog</a>
            <a href="#" className="hover:text-red-600 transition-colors">API Reference</a>
            <a href="#" className="hover:text-red-600 transition-colors">Status</a>
         </div>
         <div className="mt-24 font-mono text-[8px] text-muted-foreground/30 uppercase tracking-[0.3em]">
            Disconnected. End of Transmission.
         </div>
      </footer>
    </main>
  );
}
