
"use client";

import { useState } from "react";
import { useAuth, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GitFork, Upload, MessageSquareCode, ShieldCheck, Zap, ArrowRight, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Boss } from "@/lib/boss-data";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function ContributionTerminal() {
  const { auth } = useAuth();
  const { firestore } = useFirestore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    codename: "",
    description: "",
    complexity: "MEDIUM",
    threatLevel: "A-TIER",
    engines: ["UNREAL"],
    imageUrl: "",
    githubRepo: "",
    assets: "MODULAR_PBR",
    logic: "BEHAVIOR_TREE",
    combat: "HYBRID",
    lore: "EXTRACTED_LOG"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.currentUser || !firestore) return;

    setIsSubmitting(true);
    
    const bossData: Partial<Boss> = {
      ...formData,
      contributorId: auth.currentUser.uid,
      contributorName: auth.currentUser.displayName || "Anonymous",
      downloadCount: 0,
      version: "1.0.0",
      createdAt: serverTimestamp(),
      packages: {
        assets: formData.assets,
        logic: formData.logic,
        combat: formData.combat,
        lore: formData.lore
      }
    };

    // Clean the data for firestore
    const cleanData = JSON.parse(JSON.stringify(bossData));
    delete cleanData.assets;
    delete cleanData.logic;
    delete cleanData.combat;
    delete cleanData.lore;

    try {
      await addDoc(collection(firestore, "bosses"), cleanData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsFormOpen(false);
        setFormData({
          name: "", codename: "", description: "", complexity: "MEDIUM", 
          threatLevel: "A-TIER", engines: ["UNREAL"], imageUrl: "", githubRepo: "",
          assets: "MODULAR_PBR", logic: "BEHAVIOR_TREE", combat: "HYBRID", lore: "EXTRACTED_LOG"
        });
      }, 3000);
    } catch (e: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'bosses',
        operation: 'create',
        requestResourceData: cleanData
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="protocol" className="bg-black py-24 md:py-40 px-6 lg:px-24 relative overflow-hidden">
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
              <button 
                onClick={() => auth?.currentUser ? setIsFormOpen(true) : document.getElementById('login-trigger')?.click()}
                className="p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm text-left"
              >
                 <Upload className="size-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-3">Push_Entity</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Submit binary packages to the verified staging environment.</p>
              </button>
              <div className="p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm">
                 <MessageSquareCode className="size-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-3">Optimize_AI</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">Refine behavior trees and procedural combat patterns.</p>
              </div>
           </div>
        </div>

        <div className="lg:w-1/2 w-full">
           <div className="bg-red-600 p-10 md:p-16 relative overflow-hidden group">
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

      {/* Contribution Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative w-full max-w-4xl bg-black border border-white/10 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-red-600"
              disabled={isSubmitting}
            >
              <X className="size-8" />
            </button>

            {success ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
                <div className="size-20 border-2 border-green-500 text-green-500 flex items-center justify-center animate-pulse">
                  <ShieldCheck className="size-12" />
                </div>
                <h3 className="text-4xl font-black tracking-tighter uppercase">UPLOAD_COMPLETE</h3>
                <p className="text-muted-foreground font-mono uppercase tracking-widest">Entity staging successful. Protocol synchronized.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">DEPLOY_NEW_ENTITY</h3>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">All submissions undergo automated threat assessment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Entity_Name</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none uppercase font-bold tracking-tighter text-xl"
                        placeholder="e.g. MALPHAS"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Codename</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none uppercase font-bold tracking-widest"
                        placeholder="e.g. VOID_WING"
                        value={formData.codename}
                        onChange={(e) => setFormData({...formData, codename: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Description</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none font-body text-sm leading-relaxed"
                        placeholder="Detail tactical behavior and combat parameters..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Threat_Level</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none uppercase font-bold"
                          value={formData.threatLevel}
                          onChange={(e) => setFormData({...formData, threatLevel: e.target.value as any})}
                        >
                          <option>C-TIER</option>
                          <option>B-TIER</option>
                          <option>A-TIER</option>
                          <option>S-TIER</option>
                          <option>OMEGA</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Difficulty</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none uppercase font-bold"
                          value={formData.complexity}
                          onChange={(e) => setFormData({...formData, complexity: e.target.value as any})}
                        >
                          <option>LOW</option>
                          <option>MEDIUM</option>
                          <option>HIGH</option>
                          <option>EXTREME</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Preview_Image_URL</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none font-mono text-xs"
                        placeholder="https://picsum.photos/seed/..."
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Source_Repository (Optional)</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-red-600 outline-none font-mono text-xs"
                        placeholder="github.com/username/repo"
                        value={formData.githubRepo}
                        onChange={(e) => setFormData({...formData, githubRepo: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-red-600/20 bg-red-600/5 flex items-start gap-4">
                  <AlertCircle className="size-5 text-red-600 shrink-0 mt-1" />
                  <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-mono">
                    By submitting, you license this entity under the FORGOTTEN Open Protocol. Any logic submitted must be natively compatible with Unreal, Unity, or Godot build pipelines.
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 bg-red-600 text-white font-black uppercase tracking-[0.5em] text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">SYNCHRONIZING_BINARY...</span>
                  ) : (
                    <>
                      <Upload className="size-5" />
                      SUBMIT_TO_ARSENAL
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
