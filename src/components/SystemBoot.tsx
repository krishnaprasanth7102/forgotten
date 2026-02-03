
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
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-4 md:px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] md:size-[600px] bg-red-600/5 blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />
      
      <div className="z-10 text-center w-full max-w-5xl">
        <div className="mb-6 md:mb-8 flex items-center justify-center gap-2 md:gap-4">
          <div className="h-px w-8 md:w-12 bg-red-600/30 hidden sm:block" />
          <div className="border border-red-600 px-3 md:px-4 py-1.5 md:py-2 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-red-600 animate-pulse-red uppercase font-black bg-red-600/5 backdrop-blur-sm">
            INITIALIZING_SECTOR_{progress}%
          </div>
          <div className="h-px w-8 md:w-12 bg-red-600/30 hidden sm:block" />
        </div>

        <h1 className="text-[18vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter text-white select-none uppercase mb-8 md:mb-12 relative inline-block">
          FORGOTTEN
          <span className="absolute -top-4 -right-2 md:-right-4 text-[7px] md:text-[10px] font-mono text-red-600 tracking-normal hidden sm:block">
            STABLE_4.0
          </span>
        </h1>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          <div className="flex flex-wrap justify-center gap-4 md:gap-16">
            <div className="flex items-center gap-2 md:gap-3">
              <Shield className="size-3 md:size-4 text-red-600" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hardened_Core</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Zap className="size-3 md:size-4 text-red-600" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Native_Perf</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Activity className="size-3 md:size-4 text-red-600" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Evolution</span>
            </div>
          </div>

          <div className="w-full max-w-[240px] md:max-w-xs h-0.5 md:h-1 bg-white/10 relative overflow-hidden">
             <div 
               className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-300"
               style={{ width: `${progress}%` }}
             />
          </div>

          <p className="font-mono text-[8px] md:text-[9px] text-red-600/40 uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-sm mx-auto animate-pulse">
            Scanning compatible segments{dots}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 font-mono text-[7px] md:text-[10px] text-muted-foreground/30 uppercase leading-loose text-left">
        [MODE: ACTIVE]<br />
        [VER: 4.0.12]<br />
        [CONN: T-01]
      </div>
      
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-right hidden sm:block">
        <div className="text-red-600 font-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-4 opacity-50">ARM_SYSTEM</div>
        <div className="h-16 md:h-24 w-px bg-gradient-to-b from-red-600 to-transparent mx-auto" />
      </div>
    </section>
  );
}
