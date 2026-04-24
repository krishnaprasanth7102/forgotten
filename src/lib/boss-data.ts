
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
    description: "Multi-phase aerial combat entity utilizing high-frequency shadow bursts. Designed for vertical arenas with destructible environments. Adapts flight patterns based on player altitude.",
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
    contributorName: "VoidWalker",
    contributorId: "void_walker_01"
  },
  {
    name: "SENTINEL-X",
    codename: "IRON_GIANT",
    description: "Heavy industrial defender featuring procedural limb destruction and adaptive defensive behavior. Tracks player movement patterns and adjusts defensive stance in real time.",
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
    contributorName: "CyberNet",
    contributorId: "cybernet_42"
  },
  {
    name: "PHANTASM",
    codename: "NULL_SHADE",
    description: "Stealth-based assassin AI that phases in and out of visibility. Uses pathfinding to stalk the player from shadows, striking only when attack success probability exceeds 85%.",
    complexity: "HIGH",
    threatLevel: "A-TIER",
    engines: ["UNREAL", "GODOT"],
    imageUrl: "https://picsum.photos/seed/phantasm/1200/800",
    packages: {
      assets: "TRANSPARENT_SHADER / VFX_DISSOLVE",
      logic: "STEALTH_BEHAVIOR_TREE / PROBABILITY_CALC",
      combat: "BACKSTAB / SHADOW_STRIKE",
      lore: "NULL_SHADE_INCIDENT_REPORT.TXT"
    },
    version: "1.2.1",
    downloadCount: 3217,
    contributorName: "ShadowCoder",
    contributorId: "shadow_coder_99"
  },
  {
    name: "VOLCANIS",
    codename: "ASH_TYRANT",
    description: "Elemental fire colossus with terrain-altering abilities. Creates lava zones that persist as environmental hazards. Features a rage phase when health drops below 30% — attack speed doubles.",
    complexity: "EXTREME",
    threatLevel: "OMEGA",
    engines: ["UNREAL"],
    imageUrl: "https://picsum.photos/seed/volcanis/1200/800",
    packages: {
      assets: "EMISSIVE_PBR / PARTICLE_SYSTEM_LAVA",
      logic: "PHASE_TRANSITION_AI / TERRAIN_MODIFIER",
      combat: "GROUND_SLAM / LAVA_ERUPTION / RAGE_MODE",
      lore: "CLASSIFIED_ASH_TYRANT.ENC"
    },
    version: "3.0.0",
    downloadCount: 512,
    contributorName: "PyroDevX",
    contributorId: "pyro_devx_77"
  },
  {
    name: "CRAWLER-9",
    codename: "WEB_HORROR",
    description: "Low-complexity entry-level enemy AI. Spider-like movement with web-trap placement and ambush logic. Perfect for horror and survival game genres. Supports swarm coordination mode.",
    complexity: "LOW",
    threatLevel: "B-TIER",
    engines: ["UNITY", "GODOT", "UNREAL"],
    imageUrl: "https://picsum.photos/seed/crawler/1200/800",
    packages: {
      assets: "PROCEDURAL_LEGS / ORGANIC_TEXTURE",
      logic: "SWARM_COORDINATOR / WEB_PLACER",
      combat: "AMBUSH / WEB_TRAP / VENOM_BITE",
      lore: "SECTOR_9_CONTAINMENT_LOG.TXT"
    },
    version: "1.0.0",
    downloadCount: 6740,
    contributorName: "HorrorLabs",
    contributorId: "horror_labs_11"
  },
  {
    name: "SPECTRE-7",
    codename: "ECHO_MIND",
    description: "Psychic enemy that learns from the player's movement and attack history over 60 seconds. Predicts dodge directions and adjusts projectile trajectories to intercept with 70% accuracy.",
    complexity: "EXTREME",
    threatLevel: "S-TIER",
    engines: ["UNREAL", "UNITY"],
    imageUrl: "https://picsum.photos/seed/spectre7/1200/800",
    packages: {
      assets: "HOLOGRAPHIC_SHADER / PSYCHIC_VFX",
      logic: "PATTERN_LEARNING_AI / PREDICTION_ENGINE",
      combat: "GUIDED_PROJECTILE / MIND_LOCK / PHASE_DODGE",
      lore: "ECHO_MIND_RESEARCH_FILE.DAT"
    },
    version: "2.0.3",
    downloadCount: 1899,
    contributorName: "AIForge",
    contributorId: "ai_forge_55"
  },
  {
    name: "RAMPART",
    codename: "WALL_BREAKER",
    description: "Charge-based tank enemy designed for corridor and tight-space combat. Uses ricochet logic to bounce off walls and maintain pressure. Features shield-break mechanics on sustained damage.",
    complexity: "MEDIUM",
    threatLevel: "B-TIER",
    engines: ["UNITY", "GODOT"],
    imageUrl: "https://picsum.photos/seed/rampart/1200/800",
    packages: {
      assets: "HARD_BODY_MESH / IMPACT_DECALS",
      logic: "RICOCHET_PATHFINDER / SHIELD_STATE",
      combat: "CHARGE_ATTACK / WALL_BOUNCE / SHIELD_BASH",
      lore: "RAMPART_FIELD_TEST_V2.LOG"
    },
    version: "1.3.0",
    downloadCount: 4312,
    contributorName: "BulletDevs",
    contributorId: "bullet_devs_33"
  },
  {
    name: "NECROS",
    codename: "DEATH_WARDEN",
    description: "Necromancer-type summoner AI that raises fallen enemies as undead minions. Maintains a dynamic army up to 8 units. Prioritizes resurrection over direct combat while minions are alive.",
    complexity: "HIGH",
    threatLevel: "A-TIER",
    engines: ["UNITY", "UNREAL", "GODOT"],
    imageUrl: "https://picsum.photos/seed/necros/1200/800",
    packages: {
      assets: "DARK_MAGIC_VFX / SKELETON_RIG",
      logic: "SUMMONER_BEHAVIOR / ARMY_MANAGER",
      combat: "RESURRECTION / SOUL_DRAIN / DEATH_NOVA",
      lore: "NECROS_ORIGIN_SCROLL.TXT"
    },
    version: "1.1.2",
    downloadCount: 2788,
    contributorName: "DarkForge",
    contributorId: "dark_forge_88"
  },
  {
    name: "GLITCH-0",
    codename: "DATA_WRAITH",
    description: "Cyberpunk-style digital enemy that corrupts the player's HUD and creates visual distractions. Teleports by 'glitching' through walls. Unique mechanic: can split into 3 copies temporarily.",
    complexity: "MEDIUM",
    threatLevel: "C-TIER",
    engines: ["GODOT", "UNITY"],
    imageUrl: "https://picsum.photos/seed/glitch0/1200/800",
    packages: {
      assets: "GLITCH_SHADER / PIXEL_DISSOLVE_VFX",
      logic: "HUD_CORRUPTION / CLONE_SPLIT_SYSTEM",
      combat: "TELEPORT / CLONE_BURST / DATA_SPIKE",
      lore: "GLITCH_0_INCIDENT_LOG.BIN"
    },
    version: "0.9.5",
    downloadCount: 5501,
    contributorName: "GlitchByte",
    contributorId: "glitch_byte_21"
  },
  {
    name: "TITAN-ALPHA",
    codename: "PROJECT_COLOSSUS",
    description: "Massive multi-arena boss. Each phase unlocks a new attack pattern. Phase 1: ground slams. Phase 2: ranged missiles. Phase 3: AI-controlled minions + self-healing. Requires 3+ minutes to defeat.",
    complexity: "EXTREME",
    threatLevel: "OMEGA",
    engines: ["UNREAL"],
    imageUrl: "https://picsum.photos/seed/titanalpha/1200/800",
    packages: {
      assets: "COLOSSAL_MESH_LOD / DESTRUCTION_PHYSICS",
      logic: "MULTI_PHASE_CONTROLLER / SELF_HEAL_AI",
      combat: "GROUND_SLAM / MISSILE_BARRAGE / SUMMON_WAVE",
      lore: "PROJECT_COLOSSUS_CLASSIFIED.EXE"
    },
    version: "4.0.0",
    downloadCount: 987,
    contributorName: "TitanStudio",
    contributorId: "titan_studio_07"
  }
];
