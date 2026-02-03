"use client";

import { GitFork, Upload, MessageSquareCode, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export function ContributionTerminal() {
  return (
    <section className="bg-black py-24 md:py-40 px-6 lg:px-24 relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
        
        <div className="lg:w-1/2">
           <div className="text-red-600 font-bold text-xs tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
             <GitFork className="size-4" /> Open_Source_Protocol
           </div>
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 leading-[0.9]">DEPLOY_YOUR_ENTITY</h2>
           <p className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-xl">
             FORGOTTEN thrives on predatory collaboration. Fork existing logic, optimize lethal behavior, or submit entirely new constructs to the global arsenal.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm">
                 <Upload className="size-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-3">Push_Entity</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Submit binary packages to the verified staging environment.</p>
              </div>
              <div className="p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm">
                 <MessageSquareCode className="size-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-3">Optimize_AI</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Refine behavior trees and procedural combat patterns.</p>
              </div>
           </div>
        </div>

        <div className="lg:w-1/2 w-full">
           <div className="bg-red-600 p-10 md:p-16 relative overflow-hidden group">
              {/* Giant Icon Background */}
              <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-transform duration-[2000ms]">
                <ShieldCheck className="size-96 text-white" />
              </div>

              <div className="relative z-10 text-white">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="h-0.5 w-12 bg-white" />
                   <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">ARSENAL_DATA</h3>
                 </div>

                 <div className="space-y-6 mb-12">
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Active_Entities</span>
                       <span className="text-3xl md:text-4xl font-black leading-none">1,204</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Global_Forks</span>
                       <span className="text-3xl md:text-4xl font-black leading-none">8,942</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Verified_Devs</span>
                       <span className="text-3xl md:text-4xl font-black leading-none">443</span>
                    </div>
                 </div>

                 <button className="w-full h-16 md:h-20 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 group/btn">
                    Access Repository
                    <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
                 </button>
                 
                 <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-widest opacity-60">
                    <Zap className="size-3 fill-white" />
                    System Status: Synchronized
                 </div>
              </div>
           </div>
        </div>
        
      </div>
    </section>
  );
}
