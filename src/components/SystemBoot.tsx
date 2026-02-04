"use client";

import { useEffect, useState } from "react";
import { Shield, Zap, Activity, ChevronDown } from "lucide-react";

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
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-6">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[60vw] max-w-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 text-center w-full max-w-7xl flex flex-col items-center">
        <div className="mb-8 md:mb-12 flex items-center justify-center gap-4">
          <div className="h-px w-8 md:w-16 bg-red-600/40" />
          <div className="border border-red-600 px-4 md:px-6 py-2 text-[8px] md:text-[10px] tracking-[0.5em] text-red-600 animate-pulse uppercase font-black bg-red-600/5 backdrop-blur-sm">
            INITIALIZING_SECTOR_{progress}%
          </div>
          <div className="h-px w-8 md:w-16 bg-red-600/40" />
        </div>

        <h1 className="text-[18vw] sm:text-[15vw] lg:text-[12vw] font-black leading-[0.75] tracking-tighter text-white select-none uppercase mb-8 md:mb-12 relative">
          FORGOTTEN
          <span className="absolute -top-4 -right-10 text-[10px] font-mono text-red-600 tracking-normal hidden lg:block">
            VER_4.0_STABLE
          </span>
        </h1>

        <div className="flex flex-col items-center gap-8 md:gap-16 w-full max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-20">
            <div className="flex items-center gap-3">
              <Shield className="size-3 md:size-4 text-red-600" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Hardened_Core</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="size-3 md:size-4 text-red-600" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Native_Perf</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="size-3 md:size-4 text-red-600" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Evolution</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 relative overflow-hidden">
             <div 
               className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-300"
               style={{ width: `${progress}%` }}
             />
          </div>

          <p className="font-mono text-[8px] md:text-[10px] text-red-600 uppercase tracking-[0.5em] animate-pulse text-center">
            Scanning compatible segments{dots}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 font-mono text-[8px] md:text-[10px] text-muted-foreground/30 uppercase leading-relaxed text-left">
        [MODE: ACTIVE]<br />
        [VER: 4.0.12]
      </div>
      
      <a href="#entities" className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-red-600 opacity-50 group-hover:opacity-100 transition-opacity">EXPLORE_ARSENAL</span>
        <ChevronDown className="size-5 md:size-6 text-red-600 animate-bounce" />
      </a>
    </section>
  );
}