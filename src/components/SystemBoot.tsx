
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
    }, 25);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] sm:size-[500px] lg:size-[700px] bg-red-600/5 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none" />
      
      <div className="z-10 text-center w-full max-w-5xl">
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-3 sm:gap-4">
          <div className="h-px w-6 sm:w-12 bg-red-600/30 shrink-0" />
          <div className="border border-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] text-red-600 animate-pulse-red uppercase font-black bg-red-600/5 backdrop-blur-sm shrink-0">
            INITIALIZING_SECTOR_{progress}%
          </div>
          <div className="h-px w-6 sm:w-12 bg-red-600/30 shrink-0" />
        </div>

        <h1 className="text-[18vw] sm:text-[14vw] lg:text-[12vw] font-black leading-[0.8] tracking-tighter text-white select-none uppercase mb-10 sm:mb-12 relative inline-block">
          FORGOTTEN
          <span className="absolute -top-3 -right-2 sm:-right-6 text-[7px] sm:text-[10px] font-mono text-red-600 tracking-normal hidden sm:block">
            STABLE_4.0
          </span>
        </h1>

        <div className="flex flex-col items-center gap-10 sm:gap-12 lg:gap-16">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 lg:gap-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="size-3 sm:size-4 text-red-600" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Hardened_Core</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Zap className="size-3 sm:size-4 text-red-600" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Native_Perf</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Activity className="size-3 sm:size-4 text-red-600" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Evolution</span>
            </div>
          </div>

          <div className="w-full max-w-[200px] sm:max-w-xs h-0.5 sm:h-1 bg-white/10 relative overflow-hidden">
             <div 
               className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-300"
               style={{ width: `${progress}%` }}
             />
          </div>

          <p className="font-mono text-[8px] sm:text-[9px] text-red-600/40 uppercase tracking-[0.3em] sm:tracking-[0.4em] max-w-sm mx-auto animate-pulse">
            Scanning compatible segments{dots}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 font-mono text-[7px] sm:text-[9px] text-muted-foreground/30 uppercase leading-relaxed text-left">
        [MODE: ACTIVE]<br />
        [VER: 4.0.12]<br />
        [CONN: T-01]
      </div>
      
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-right hidden sm:block">
        <div className="text-red-600 font-black text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4 opacity-50">ARM_SYSTEM</div>
        <div className="h-16 sm:h-24 w-px bg-gradient-to-b from-red-600 to-transparent mx-auto" />
      </div>
    </section>
  );
}
