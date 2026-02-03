
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Terminal, Copy, Check, Code2, Rocket, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="bg-black py-20 md:py-32 lg:py-40 px-6 lg:px-24 border-b border-white/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 size-[300px] md:size-[500px] bg-red-600/5 blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center lg:text-left">
          <h2 className="text-red-600 font-bold text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 flex items-center justify-center lg:justify-start gap-3">
            <Code2 className="size-4" /> Technical_Briefing
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-6 md:mb-8 leading-[0.9]">INTEGRATION_MODE</h3>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Native deployment protocols for verified engines. Low-level core modules ensure performance overhead remains minimal across all platforms.
          </p>
        </div>

        <Tabs defaultValue="unreal" className="w-full">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 items-stretch p-0">
                <TabsTrigger 
                  value="unreal"
                  className="justify-between px-6 md:px-8 py-5 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  Unreal Engine 5.4+
                  <Rocket className="size-4 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="unity"
                  className="justify-between px-6 md:px-8 py-5 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  Unity 6 LTS
                  <Zap className="size-4 opacity-50" />
                </TabsTrigger>
                <TabsTrigger 
                  value="godot"
                  className="justify-between px-6 md:px-8 py-5 md:py-6 border border-white/10 data-[state=active]:bg-white data-[state=active]:text-black rounded-none uppercase font-black tracking-[0.2em] text-[10px] md:text-xs transition-all hover:border-red-600"
                >
                  Godot 4.3+
                  <Globe className="size-4 opacity-50" />
                </TabsTrigger>
              </TabsList>

              <div className="mt-8 md:mt-12 space-y-6 md:space-y-8 bg-white/[0.02] p-6 md:p-8 border border-white/5">
                 <div className="flex gap-4 md:gap-6 items-start group">
                    <div className="size-8 md:size-10 rounded-none border border-red-600 text-red-600 flex items-center justify-center font-black text-xs md:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">01</div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-1.5 md:pt-2">Inject the <span className="text-white font-bold">Forgotten.core</span> module into your project source.</p>
                 </div>
                 <div className="flex gap-4 md:gap-6 items-start group">
                    <div className="size-8 md:size-10 rounded-none border border-red-600 text-red-600 flex items-center justify-center font-black text-xs md:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">02</div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-1.5 md:pt-2">Bind the unique <span className="text-white font-bold">Entity_ID</span> to your world spawner logic.</p>
                 </div>
                 <div className="flex gap-4 md:gap-6 items-start group">
                    <div className="size-8 md:size-10 rounded-none border border-red-600 text-red-600 flex items-center justify-center font-black text-xs md:text-sm shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">03</div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-1.5 md:pt-2">Call <code className="text-red-500 font-bold px-1">ActivateAI()</code> to link tactical behavior.</p>
                 </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 order-1 lg:order-2">
               {Object.entries(codeExamples).map(([key, code]) => (
                 <TabsContent key={key} value={key} className="m-0 focus-visible:outline-none">
                    <div className="relative group">
                       <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                          <button 
                            onClick={() => copyCode(code)}
                            className="bg-red-600 hover:bg-white hover:text-black p-2 md:p-3 text-white transition-all shadow-xl"
                            title="Copy Code"
                          >
                             {copied ? <Check className="size-4 md:size-5" /> : <Copy className="size-4 md:size-5" />}
                          </button>
                       </div>
                       <div className="bg-white/[0.03] border border-white/10 p-6 md:p-12 font-code text-[11px] md:text-base leading-relaxed overflow-x-auto whitespace-pre min-h-[250px] md:min-h-[300px] flex items-center">
                          <code className="text-white/80">{code}</code>
                       </div>
                       <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-4 md:gap-6 text-[8px] md:text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">
                          <span className="flex items-center gap-2">
                            <div className="size-1.5 bg-red-600 animate-pulse" /> 
                            Syntax: {key === 'unreal' ? 'C++ 20' : key === 'unity' ? 'C# 12' : 'GDScript 2.0'}
                          </span>
                          <span className="bg-white/5 px-2 py-1">v4.0.12_STABLE</span>
                          <span className="hidden sm:inline">8a7c2...f902</span>
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
