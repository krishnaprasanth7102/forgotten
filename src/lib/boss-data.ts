
export type Boss = {
  id: string;
  name: string;
  codename: string;
  description: string;
  stats: {
    complexity: string;
    threatLevel: string;
    engine: string[];
  };
  packages: {
    assets: string;
    logic: string;
    combat: string;
    lore: string;
  };
  image: string;
};

export const BOSSES: Boss[] = [
  {
    id: "001",
    name: "MALPHAS",
    codename: "VOID_WING",
    description: "Multi-phase aerial combat entity utilizing high-frequency shadow bursts. Designed for vertical arenas with destructible environments.",
    stats: {
      complexity: "HIGH",
      threatLevel: "S-TIER",
      engine: ["UNITY", "UNREAL", "GODOT"]
    },
    packages: {
      assets: "4K_PBR_MAPS / 128k_POLYS",
      logic: "C#_BEHAVIOR_TREE / C++_COMPONENT",
      combat: "MELEE_AOE / RANGED_PROJECTILE",
      lore: "EXTRACTED_FILE_MALPHAS.LOG"
    },
    image: "https://picsum.photos/seed/malphas/1200/800"
  },
  {
    id: "002",
    name: "SENTINEL-X",
    codename: "IRON_GIANT",
    description: "Heavy industrial defender. Features procedural limb destruction and adaptive defensive behavior based on player movement patterns.",
    stats: {
      complexity: "MEDIUM",
      threatLevel: "A-TIER",
      engine: ["UNREAL", "UNITY"]
    },
    packages: {
      assets: "HARD_SURFACE_MODULAR",
      logic: "PROCEDURAL_ANIMATION_LAYER",
      combat: "AREA_DENIAL / KINETIC_FORCE",
      lore: "FACTORY_WIP_REPORT_X.TXT"
    },
    image: "https://picsum.photos/seed/sentinel/1200/800"
  },
  {
    id: "003",
    name: "NIHIL",
    codename: "VOID_WEAVER",
    description: "Abstract horror entity. Nihil manipulates player camera and UI during combat. Best suited for psychological action titles.",
    stats: {
      complexity: "EXTREME",
      threatLevel: "OMEGA",
      engine: ["UNITY", "GODOT"]
    },
    packages: {
      assets: "PARTICLE_CLOUD_VFX",
      logic: "SHADERC_MANIPULATION",
      combat: "UI_DISTORTION / TELEPORT_STRIKE",
      lore: "UNKNOWN_ORIGIN_VOID_003.MD"
    },
    image: "https://picsum.photos/seed/void/1200/800"
  }
];
