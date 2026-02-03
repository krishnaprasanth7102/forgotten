"use client";

import { useEffect, useState } from "react";
import { Terminal, Shield, Zap, Activity } from "lucide-react";

export function SystemBoot() {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const progInterval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 1 : 100));
    }, 30);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="z-10 text-center w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-red-600/30 hidden sm:block" />
          <div className="border border-red-600 px-4 py-2 text-[10px] tracking-[0.5em] text-red-600 animate-pulse-red uppercase font-black bg-red-600/5 backdrop-blur-sm">
            SYSTEM_INITIALIZING_{progress}%
          </div>
          <div className="h-px w-12 bg-red-600/30 hidden sm:block" />
        </div>

        <h1 className="text-[16vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter text-white select-none uppercase mb-12 relative">
          FORGOTTEN
          <span className="absolute -top-4 -right-4 text-[10px] font-mono text-red-600 tracking-normal hidden md:block">
            VER: 4.0.12_STABLE
          </span>
        </h1>

        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield className="size-4 text-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hardened_Core</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="size-4 text-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Native_Performance</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="size-4 text-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live_Evolution</span>
            </div>
          </div>

          <div className="w-full max-w-xs h-1 bg-white/10 relative overflow-hidden">
             <div 
               className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-300"
               style={{ width: `${progress}%` }}
             />
          </div>

          <p className="font-mono text-[9px] text-red-600/40 uppercase tracking-[0.4em] max-w-sm mx-auto animate-pulse">
            Scanning for compatible entities in sector_0{dots}
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 font-mono text-[8px] md:text-[10px] text-muted-foreground/40 uppercase leading-loose text-left">
        [MODE: ACTIVE_COMBAT]<br />
        [UI_VERSION: 4.0.12_NIGHTLY]<br />
        [ENCRYPTION: AES_256_RSA]<br />
        [CONNECTION: TERMINAL_01]
      </div>
      
      <div className="absolute bottom-12 right-6 md:right-12 text-right hidden sm:block">
        <div className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50">Scroll_To_Access</div>
        <div className="h-24 w-px bg-gradient-to-b from-red-600 to-transparent mx-auto" />
      </div>
    </section>
  );
}
