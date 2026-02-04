"use client";

import { useState, useMemo } from "react";
import { useCollection, useAuth, useFirestore } from "@/firebase";
import { collection, doc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { ChevronRight, Download, Terminal, Cpu, ShieldAlert, CheckCircle2 } from "lucide-react";
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

    setDoc(logRef, logData).catch(async () => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: logRef.path,
        operation: 'create',
        requestResourceData: logData
      }));
    });

    updateDoc(bossRef, {
      downloadCount: increment(1)
    }).catch(async () => {
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
    }, 2500);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center font-mono text-red-600 gap-6">
        <div className="size-10 border-4 border-red-600 border-t-transparent animate-spin" />
        <div className="animate-pulse uppercase tracking-[0.6em] text-[10px]">Accessing_Database_Segments...</div>
      </div>
    );
  }

  if (!bosses || bosses.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center font-mono text-muted-foreground gap-6 border-y border-white/10 px-6 text-center">
        <div className="uppercase tracking-[0.3em] text-sm">Empty_Sector_Detected</div>
        <a href="#protocol" className="text-red-600 text-xs font-black uppercase hover:underline tracking-widest">Initialize_Upload_Sequence</a>
      </div>
    );
  }

  return (
    <section id="entities" className="min-h-screen bg-black border-y border-white/10 relative flex flex-col lg:flex-row overflow-hidden">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Selector List */}
      <div className="w-full lg:w-[400px] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-black relative z-10 shrink-0">
        <div className="p-6 md:p-8 border-b border-white/10 sticky top-0 bg-black z-20">
          <h2 className="text-red-600 font-bold text-[10px] tracking-[0.5em] uppercase mb-3 flex items-center gap-3">
            <Terminal className="size-4" /> ENTITY_ARSENAL
          </h2>
          <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">SELECT_UNIT</div>
        </div>
        
        <div className="flex-1 overflow-y-auto max-h-[30vh] md:max-h-[40vh] lg:max-h-none scrollbar-hide">
          {bosses.map((boss) => (
            <button
              key={boss.id}
              onClick={() => {
                setSelectedBossId(boss.id);
                setDownloadSuccess(false);
                if (window.innerWidth < 1024) {
                   document.getElementById('boss-details')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                "w-full p-6 md:p-8 text-left transition-all relative group border-b border-white/5",
                selectedBoss?.id === boss.id ? "bg-white text-black" : "hover:bg-red-600/5"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className={cn(
                    "text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase mb-1",
                    selectedBoss?.id === boss.id ? "text-black/40" : "text-red-600"
                  )}>
                    THREAT_{boss.threatLevel} // {boss.complexity}
                  </div>
                  <div className="text-xl md:text-2xl font-black tracking-tighter uppercase truncate leading-none">{boss.name}</div>
                </div>
                <ChevronRight className={cn(
                  "size-5 md:size-6 transition-transform",
                  selectedBoss?.id === boss.id ? "rotate-0 text-black" : "-rotate-45 text-red-600 group-hover:rotate-0"
                )} />
              </div>
              {selectedBoss?.id === boss.id && (
                <div className="absolute left-0 top-0 w-1.5 md:w-2 h-full bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Entity Detail */}
      {selectedBoss && (
        <div id="boss-details" className="flex-1 relative flex flex-col bg-black overflow-y-auto">
          {/* Header Image */}
          <div className="h-[30vh] md:h-[40vh] lg:h-[45vh] relative overflow-hidden shrink-0 border-b border-white/10">
            <img 
              src={selectedBoss.imageUrl} 
              alt={selectedBoss.name}
              className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex flex-wrap justify-end gap-2">
              {selectedBoss.engines.map(eng => (
                <div key={eng} className="bg-black border border-red-600 px-3 py-1 text-[8px] md:text-[9px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                  {eng}
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 max-w-[90%] md:max-w-[80%]">
              <div className="text-red-600 text-[8px] md:text-[10px] font-black tracking-[0.6em] uppercase mb-2 md:mb-4">TACTICAL_CODENAME</div>
              <div className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-[0.75] mb-2">{selectedBoss.codename}</div>
              <div className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] truncate">AUTH_KEY: {selectedBoss.id.slice(0, 12)}</div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-12 lg:p-24 flex-1">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
              <div className="space-y-8 md:space-y-12">
                <div>
                  <h3 className="text-red-600 text-[10px] md:text-[11px] font-black tracking-[0.5em] mb-4 md:mb-6 uppercase flex items-center gap-3">
                    <ShieldAlert className="size-4" /> ANALYSIS_REPORT
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white/90">
                    {selectedBoss.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="p-4 md:p-6 border border-white/10 bg-white/[0.02]">
                    <div className="text-muted-foreground text-[8px] md:text-[10px] font-black tracking-widest uppercase mb-1 md:mb-2">Threat_Class</div>
                    <div className="text-2xl md:text-3xl font-black text-red-600">{selectedBoss.threatLevel}</div>
                  </div>
                  <div className="p-4 md:p-6 border border-white/10 bg-white/[0.02]">
                    <div className="text-muted-foreground text-[8px] md:text-[10px] font-black tracking-widest uppercase mb-1 md:mb-2">Deployments</div>
                    <div className="text-2xl md:text-3xl font-black text-white">{selectedBoss.downloadCount}</div>
                  </div>
                </div>

                <div className="p-4 md:p-6 border border-white/10 bg-black flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-muted-foreground text-[8px] md:text-[9px] font-black tracking-widest uppercase mb-1">Lead_Contributor</div>
                    <div className="text-xs md:text-sm font-black uppercase text-white tracking-wider">{selectedBoss.contributorName}</div>
                  </div>
                  <div className="size-2 md:size-3 bg-red-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-8 md:space-y-12">
                <div>
                  <h3 className="text-red-600 text-[10px] md:text-[11px] font-black tracking-[0.5em] mb-6 md:mb-8 uppercase flex items-center gap-3">
                    <Cpu className="size-4" /> PACKAGE_MANIFEST
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {Object.entries(selectedBoss.packages).map(([key, val]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 md:pb-4 group">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black group-hover:text-red-600 transition-colors mb-1 sm:mb-0">{key}</span>
                        <span className="text-[10px] font-mono text-white/60 group-hover:text-white transition-colors">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 md:pt-4">
                  {!auth?.currentUser ? (
                    <div className="p-6 md:p-10 border-2 border-dashed border-red-600/30 bg-red-600/5 text-center">
                      <p className="text-[8px] md:text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-3 md:mb-4">ACCESS_RESTRICTED</p>
                      <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase font-mono mb-6 md:mb-8">Authenticate developer credentials to unlock arsenal</p>
                      <button 
                        onClick={() => document.getElementById('login-trigger')?.click()}
                        className="text-[10px] font-black uppercase text-white bg-red-600 px-8 py-3 md:px-10 md:py-4 hover:bg-white hover:text-black transition-all tracking-[0.3em]"
                      >
                        RETRY_AUTH
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      <button 
                        onClick={handleDownload}
                        disabled={isArming}
                        className={cn(
                          "w-full h-16 md:h-20 relative flex items-center justify-center gap-4 md:gap-6 transition-all border-2 border-red-600 font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-sm",
                          isArming 
                            ? "bg-red-600 text-white cursor-wait" 
                            : downloadSuccess
                              ? "bg-green-600 border-green-600 text-white"
                              : "bg-red-600 text-white hover:bg-transparent hover:text-red-600"
                        )}
                      >
                        {isArming ? (
                          <span className="animate-pulse">SYNCHRONIZING_BINARY...</span>
                        ) : downloadSuccess ? (
                          <>
                            <CheckCircle2 className="size-5 md:size-6" />
                            <span>PACKAGE_ARMED</span>
                          </>
                        ) : (
                          <>
                            <Download className="size-5 md:size-6" />
                            <span>INITIALIZE_UPLINK</span>
                          </>
                        )}
                      </button>
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[7px] md:text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.2em]">SHA-256: 0x4F2...</span>
                        <span className="text-[7px] md:text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.2em]">EULA_V4.0.1</span>
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