
export type Boss = {
  id: string;
  name: string;
  codename: string;
  description: string;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  threatLevel: 'C-TIER' | 'B-TIER' | 'A-TIER' | 'S-TIER' | 'OMEGA';
  engines: string[];
  imageUrl: string;
  githubRepo?: string;
  packages: {
    assets: string;
    logic: string;
    combat: string;
    lore: string;
  };
  contributorId: string;
  contributorName: string;
  downloadCount: number;
  version: string;
  createdAt?: any;
};

export const SEED_BOSSES: Partial<Boss>[] = [
  {
    name: "MALPHAS",
    codename: "VOID_WING",
    description: "Multi-phase aerial combat entity utilizing high-frequency shadow bursts. Designed for vertical arenas with destructible environments.",
    complexity: "HIGH",
    threatLevel: "S-TIER",
    engines: ["UNITY", "UNREAL", "GODOT"],
    imageUrl: "https://picsum.photos/seed/malphas/1200/800",
    packages: {
      assets: "4K_PBR_MAPS / 128k_POLYS",
      logic: "C#_BEHAVIOR_TREE / C++_COMPONENT",
      combat: "MELEE_AOE / RANGED_PROJECTILE",
      lore: "EXTRACTED_FILE_MALPHAS.LOG"
    },
    version: "1.0.4",
    downloadCount: 1204,
    contributorName: "VoidWalker"
  },
  {
    name: "SENTINEL-X",
    codename: "IRON_GIANT",
    description: "Heavy industrial defender. Features procedural limb destruction and adaptive defensive behavior based on player movement patterns.",
    complexity: "MEDIUM",
    threatLevel: "A-TIER",
    engines: ["UNREAL", "UNITY"],
    imageUrl: "https://picsum.photos/seed/sentinel/1200/800",
    packages: {
      assets: "HARD_SURFACE_MODULAR",
      logic: "PROCEDURAL_ANIMATION_LAYER",
      combat: "AREA_DENIAL / KINETIC_FORCE",
      lore: "FACTORY_WIP_REPORT_X.TXT"
    },
    version: "2.1.0",
    downloadCount: 8942,
    contributorName: "CyberNet"
  }
];
