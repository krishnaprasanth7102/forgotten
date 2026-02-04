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
    <section id="protocol" className="bg-black py-24 sm:py-32 lg:py-48 px-6 relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10 text-center lg:text-left">
        
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
           <div className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
             <GitFork className="size-5" /> OPEN_SOURCE_PROTOCOL
           </div>
           <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-10 leading-[0.85] max-w-2xl">DEPLOY_YOUR_ENTITY</h2>
           <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-16 max-w-xl">
             Predatory collaboration is the core of FORGOTTEN. Fork existing binary modules or push entirely new tactical constructs to the global database.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
              <button 
                onClick={() => user ? setIsFormOpen(true) : document.getElementById('login-trigger')?.click()}
                className="p-10 border border-white/10 hover:border-red-600 transition-all group bg-black/50 backdrop-blur-md text-left"
              >
                 <Upload className="size-10 text-red-600 mb-8 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-3">PUSH_ENTITY</h4>
                 <p className="text-[10px] text-muted-foreground leading-relaxed font-mono uppercase">Submit binary packages to the verified staging environment.</p>
              </button>
              <div className="p-10 border border-white/10 hover:border-red-600 transition-all group bg-black/50 backdrop-blur-md text-left">
                 <MessageSquareCode className="size-10 text-red-600 mb-8 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-3">OPTIMIZE_AI</h4>
                 <p className="text-[10px] text-muted-foreground leading-relaxed font-mono uppercase">Refine behavior patterns and procedural combat logic.</p>
              </div>
           </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
           <div className="bg-red-600 p-12 sm:p-20 relative overflow-hidden group w-full max-w-[600px]">
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-[3000ms]">
                <ShieldCheck className="size-[400px] text-white" />
              </div>

              <div className="relative z-10 text-white">
                 <div className="flex items-center gap-6 mb-12 justify-center lg:justify-start">
                   <div className="h-0.5 w-16 bg-white" />
                   <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase">ARSENAL_DATA</h3>
                 </div>

                 <div className="space-y-6 mb-16">
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 group/stat">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity">Active_Entities</span>
                       <span className="text-4xl sm:text-5xl font-black leading-none">1,204</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 group/stat">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity">Global_Forks</span>
                       <span className="text-4xl sm:text-5xl font-black leading-none">8,942</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 group/stat">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity">Verified_Devs</span>
                       <span className="text-4xl sm:text-5xl font-black leading-none">443</span>
                    </div>
                 </div>

                 <button className="w-full h-20 bg-white text-black font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-xs sm:text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-6 group/btn">
                    ACCESS REPOSITORY
                    <ArrowRight className="size-6 group-hover:translate-x-3 transition-transform" />
                 </button>
                 
                 <div className="mt-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
                    <Zap className="size-4 fill-white" />
                    STATUS: SYNCHRONIZED
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Contribution Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative w-full max-w-4xl bg-black border border-white/10 p-8 sm:p-16 overflow-y-auto max-h-[90vh] scrollbar-hide">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-8 right-8 text-white/40 hover:text-red-600 transition-colors z-30"
              disabled={isSubmitting}
            >
              <X className="size-10" />
            </button>

            {success ? (
              <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-10">
                <div className="size-20 border-2 border-green-500 text-green-500 flex items-center justify-center animate-pulse">
                  <ShieldCheck className="size-12" />
                </div>
                <div>
                  <h3 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-4">UPLOAD_COMPLETE</h3>
                  <p className="text-muted-foreground font-mono uppercase tracking-[0.4em] text-[10px] sm:text-xs">Entity staging successful. System synchronized.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="text-center sm:text-left">
                  <h3 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">DEPLOY_UNIT</h3>
                  <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">Automated binary assessment required.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">ENTITY_NAME</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none uppercase font-black tracking-tighter text-2xl"
                        placeholder="E.G. MALPHAS"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">CODENAME</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none uppercase font-black tracking-[0.2em] text-sm"
                        placeholder="E.G. VOID_WING"
                        value={formData.codename}
                        onChange={(e) => setFormData({...formData, codename: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">DESCRIPTION</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none font-body text-sm leading-relaxed"
                        placeholder="Detail tactical behavior..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">THREAT_TIER</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none uppercase font-black text-[10px] appearance-none"
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
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">COMPLEXITY</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none uppercase font-black text-[10px] appearance-none"
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
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">PREVIEW_UPLINK</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none font-mono text-[10px]"
                        placeholder="HTTPS://..."
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">GIT_REPOSITORY</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-red-600 outline-none font-mono text-[10px]"
                        placeholder="GITHUB.COM/..."
                        value={formData.githubRepo}
                        onChange={(e) => setFormData({...formData, githubRepo: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-red-600/30 bg-red-600/5 flex items-start gap-6">
                  <AlertCircle className="size-6 text-red-600 shrink-0 mt-1" />
                  <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-mono">
                    Binary submission constitutes licensing under the FORGOTTEN Open Protocol. Logic must be verified engine-agnostic for global distribution.
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 bg-red-600 text-white font-black uppercase tracking-[0.6em] text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-6 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">SYNCHRONIZING_BINARY...</span>
                  ) : (
                    <>
                      <Upload className="size-6" />
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