"use client";

import { useState } from "react";
import { BOSSES, Boss } from "@/lib/boss-data";
import { ChevronRight, Download, Terminal, Cpu, ShieldAlert, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function EntityAccess() {
  const [selectedBoss, setSelectedBoss] = useState<Boss>(BOSSES[0]);
  const [isArming, setIsArming] = useState(false);

  const handleDownload = () => {
    setIsArming(true);
    setTimeout(() => setIsArming(false), 2000);
  };

  return (
    <section className="min-h-screen bg-black border-y border-white/10 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-24 -left-12 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
        Database
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen relative z-10">
        
        {/* Left: Selector List - Becomes a scrollable row on mobile */}
        <div className="lg:col-span-4 border-r border-white/10 flex flex-col bg-black/50 backdrop-blur-sm">
          <div className="p-6 md:p-8 border-b border-white/10 bg-black/80">
            <h2 className="text-red-600 font-bold text-[10px] tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="size-3" /> Entity Database
            </h2>
            <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase">SELECT_ENTITY</div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[40vh] lg:max-h-none scrollbar-hide">
            {BOSSES.map((boss) => (
              <button
                key={boss.id}
                onClick={() => setSelectedBoss(boss)}
                className={cn(
                  "w-full p-6 md:p-8 text-left transition-all relative group border-b border-white/10",
                  selectedBoss.id === boss.id ? "bg-white text-black" : "hover:bg-red-600/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className={cn(
                      "text-[9px] font-bold tracking-[0.2em] uppercase mb-1 truncate",
                      selectedBoss.id === boss.id ? "text-black/50" : "text-red-600"
                    )}>
                      ID: {boss.id} // SEC_LVL_{boss.stats.threatLevel}
                    </div>
                    <div className="text-2xl md:text-4xl font-black tracking-tighter uppercase truncate">{boss.name}</div>
                  </div>
                  <ChevronRight className={cn(
                    "size-6 transition-transform hidden sm:block",
                    selectedBoss.id === boss.id ? "rotate-0 text-black" : "-rotate-45 text-red-600 group-hover:rotate-0"
                  )} />
                </div>
                {selectedBoss.id === boss.id && (
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-red-600" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 bg-white/5 font-mono text-[9px] text-muted-foreground uppercase leading-relaxed border-t border-white/10 hidden md:block">
            <div className="flex justify-between mb-1">
              <span>Total Entities:</span>
              <span className="text-white">{BOSSES.length}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>System Integrity:</span>
              <span className="text-green-500">OPTIMAL</span>
            </div>
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span className="text-white">2024.12.01</span>
            </div>
          </div>
        </div>

        {/* Right: Entity Detail */}
        <div className="lg:col-span-8 relative flex flex-col bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          
          {/* Large Image Preview */}
          <div className="h-[40vh] md:h-[50vh] relative overflow-hidden border-b border-white/10">
            <img 
              src={selectedBoss.image} 
              alt={selectedBoss.name}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-[0.4] scale-105"
            />
            
            {/* Engine Badges */}
            <div className="absolute top-6 right-6 z-20 flex flex-wrap justify-end gap-2 max-w-[200px]">
               {selectedBoss.stats.engine.map(eng => (
                 <div key={eng} className="bg-black/90 border border-red-600/30 px-3 py-1.5 text-[8px] font-black tracking-[0.2em] text-white backdrop-blur-md uppercase">
                    {eng}
                 </div>
               ))}
            </div>

            {/* Codename Overlay */}
            <div className="absolute bottom-12 left-6 md:left-12 z-20">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-red-600" />
                <div className="text-red-600 text-[10px] font-bold tracking-[0.4em] uppercase">CODENAME</div>
              </div>
              <div className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase">{selectedBoss.codename}</div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 md:p-12 lg:p-16 flex-1 bg-black">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
               <div>
                  <h3 className="text-red-600 text-[10px] font-bold tracking-[0.3em] mb-6 uppercase flex items-center gap-2">
                    <ShieldAlert className="size-3" /> Tactical_Analysis
                  </h3>
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-white/80 font-body">
                    {selectedBoss.description}
                  </p>
                  
                  <div className="mt-12 grid grid-cols-2 gap-8">
                    <div className="p-4 border border-white/5 bg-white/[0.02]">
                      <div className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase mb-1">Threat Level</div>
                      <div className="text-xl font-black text-red-600">{selectedBoss.stats.threatLevel}</div>
                    </div>
                    <div className="p-4 border border-white/5 bg-white/[0.02]">
                      <div className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase mb-1">Complexity</div>
                      <div className="text-xl font-black text-white">{selectedBoss.stats.complexity}</div>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div>
                    <h3 className="text-red-600 text-[10px] font-bold tracking-[0.3em] mb-6 uppercase flex items-center gap-2">
                      <Cpu className="size-3" /> Deployment_Package
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(selectedBoss.packages).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between border-b border-white/5 pb-3 group">
                          <div className="flex items-center gap-3">
                            <div className="size-1 bg-red-600 group-hover:size-2 transition-all" />
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold group-hover:text-white transition-colors">{key}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/60 group-hover:text-red-600 transition-colors">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={handleDownload}
                      disabled={isArming}
                      className={cn(
                        "w-full h-16 md:h-20 relative flex items-center justify-center gap-4 transition-all overflow-hidden border-2",
                        isArming 
                          ? "bg-red-600 border-red-600 cursor-not-allowed" 
                          : "bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600"
                      )}
                    >
                      {isArming ? (
                        <>
                          <div className="absolute inset-0 animate-pulse bg-red-500 opacity-20" />
                          <span className="z-10 font-black tracking-[0.3em] uppercase text-sm">Arming_Arsenal...</span>
                        </>
                      ) : (
                        <>
                          <Download className="size-5" />
                          <span className="font-black tracking-[0.3em] uppercase text-sm">Initialize_Uplink</span>
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-[9px] text-muted-foreground/60 uppercase text-center tracking-[0.3em] font-mono italic">
                      Warning: Unauthorized distribution triggers blackbox failsafe.
                    </p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
