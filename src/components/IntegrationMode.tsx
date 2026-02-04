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
    <section id="integration" className="bg-black py-16 sm:py-32 lg:py-40 px-6 border-b border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-[300px] sm:size-[400px] bg-red-600/5 blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-24 flex flex-col items-center text-center">
          <h2 className="text-red-600 font-black text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.6em] uppercase mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
            <Code2 className="size-4" /> TECHNICAL_BRIEFING
          </h2>
          <h3 className="text-2xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.9] max-w-4xl mx-auto">
            INTEGRATION_MODE
          </h3>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mx-auto px-4">
            Native deployment protocols for verified engines. Low-level core modules ensure tactical performance overhead remains minimal across all hardware profiles.
          </p>
        </div>

        <Tabs defaultValue="unreal" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              <TabsList className="flex flex-col h-auto bg-transparent gap-2 sm:gap-3 items-stretch p-0">
                <TabsTrigger 
                  value="unreal"
                  className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[9px] sm:text-[10px] transition-all hover:border-red-600"
                >
                  UNREAL ENGINE 5.4+
                  <Rocket className="size-3 sm:size-4 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="unity"
                  className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[9px] sm:text-[10px] transition-all hover:border-red-600"
                >
                  UNITY 6 LTS
                  <Zap className="size-3 sm:size-4 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="godot"
                  className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[9px] sm:text-[10px] transition-all hover:border-red-600"
                >
                  GODOT 4.3+
                  <Globe className="size-3 sm:size-4 opacity-50" />
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 sm:space-y-6 bg-white/[0.02] p-6 sm:p-8 border border-white/5 text-left">
                 <div className="flex gap-4 sm:gap-6 items-start group">
                    <div className="size-8 sm:size-10 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">01</div>
                    <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed pt-1">Inject <span className="text-white font-black">FORGOTTEN.CORE</span> binary module into project source.</p>
                 </div>
                 <div className="flex gap-4 sm:gap-6 items-start group">
                    <div className="size-8 sm:size-10 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">02</div>
                    <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed pt-1">Bind the unique <span className="text-white font-black">ENTITY_ID</span> key to tactical spawner.</p>
                 </div>
                 <div className="flex gap-4 sm:gap-6 items-start group">
                    <div className="size-8 sm:size-10 rounded-none border-2 border-red-600 text-red-600 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">03</div>
                    <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed pt-1">Execute <code className="text-red-500 font-black px-1">ACTIVATE_AI()</code> to link the behavior tree.</p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-8 w-full overflow-hidden">
               {Object.entries(codeExamples).map(([key, code]) => (
                 <TabsContent key={key} value={key} className="m-0 focus-visible:outline-none">
                    <div className="relative group flex flex-col h-full w-full">
                       <div className="absolute top-4 right-4 z-20">
                          <button 
                            onClick={() => copyCode(code)}
                            className="bg-red-600 hover:bg-white hover:text-black p-2 sm:p-3 text-white transition-all"
                            title="Copy Code"
                          >
                             {copied ? <Check className="size-3 sm:size-4" /> : <Copy className="size-3 sm:size-4" />}
                          </button>
                       </div>
                       <div className="bg-white/[0.03] border border-white/10 p-6 sm:p-12 font-mono text-[10px] sm:text-sm md:text-base leading-relaxed overflow-x-auto whitespace-pre min-h-[250px] sm:min-h-[300px] flex items-center scrollbar-hide w-full">
                          <code className="text-white/80">{code}</code>
                       </div>
                       <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-[8px] sm:text-[9px] text-muted-foreground font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                          <span className="flex items-center gap-2">
                            <div className="size-1 bg-red-600 animate-pulse" /> 
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
