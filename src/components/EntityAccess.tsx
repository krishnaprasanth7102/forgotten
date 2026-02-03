
"use client";

import { useState } from "react";
import { BOSSES, Boss } from "@/lib/boss-data";
import { ChevronRight, Download, Terminal, Cpu, ShieldAlert, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function EntityAccess() {
  const [selectedBoss, setSelectedBoss] = useState<Boss>(BOSSES[0]);
  const [isArming, setIsArming] = useState(false);

  const handleDownload = () => {
    setIsArming(true);
    setTimeout(() => setIsArming(false), 2000);
  };

  return (
    <section className="min-h-screen bg-black border-y border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left: Selector List */}
        <div className="lg:col-span-4 border-r border-white/10 flex flex-col">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-red-600 font-bold text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="size-3" /> Entity Database
            </h2>
            <div className="text-2xl font-bold tracking-tighter">SELECT ARSENAL</div>
          </div>
          
          <div className="flex-1">
            {BOSSES.map((boss) => (
              <button
                key={boss.id}
                onClick={() => setSelectedBoss(boss)}
                className={cn(
                  "w-full p-8 text-left transition-all relative group border-b border-white/10",
                  selectedBoss.id === boss.id ? "bg-white text-black" : "hover:bg-red-600/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={cn(
                      "text-[10px] font-bold tracking-widest uppercase mb-1",
                      selectedBoss.id === boss.id ? "text-black/50" : "text-red-600"
                    )}>
                      ID: {boss.id}
                    </div>
                    <div className="text-3xl font-black tracking-tighter uppercase">{boss.name}</div>
                  </div>
                  <ChevronRight className={cn(
                    "size-6 transition-transform",
                    selectedBoss.id === boss.id ? "rotate-0 text-black" : "-rotate-45 text-red-600 group-hover:rotate-0"
                  )} />
                </div>
                {selectedBoss.id === boss.id && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-red-600" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 bg-white/5 font-mono text-[10px] text-muted-foreground uppercase leading-relaxed">
            Total Entities: {BOSSES.length}<br />
            Last Update: 2024.12.01<br />
            Stability: Variable
          </div>
        </div>

        {/* Right: Entity Detail */}
        <div className="lg:col-span-8 relative flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          
          {/* Large Image Preview */}
          <div className="h-[50vh] relative overflow-hidden border-b border-white/10">
            <img 
              src={selectedBoss.image} 
              alt={selectedBoss.name}
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 brightness-50"
            />
            <div className="absolute top-8 right-8 z-20 flex flex-col gap-4">
               {selectedBoss.stats.engine.map(eng => (
                 <div key={eng} className="bg-black/80 border border-white/20 px-3 py-1 text-[10px] font-bold tracking-widest text-white">
                    {eng}
                 </div>
               ))}
            </div>
            <div className="absolute bottom-8 left-8 z-20">
              <div className="text-red-600 text-xs font-bold tracking-widest mb-1 uppercase">CODENAME</div>
              <div className="text-5xl font-black tracking-tighter text-white">{selectedBoss.codename}</div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-12 flex-1">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-red-600 text-[10px] font-bold tracking-widest mb-4 uppercase flex items-center gap-2">
                    <ShieldAlert className="size-3" /> Tactical Analysis
                  </h3>
                  <p className="text-xl font-medium leading-relaxed text-white/90">
                    {selectedBoss.description}
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase mb-1">Threat Level</div>
                      <div className="text-white font-bold">{selectedBoss.stats.threatLevel}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase mb-1">Complexity</div>
                      <div className="text-white font-bold">{selectedBoss.stats.complexity}</div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-red-600 text-[10px] font-bold tracking-widest mb-4 uppercase flex items-center gap-2">
                    <Cpu className="size-3" /> Package Contents
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(selectedBoss.packages).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{key}</span>
                        <span className="text-xs font-mono text-white">{val}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleDownload}
                    disabled={isArming}
                    className={cn(
                      "w-full h-16 relative flex items-center justify-center gap-4 transition-all overflow-hidden group",
                      isArming ? "bg-red-600 cursor-not-allowed" : "bg-red-600 hover:bg-white hover:text-black"
                    )}
                  >
                    {isArming ? (
                      <>
                        <div className="absolute inset-0 animate-pulse bg-red-500 opacity-20" />
                        <span className="z-10 font-bold tracking-widest uppercase">Arming System...</span>
                      </>
                    ) : (
                      <>
                        <Download className="size-5" />
                        <span className="font-bold tracking-widest uppercase">Initialize Download</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-muted-foreground uppercase text-center tracking-[0.2em]">
                    Warning: Encrypted binary data may cause instability.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
