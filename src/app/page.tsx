
"use client";

import { useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Navbar } from "@/components/Navbar";
import { SystemBoot } from "@/components/SystemBoot";
import { BossArsenal } from "@/components/BossArsenal";
import { IntegrationMode } from "@/components/IntegrationMode";
import { ContributionTerminal } from "@/components/ContributionTerminal";
import { SEED_BOSSES } from '@/lib/boss-data';


function SeedDatabase() {
  const { firestore } = useFirestore();

  useEffect(() => {
    async function seed() {
      if (!firestore) return;
      const snapshot = await getDocs(collection(firestore, "bosses"));
      // Re-seed if the DB has fewer entities than our catalog
      if (snapshot.size < SEED_BOSSES.length) {
        console.log(`Seeding ${SEED_BOSSES.length} enemy AI entities...`);
        // Clear existing to avoid duplicates
        for (const docSnap of snapshot.docs) {
          await setDoc(doc(firestore, "bosses", docSnap.id), { _deleted: true }).catch(() => {});
        }
        // Insert all fresh seeds
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
    <>
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
           <div className="text-[10px] font-bold text-red-600 tracking-[0.5em] mb-8 uppercase animate-pulse">All Systems Online</div>
           <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase mb-6 opacity-10 select-none">FORGOTTEN</div>
           <p className="text-[11px] text-white/20 tracking-widest uppercase font-mono mb-10 text-center">
             Free Enemy AI Ecosystem · Blueprint Generator · Open Marketplace
           </p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <a href="/library" className="hover:text-red-600 transition-colors">Marketplace</a>
              <a href="/playground" className="hover:text-red-600 transition-colors">AI Playground</a>
              <a href="#entities" className="hover:text-red-600 transition-colors">Entity Library</a>
              <a href="#protocol" className="hover:text-red-600 transition-colors">Contribute</a>
              <a href="#" className="hover:text-red-600 transition-colors">Docs</a>
           </div>
           <div className="mt-16 font-mono text-[8px] text-muted-foreground/20 uppercase tracking-[0.3em] text-center">
              © 2025 Forgotten · Open Source · Free Forever · MIT License
           </div>
        </footer>

      </main>
    </>
  );
}
