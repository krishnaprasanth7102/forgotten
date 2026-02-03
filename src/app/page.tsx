
"use client";

import { useEffect } from 'react';
import { initializeFirebase, FirebaseClientProvider, useFirestore } from '@/firebase';
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Navbar } from "@/components/Navbar";
import { SystemBoot } from "@/components/SystemBoot";
import { BossArsenal } from "@/components/BossArsenal";
import { IntegrationMode } from "@/components/IntegrationMode";
import { ContributionTerminal } from "@/components/ContributionTerminal";
import { SEED_BOSSES } from '@/lib/boss-data';

const { firebaseApp, firestore, auth } = initializeFirebase();

function SeedDatabase() {
  const { firestore } = useFirestore();

  useEffect(() => {
    async function seed() {
      if (!firestore) return;
      const snapshot = await getDocs(collection(firestore, "bosses"));
      if (snapshot.empty) {
        console.log("Seeding initial boss entities...");
        for (const boss of SEED_BOSSES) {
          const bossRef = doc(collection(firestore, "bosses"));
          await setDoc(bossRef, {
            ...boss,
            id: bossRef.id,
            createdAt: serverTimestamp()
          });
        }
      }
    }
    seed();
  }, [firestore]);

  return null;
}

export default function Home() {
  return (
    <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
      <SeedDatabase />
      <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        <Navbar />
        
        <SystemBoot />

        <div id="entities">
          <BossArsenal />
        </div>

        <div id="integration">
          <IntegrationMode />
        </div>

        <div id="protocol">
          <ContributionTerminal />
        </div>

        <footer className="py-24 px-6 border-t border-white/10 flex flex-col items-center bg-black relative z-10">
           <div className="text-[10px] font-bold text-red-600 tracking-[0.5em] mb-8 uppercase animate-pulse-red">System Operational</div>
           <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase mb-12 opacity-10 select-none">FORGOTTEN</div>
           <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <a href="#" className="hover:text-red-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-red-600 transition-colors">Changelog</a>
              <a href="#" className="hover:text-red-600 transition-colors">API Reference</a>
              <a href="#" className="hover:text-red-600 transition-colors">Status</a>
           </div>
           <div className="mt-24 font-mono text-[8px] text-muted-foreground/30 uppercase tracking-[0.3em]">
              Disconnected. End of Transmission.
           </div>
        </footer>
      </main>
    </FirebaseClientProvider>
  );
}
