
"use client";

import { useState, useMemo } from "react";
import { useCollection, useAuth, useFirestore } from "@/firebase";
import { collection, doc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { ChevronRight, Download, Terminal, Cpu, ShieldAlert, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Boss } from "@/lib/boss-data";
import { useMemoFirebase } from "@/firebase/firestore/use-memo-firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function BossArsenal() {
  const { auth } = useAuth();
  const { firestore } = useFirestore();
  const [selectedBossId, setSelectedBossId] = useState<string | null>(null);
  const [isArming, setIsArming] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const bossesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, "bosses");
  }, [firestore]);

  const { data: bosses, loading } = useCollection<Boss>(bossesQuery);

  const selectedBoss = useMemo(() => {
    if (!bosses || bosses.length === 0) return null;
    return bosses.find(b => b.id === selectedBossId) || bosses[0];
  }, [bosses, selectedBossId]);

  const handleDownload = () => {
    if (!selectedBoss || !firestore || !auth?.currentUser) return;
    
    setIsArming(true);
    setDownloadSuccess(false);
    
    const logId = doc(collection(firestore, "downloads")).id;
    const logRef = doc(firestore, "downloads", logId);
    const bossRef = doc(firestore, "bosses", selectedBoss.id);

    const logData = {
      bossId: selectedBoss.id,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp()
    };

    setDoc(logRef, logData).catch(async (e) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: logRef.path,
        operation: 'create',
        requestResourceData: logData
      }));
    });

    updateDoc(bossRef, {
      downloadCount: increment(1)
    }).catch(async (e) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: bossRef.path,
        operation: 'update',
        requestResourceData: { downloadCount: 'increment' }
      }));
    });

    setTimeout(() => {
      setIsArming(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center font-mono text-red-600 gap-4">
        <div className="size-8 border-2 border-red-600 border-t-transparent animate-spin" />
        <div className="animate-pulse uppercase tracking-[0.5em] text-[9px]">Loading_Database_Segments...</div>
      </div>
    );
  }

  if (!bosses || bosses.length === 0) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center font-mono text-muted-foreground gap-4 border-y border-white/10 px-6 text-center">
        <div className="uppercase tracking-[0.2em] text-xs">No_Entities_Detected_In_Sector</div>
        <a href="#protocol" className="text-red-600 text-[10px] font-black uppercase hover:underline">Initialize_Manual_Upload_Sequence</a>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black border-y border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-stretch">
      {/* Background Decorative Text - Hidden on small screens */}
      <div className="absolute top-24 -left-12 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter hidden xl:block">
        DATABASE
      </div>

      {/* Selector List */}
      <div className="w-full lg:w-[320px] xl:w-[400px] border-r border-white/10 flex flex-col bg-black/50 backdrop-blur-sm relative z-10 shrink-0">
        <div className="p-5 sm:p-6 lg:p-8 border-b border-white/10 bg-black/80">
          <h2 className="text-red-600 font-bold text-[9px] tracking-widest uppercase mb-2 flex items-center gap-2">
            <Terminal className="size-3" /> Entity Database
          </h2>
          <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter uppercase">SELECT_ENTITY</div>
        </div>
        
        <div className="flex-1 overflow-y-auto max-h-[30vh] lg:max-h-none scrollbar-hide border-b border-white/10 lg:border-none">
          {bosses.map((boss) => (
            <button
              key={boss.id}
              onClick={() => {
                setSelectedBossId(boss.id);
                setDownloadSuccess(false);
              }}
              className={cn(
                "w-full p-5 sm:p-6 lg:p-8 text-left transition-all relative group border-b border-white/5",
                selectedBoss?.id === boss.id ? "bg-white text-black" : "hover:bg-red-600/5"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className={cn(
                    "text-[8px] font-bold tracking-[0.2em] uppercase mb-1",
                    selectedBoss?.id === boss.id ? "text-black/50" : "text-red-600"
                  )}>
                    LVL_{boss.threatLevel} // v{boss.version}
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter uppercase truncate">{boss.name}</div>
                </div>
                <ChevronRight className={cn(
                  "size-5 transition-transform shrink-0",
                  selectedBoss?.id === boss.id ? "rotate-0 text-black" : "-rotate-45 text-red-600 group-hover:rotate-0"
                )} />
              </div>
              {selectedBoss?.id === boss.id && (
                <div className="absolute left-0 top-0 w-1 lg:w-1.5 h-full bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Entity Detail */}
      {selectedBoss && (
        <div className="flex-1 relative flex flex-col bg-black min-w-0">
          {/* Mobile Image Container */}
          <div className="h-[30vh] sm:h-[40vh] lg:h-[45vh] relative overflow-hidden border-b border-white/10 shrink-0">
            <img 
              src={selectedBoss.imageUrl} 
              alt={selectedBoss.name}
              className="w-full h-full object-cover grayscale brightness-[0.25] scale-105"
            />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20 flex flex-wrap justify-end gap-1.5">
              {selectedBoss.engines.map(eng => (
                <div key={eng} className="bg-black/90 border border-red-600/30 px-2 sm:px-3 py-1 text-[7px] sm:text-[8px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                  {eng}
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 lg:bottom-12 lg:left-12 z-20">
              <div className="text-red-600 text-[8px] sm:text-[9px] font-bold tracking-[0.5em] uppercase mb-1 sm:mb-2">CODENAME</div>
              <div className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white uppercase leading-[0.8]">{selectedBoss.codename}</div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-16 xl:p-24 flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
              <div className="space-y-10">
                <div>
                  <h3 className="text-red-600 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] mb-4 sm:mb-6 uppercase flex items-center gap-2">
                    <ShieldAlert className="size-3" /> Tactical_Analysis
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/90 max-w-2xl">
                    {selectedBoss.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                    <div className="text-muted-foreground text-[8px] sm:text-[9px] font-bold tracking-widest uppercase mb-1">Threat Level</div>
                    <div className="text-xl sm:text-2xl font-black text-red-600">{selectedBoss.threatLevel}</div>
                  </div>
                  <div className="p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                    <div className="text-muted-foreground text-[8px] sm:text-[9px] font-bold tracking-widest uppercase mb-1">Deployments</div>
                    <div className="text-xl sm:text-2xl font-black text-white">{selectedBoss.downloadCount}</div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 border border-white/10 bg-black/40">
                  <div className="text-muted-foreground text-[8px] sm:text-[9px] font-bold tracking-widest uppercase mb-2">Origin</div>
                  <div className="flex items-center gap-3">
                    <div className="size-1.5 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">Contributor: {selectedBoss.contributorName}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-red-600 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] mb-4 sm:mb-8 uppercase flex items-center gap-2">
                    <Cpu className="size-3" /> Deployment_Package
                  </h3>
                  <div className="space-y-3 sm:space-y-5">
                    {Object.entries(selectedBoss.packages).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-3 group">
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">{key}</span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-white/70 group-hover:text-red-600 transition-colors text-right pl-4">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  {!auth?.currentUser ? (
                    <div className="p-6 sm:p-8 border-2 border-dashed border-red-600/30 bg-red-600/5 text-center">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">ACCESS_DENIED</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-mono mb-6">Initialize security protocol to unlock arsenal</p>
                      <button 
                        onClick={() => document.getElementById('login-trigger')?.click()}
                        className="text-[9px] font-black uppercase text-white bg-red-600 px-8 py-3 hover:bg-white hover:text-black transition-all"
                      >
                        RETRY_AUTH
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button 
                        onClick={handleDownload}
                        disabled={isArming}
                        className={cn(
                          "w-full h-14 sm:h-16 lg:h-20 relative flex items-center justify-center gap-4 transition-all border border-red-600 font-black tracking-[0.4em] uppercase text-[10px] sm:text-xs",
                          isArming 
                            ? "bg-red-600 text-white cursor-not-allowed" 
                            : downloadSuccess
                              ? "bg-green-600 border-green-600 text-white"
                              : "bg-red-600 text-white hover:bg-transparent hover:text-red-600"
                        )}
                      >
                        {isArming ? (
                          <span className="animate-pulse">Arming_Arsenal...</span>
                        ) : downloadSuccess ? (
                          <>
                            <CheckCircle2 className="size-4" />
                            <span>Package_Ready</span>
                          </>
                        ) : (
                          <>
                            <Download className="size-4" />
                            <span>Initialize_Uplink</span>
                          </>
                        )}
                      </button>
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[7px] font-mono text-muted-foreground/40 uppercase italic">SHA-256: 4F2C9...8E1A</span>
                        <span className="text-[7px] font-mono text-muted-foreground/40 uppercase italic">EULA_v4.0.1</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
