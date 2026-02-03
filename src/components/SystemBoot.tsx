
"use client";

import { useEffect, useState } from "react";

export function SystemBoot() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black px-6">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      <div className="z-10 text-center">
        <div className="mb-4 inline-block border border-red-600 px-3 py-1 text-[10px] tracking-widest text-red-600 animate-pulse-red uppercase font-bold">
          System Initializing
        </div>
        <h1 className="text-[12vw] font-black leading-none tracking-tighter text-white select-none">
          FORGOTTEN
        </h1>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-muted-foreground tracking-[0.3em] text-xs font-medium uppercase max-w-md mx-auto leading-relaxed">
            Advanced Boss System // Open Source Arsenal
          </p>
          <div className="mt-12 h-px w-24 bg-red-600" />
          <p className="mt-8 font-mono text-[10px] text-red-500/50 uppercase tracking-widest">
            Scanning for compatible entities{dots}
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-muted-foreground uppercase leading-loose hidden lg:block">
        [MODE: ACTIVE]<br />
        [UI_VERSION: 4.0.9]<br />
        [CONNECTION: ENCRYPTED]
      </div>
      
      <div className="absolute bottom-12 right-12 text-right">
        <div className="text-red-600 font-bold text-xs tracking-widest uppercase mb-2">Scroll to Access</div>
        <div className="h-16 w-px bg-gradient-to-b from-red-600 to-transparent mx-auto" />
      </div>
    </section>
  );
}
