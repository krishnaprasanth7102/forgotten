"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Check, Code2, Rocket, Zap, Globe } from "lucide-react";

export function IntegrationMode() {
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    unreal: `#include "Forgotten/BossSystem.h"\n\nvoid ABossManager::SpawnEntity(FString BossID) {\n    FBossPackage Entity = UForgottenAPI::RequestArsenal(BossID);\n    Entity.InitializeAI();\n    Entity.DeployToWorld(GetWorld());\n}`,
    unity: `using Forgotten.Systems;\n\npublic class BossSpawner : MonoBehaviour {\n    void LoadBoss(string id) {\n        var boss = ForgottenArsenal.Load(id);\n        boss.Instantiate(transform.position);\n        boss.BeginCombatSequence();\n    }\n}`,
    godot: `extends Node3D\n\nfunc deploy_entity(boss_id: String):\n    var arsenal = get_node("/root/ForgottenArsenal")\n    var boss = arsenal.spawn(boss_id)\n    add_child(boss)\n    boss.activate_ai()`
  };

  return (
    <section id="integration" className="bg-black py-16 md:py-24 lg:py-48 px-6 lg:px-12 border-b border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-[300px] md:size-[400px] bg-red-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-red-600 font-black text-[10px] tracking-[0.6em] uppercase mb-6 md:mb-8 flex items-center gap-4">
            <Code2 className="size-4 md:size-5" /> TECHNICAL_BRIEFING
          </h2>
          <h3 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 md:mb-8 leading-[0.85]">INTEGRATION_MODE</h3>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Native deployment protocols for verified engines. Low-level core modules ensure tactical performance overhead remains minimal across all hardware profiles.
          </p>
        </div>

        <Tabs defaultValue="unreal" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-4 flex flex-col gap-8 md:gap-12">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 md:gap-4 items-stretch p-0">
                <TabsTrigger 
                  value="unreal"
                  className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  UNREAL ENGINE 5.4+
                  <Rocket className="size-4 md:size-5 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="unity"
                  className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  UNITY 6 LTS
                  <Zap className="size-4 md:size-5 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="godot"
                  className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  GODOT 4.3+
                  <Globe className="size-4 md:size-5 opacity-50" />
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6 md:space-y-10 bg-white/[0.02] p-6 md:p-10 border border-white/5">
                 <div className="flex gap-4 md:gap-8 items-start group">
                    <div className="size-10 md:size-12 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-base md:text-lg shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">01</div>
                    <p className="text-xs md:text-base text-muted-foreground leading-relaxed pt-1">Inject the <span className="text-white font-black">FORGOTTEN.CORE</span> binary module into your project source.</p>
                 </div>
                 <div className="flex gap-4 md:gap-8 items-start group">
                    <div className="size-10 md:size-12 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-base md:text-lg shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">02</div>
                    <p className="text-xs md:text-base text-muted-foreground leading-relaxed pt-1">Bind the unique <span className="text-white font-black">ENTITY_ID</span> key to your tactical world spawner.</p>
                 </div>
                 <div className="flex gap-4 md:gap-8 items-start group">
                    <div className="size-10 md:size-12 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-base md:text-lg shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">03</div>
                    <p className="text-xs md:text-base text-muted-foreground leading-relaxed pt-1">Execute <code className="text-red-500 font-black px-1">ACTIVATE_AI()</code> to link the behavior tree.</p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-8 h-full">
               {Object.entries(codeExamples).map(([key, code]) => (
                 <TabsContent key={key} value={key} className="m-0 focus-visible:outline-none">
                    <div className="relative group flex flex-col h-full">
                       <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                          <button 
                            onClick={() => copyCode(code)}
                            className="bg-red-600 hover:bg-white hover:text-black p-3 md:p-4 text-white transition-all shadow-2xl"
                            title="Copy Code"
                          >
                             {copied ? <Check className="size-5 md:size-6" /> : <Copy className="size-5 md:size-6" />}
                          </button>
                       </div>
                       <div className="bg-white/[0.03] border border-white/10 p-6 md:p-16 font-mono text-xs md:text-lg leading-relaxed overflow-x-auto whitespace-pre min-h-[300px] md:min-h-[400px] flex items-center scrollbar-hide">
                          <code className="text-white/80">{code}</code>
                       </div>
                       <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4 md:gap-8 text-[8px] md:text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] md:tracking-[0.4em]">
                          <span className="flex items-center gap-2 md:gap-3">
                            <div className="size-1.5 md:size-2 bg-red-600 animate-pulse" /> 
                            SYNTAX: {key === 'unreal' ? 'C++ 20' : key === 'unity' ? 'C# 12' : 'GDScript 2.0'}
                          </span>
                          <span className="bg-white/5 px-2 py-1 border border-white/10">V4.0.12_STABLE</span>
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