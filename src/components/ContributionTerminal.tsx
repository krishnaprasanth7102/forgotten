
"use client";

import { useState } from "react";
import { useAuth, useUser } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GitFork, Upload, MessageSquareCode, ShieldCheck, Zap, ArrowRight, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function ContributionTerminal() {
  const { auth } = useAuth();
  const { user } = useUser();
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
    if (!auth?.currentUser || !user) return;

    setIsSubmitting(true);
    
    const bossData = {
      ...formData,
      contributorId: user.uid,
      contributorName: user.displayName || "Anonymous",
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

    try {
      await addDoc(collection(auth.app.firestore(), "bosses"), bossData);
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
        requestResourceData: bossData
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="protocol" className="bg-black py-20 sm:py-32 lg:py-48 px-4 sm:px-6 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-10">
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
           <div className="text-red-600 font-bold text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 flex items-center justify-center lg:justify-start gap-3">
             <GitFork className="size-4 shrink-0" /> Open_Source_Protocol
           </div>
           <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">DEPLOY_YOUR_ENTITY</h2>
           <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
             FORGOTTEN thrives on predatory collaboration. Fork existing modules or push entirely new tactical constructs to the global database.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <button 
                onClick={() => user ? setIsFormOpen(true) : document.getElementById('login-trigger')?.click()}
                className="p-6 sm:p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm"
              >
                 <Upload className="size-8 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs mb-2">Push_Entity</h4>
                 <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">Submit binary packages to the verified staging environment.</p>
              </button>
              <div className="p-6 sm:p-8 border border-white/10 hover:border-red-600 transition-all group bg-black/40 backdrop-blur-sm">
                 <MessageSquareCode className="size-8 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs mb-2">Optimize_AI</h4>
                 <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">Refine behavior patterns and procedural combat logic.</p>
              </div>
           </div>
        </div>

        <div className="w-full lg:w-1/2">
           <div className="bg-red-600 p-8 sm:p-12 lg:p-16 relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-transform duration-[2000ms]">
                <ShieldCheck className="size-64 sm:size-80 lg:size-96 text-white" />
              </div>

              <div className="relative z-10 text-white">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="h-0.5 w-8 sm:w-12 bg-white" />
                   <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter uppercase">ARSENAL_DATA</h3>
                 </div>

                 <div className="space-y-4 sm:space-y-6 mb-10 lg:mb-12">
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Active_Entities</span>
                       <span className="text-3xl sm:text-4xl font-black leading-none">1,204</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Global_Forks</span>
                       <span className="text-3xl sm:text-4xl font-black leading-none">8,942</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-3 group/stat">
                       <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-70 group-hover:opacity-100 transition-opacity">Verified_Devs</span>
                       <span className="text-3xl sm:text-4xl font-black leading-none">443</span>
                    </div>
                 </div>

                 <button className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 group/btn">
                    Access Repository
                    <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                 </button>
                 
                 <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-widest opacity-60">
                    <Zap className="size-3 fill-white" />
                    Status: Synchronized
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Contribution Modal - Responsive Overlays */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative w-full h-full sm:h-auto sm:max-w-4xl bg-black border sm:border-white/10 p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-[100vh] sm:max-h-[90vh] scrollbar-hide">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-red-600 transition-colors z-30"
              disabled={isSubmitting}
            >
              <X className="size-6 sm:size-8" />
            </button>

            {success ? (
              <div className="h-full sm:h-[50vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
                <div className="size-16 sm:size-20 border-2 border-green-500 text-green-500 flex items-center justify-center animate-pulse">
                  <ShieldCheck className="size-10 sm:size-12" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase">UPLOAD_COMPLETE</h3>
                <p className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">Entity staging successful. Protocol synchronized.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12 pt-10 sm:pt-0">
                <div className="text-center sm:text-left">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-3">DEPLOY_ENTITY</h3>
                  <p className="text-muted-foreground text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em]">Automated binary assessment required.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Entity_Name</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none uppercase font-bold tracking-tighter text-lg"
                        placeholder="e.g. MALPHAS"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Codename</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none uppercase font-bold tracking-widest text-xs"
                        placeholder="e.g. VOID_WING"
                        value={formData.codename}
                        onChange={(e) => setFormData({...formData, codename: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none font-body text-xs sm:text-sm leading-relaxed"
                        placeholder="Detail tactical behavior..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Threat_Level</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none uppercase font-bold text-[10px]"
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
                        <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Difficulty</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none uppercase font-bold text-[10px]"
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
                      <label className="text-[9px] font-black uppercase tracking-widest text-red-600">Preview_URL</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none font-mono text-[10px]"
                        placeholder="https://picsum.photos/..."
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-red-600">GitHub_Repo</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:border-red-600 outline-none font-mono text-[10px]"
                        placeholder="github.com/..."
                        value={formData.githubRepo}
                        onChange={(e) => setFormData({...formData, githubRepo: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-red-600/20 bg-red-600/5 flex items-start gap-4">
                  <AlertCircle className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-mono">
                    By submitting, you license this entity under the FORGOTTEN Open Protocol. Logic must be engine-agnostic.
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 sm:h-20 bg-red-600 text-white font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">SYNCHRONIZING...</span>
                  ) : (
                    <>
                      <Upload className="size-4" />
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
