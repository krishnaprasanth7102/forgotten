
"use client";

import { GitFork, Upload, MessageSquareCode, Heart } from "lucide-react";

export function ContributionTerminal() {
  return (
    <section className="bg-black py-32 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
        
        <div className="lg:w-1/2">
           <div className="text-red-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
             <GitFork className="size-4" /> Open Source Protocol
           </div>
           <h2 className="text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">DEPLOY YOUR ENTITY</h2>
           <p className="text-xl text-muted-foreground leading-relaxed mb-12">
             FORGOTTEN thrives on lethal collaboration. Fork existing boss logic, enhance AI lethality, or submit entirely new predatory constructs to the global arsenal.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 border border-white/10 hover:border-red-600 transition-colors group">
                 <Upload className="size-8 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Submit Entity</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Push new boss packages to the staging environment for verification.</p>
              </div>
              <div className="p-6 border border-white/10 hover:border-red-600 transition-colors group">
                 <MessageSquareCode className="size-8 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Refine Logic</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Submit pull requests for improved AI behavior trees or combat patterns.</p>
              </div>
           </div>
        </div>

        <div className="lg:w-1/2 w-full">
           <div className="bg-red-600 p-12 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <GitFork className="size-64 text-white" />
              </div>
              <div className="relative z-10 text-white">
                 <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">ARSENAL_STATS</h3>
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end border-b border-white/20 pb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Active Bosses</span>
                       <span className="text-2xl font-black leading-none">1,204</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/20 pb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Global Forks</span>
                       <span className="text-2xl font-black leading-none">8,942</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/20 pb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Contributors</span>
                       <span className="text-2xl font-black leading-none">443</span>
                    </div>
                 </div>
                 <button className="w-full h-14 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors">
                    Access Repository
                 </button>
              </div>
           </div>
        </div>
        
      </div>
    </section>
  );
}
