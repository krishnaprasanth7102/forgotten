
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Terminal, Copy, Check, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function IntegrationMode() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    unreal: `#include "Forgotten/BossSystem.h"\n\nvoid ABossManager::SpawnEntity(FString BossID) {\n    FBossPackage Entity = UForgottenAPI::RequestArsenal(BossID);\n    Entity.InitializeAI();\n    Entity.DeployToWorld(GetWorld());\n}`,
    unity: `using Forgotten.Systems;\n\npublic class BossSpawner : MonoBehaviour {\n    void LoadBoss(string id) {\n        var boss = ForgottenArsenal.Load(id);\n        boss.Instantiate(transform.position);\n        boss.BeginCombatSequence();\n    }\n}`,
    godot: `extends Node3D\n\nfunc deploy_entity(boss_id: String):\n    var arsenal = get_node("/root/ForgottenArsenal")\n    var boss = arsenal.spawn(boss_id)\n    add_child(boss)\n    boss.activate_ai()`
  };

  return (
    <section className="bg-black py-24 px-6 lg:px-24 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-red-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
            <Code2 className="size-4" /> Technical Briefing
          </h2>
          <h3 className="text-6xl font-black tracking-tighter uppercase mb-6">INTEGRATION_MODE</h3>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Deployment of classified entities requires precise execution. Follow the structural protocols for your specific environment.
          </p>
        </div>

        <Tabs defaultValue="unreal" className="w-full">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-2 items-start">
                <TabsTrigger 
                  value="unreal"
                  className="w-full text-left justify-start px-6 py-4 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-bold tracking-widest text-xs"
                >
                  Unreal Engine 5.4+
                </TabsTrigger>
                <TabsTrigger 
                  value="unity"
                  className="w-full text-left justify-start px-6 py-4 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-bold tracking-widest text-xs"
                >
                  Unity 2022.3 LTS
                </TabsTrigger>
                <TabsTrigger 
                  value="godot"
                  className="w-full text-left justify-start px-6 py-4 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-bold tracking-widest text-xs"
                >
                  Godot 4.2+
                </TabsTrigger>
              </TabsList>

              <div className="mt-8 space-y-6">
                 <div className="flex gap-4 items-start">
                    <div className="size-8 rounded-full border border-red-600 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Inject the Forgotten core module into your project dependency list.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="size-8 rounded-full border border-red-600 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Reference the Boss ID in your spawning logic to fetch assets and behavior trees.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="size-8 rounded-full border border-red-600 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Call the <code className="text-red-500">Initialize()</code> protocol to activate combat AI.</p>
                 </div>
              </div>
            </div>

            <div className="lg:w-2/3">
               {Object.entries(codeExamples).map(([key, code]) => (
                 <TabsContent key={key} value={key} className="m-0 focus-visible:outline-none">
                    <div className="relative group">
                       <div className="absolute top-4 right-4 z-20">
                          <button 
                            onClick={copyCode}
                            className="bg-white/10 hover:bg-red-600 p-2 text-white transition-colors"
                          >
                             {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                          </button>
                       </div>
                       <div className="bg-white/[0.03] border border-white/10 p-8 font-code text-sm leading-relaxed overflow-x-auto whitespace-pre">
                          <code className="text-white/80">{code}</code>
                       </div>
                       <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                          <span className="flex items-center gap-1"><div className="size-1 bg-red-600 rounded-full" /> Syntax: {key === 'unreal' ? 'C++' : key === 'unity' ? 'C#' : 'GDScript'}</span>
                          <span>Verified: OK</span>
                       </div>
                    </div>
                 </TabsContent>
               ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
