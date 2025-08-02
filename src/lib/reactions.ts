export interface Reaction {
  productName: string;
  productFormula: string;
  description: string;
  animation: string;
  type:
    | "synthesis"
    | "decomposition"
    | "single-replacement"
    | "double-replacement"
    | "combustion"
    | "acid-base"
    | "redox";
  balancedEquation: string;
  energyChange: "exothermic" | "endothermic";
  difficulty: "easy" | "moderate" | "hard" | "expert";
  realWorld: boolean;
  temperature?: number;
  pressure?: number;
  catalyst?: string;
  explanation?: string;
}

export const reactions: Record<string, Reaction> = {
  // Basic Formation Reactions
  HO: {
    productName: "Water",
    productFormula: "H₂O",
    description:
      "The universal solvent essential for all known life. Two hydrogen atoms bond with one oxygen atom.",
    animation: "water",
    type: "synthesis",
    balancedEquation: "2H₂ + O₂ → 2H₂O",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 298,
    pressure: 1,
  },

  ClNa: {
    productName: "Sodium Chloride (Table Salt)",
    productFormula: "NaCl",
    description:
      "A crystalline ionic compound essential for life. The sodium loses an electron to chlorine.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "2Na + Cl₂ → 2NaCl",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 298,
    pressure: 1,
  },

  CO: {
    productName: "Carbon Monoxide",
    productFormula: "CO",
    description:
      "A colorless, odorless toxic gas formed by incomplete combustion of carbon.",
    animation: "carbonMonoxide",
    type: "combustion",
    balancedEquation: "2C + O₂ → 2CO",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 973,
    pressure: 1,
  },

  CO2: {
    productName: "Carbon Dioxide",
    productFormula: "CO₂",
    description:
      "The gas we exhale and plants use for photosynthesis. Formed by complete combustion.",
    animation: "carbonDioxide",
    type: "combustion",
    balancedEquation: "C + O₂ → CO₂",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 298,
    pressure: 1,
  },

  HN: {
    productName: "Ammonia",
    productFormula: "NH₃",
    description:
      "A pungent gas essential for fertilizers. Produced industrially via the Haber process.",
    animation: "ammonia",
    type: "synthesis",
    balancedEquation: "N₂ + 3H₂ → 2NH₃",
    energyChange: "exothermic",
    difficulty: "hard",
    realWorld: true,
    temperature: 673,
    pressure: 200,
    catalyst: "Iron",
  },

  CH: {
    productName: "Methane",
    productFormula: "CH₄",
    description:
      "The simplest hydrocarbon and main component of natural gas. A potent greenhouse gas.",
    animation: "methane",
    type: "synthesis",
    balancedEquation: "C + 2H₂ → CH₄",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 573,
    pressure: 20,
    catalyst: "Nickel",
  },

  // Halide Formations
  BrK: {
    productName: "Potassium Bromide",
    productFormula: "KBr",
    description: "White crystalline salt used in photography and medicine.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "2K + Br₂ → 2KBr",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  CaF: {
    productName: "Calcium Fluoride",
    productFormula: "CaF₂",
    description: "Fluorite mineral, used in optics and steel production.",
    animation: "crystal",
    type: "synthesis",
    balancedEquation: "Ca + F₂ → CaF₂",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  // Oxide Formations
  MgO: {
    productName: "Magnesium Oxide",
    productFormula: "MgO",
    description:
      "Forms when magnesium burns with brilliant white light. Used in refractory materials.",
    animation: "magnesiumOxide",
    type: "combustion",
    balancedEquation: "2Mg + O₂ → 2MgO",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 923,
    pressure: 1,
  },

  AlO: {
    productName: "Aluminum Oxide",
    productFormula: "Al₂O₃",
    description:
      "Forms sapphires and rubies when pure. Used in abrasives and ceramics.",
    animation: "aluminumOxide",
    type: "synthesis",
    balancedEquation: "4Al + 3O₂ → 2Al₂O₃",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 1073,
    pressure: 1,
  },

  CaO: {
    productName: "Calcium Oxide (Quicklime)",
    productFormula: "CaO",
    description:
      "Used in cement and steel production. Reacts violently with water to form slaked lime.",
    animation: "calciumOxide",
    type: "combustion",
    balancedEquation: "2Ca + O₂ → 2CaO",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 1115,
    pressure: 1,
  },

  FeO: {
    productName: "Iron Oxide (Rust)",
    productFormula: "Fe₂O₃",
    description:
      "The reddish-brown compound that forms when iron corrodes in the presence of oxygen and water.",
    animation: "ironOxide",
    type: "redox",
    balancedEquation: "4Fe + 3O₂ → 2Fe₂O₃",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 298,
    pressure: 1,
  },

  CuO: {
    productName: "Copper Oxide",
    productFormula: "CuO",
    description:
      "Forms when copper is heated in air. First step toward the green patina on copper surfaces.",
    animation: "copperOxide",
    type: "redox",
    balancedEquation: "2Cu + O₂ → 2CuO",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 573,
    pressure: 1,
  },

  OSi: {
    productName: "Silicon Dioxide (Silica)",
    productFormula: "SiO₂",
    description:
      "The main component of sand, quartz, and glass. Forms beautiful crystal structures.",
    animation: "siliconDioxide",
    type: "synthesis",
    balancedEquation: "Si + O₂ → SiO₂",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 1687,
    pressure: 1,
  },

  // Sulfur Compounds
  HS: {
    productName: "Hydrogen Sulfide",
    productFormula: "H₂S",
    description:
      "A toxic gas with the smell of rotten eggs. Found in volcanic gases and swamps.",
    animation: "hydrogenSulfide",
    type: "synthesis",
    balancedEquation: "H₂ + S → H₂S",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 298,
    pressure: 1,
  },

  OS: {
    productName: "Sulfur Dioxide",
    productFormula: "SO₂",
    description:
      "A choking gas that causes acid rain. Produced by burning sulfur-containing fuels.",
    animation: "sulfurDioxide",
    type: "combustion",
    balancedEquation: "S + O₂ → SO₂",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 388,
    pressure: 1,
  },

  // Phosphorus Compounds
  OP: {
    productName: "Phosphorus Pentoxide",
    productFormula: "P₂O₅",
    description:
      "An extremely powerful dehydrating agent that absorbs water from the air.",
    animation: "phosphorusPentoxide",
    type: "combustion",
    balancedEquation: "4P + 5O₂ → 2P₂O₅",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 317,
    pressure: 1,
  },

  // Noble Gas Reactions (Impossible)
  HeO: {
    productName: "No Reaction",
    productFormula: "He + O",
    description:
      "This reaction cannot occur because helium is a noble gas with a complete electron shell.",
    animation: "impossible",
    type: "synthesis",
    balancedEquation: "He + O → No Reaction",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: false,
  },

  NeO: {
    productName: "No Reaction",
    productFormula: "Ne + O",
    description:
      "Neon, being a noble gas, does not form compounds under normal conditions.",
    animation: "impossible",
    type: "synthesis",
    balancedEquation: "Ne + O → No Reaction",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: false,
  },

  ArO: {
    productName: "No Reaction",
    productFormula: "Ar + O",
    description:
      "Argon is chemically inert and does not react with oxygen under normal conditions.",
    animation: "impossible",
    type: "synthesis",
    balancedEquation: "Ar + O → No Reaction",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: false,
  },

  // Advanced Compounds
  CaCl: {
    productName: "Calcium Chloride",
    productFormula: "CaCl₂",
    description:
      "Used for de-icing roads and as a desiccant. Highly soluble in water.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "Ca + Cl₂ → CaCl₂",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  MgCl: {
    productName: "Magnesium Chloride",
    productFormula: "MgCl₂",
    description: "Used in steelmaking and as a dietary supplement.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "Mg + Cl₂ → MgCl₂",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  // Metal Alloys
  AuAg: {
    productName: "Gold-Silver Alloy",
    productFormula: "Au-Ag",
    description:
      "These metals can form alloys but don't chemically react to form compounds.",
    animation: "alloy",
    type: "synthesis",
    balancedEquation: "Au + Ag → Au-Ag (alloy)",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: true,
  },

  CuZn: {
    productName: "Brass",
    productFormula: "Cu-Zn",
    description:
      "A golden-colored alloy of copper and zinc used in musical instruments and hardware.",
    animation: "alloy",
    type: "synthesis",
    balancedEquation: "Cu + Zn → CuZn (brass)",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: true,
  },

  // Advanced Organic-like Reactions
  CN: {
    productName: "Cyanide Ion",
    productFormula: "CN⁻",
    description:
      "Highly toxic ion formed from carbon and nitrogen. Blocks cellular respiration.",
    animation: "dangerous",
    type: "synthesis",
    balancedEquation: "C + N → CN⁻",
    energyChange: "endothermic",
    difficulty: "expert",
    realWorld: true,
    temperature: 2000,
    pressure: 1,
  },

  // Rare Earth Reactions
  LaO: {
    productName: "Lanthanum Oxide",
    productFormula: "La₂O₃",
    description: "White powder used in optical glasses and catalysts.",
    animation: "rareEarthOxide",
    type: "synthesis",
    balancedEquation: "4La + 3O₂ → 2La₂O₃",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
  },

  // Radioactive Reactions
  UO: {
    productName: "Uranium Oxide",
    productFormula: "UO₂",
    description:
      "Nuclear fuel used in reactors. Highly radioactive and regulated.",
    animation: "radioactive",
    type: "synthesis",
    balancedEquation: "U + O₂ → UO₂",
    energyChange: "exothermic",
    difficulty: "expert",
    realWorld: true,
    temperature: 1405,
    pressure: 1,
  },

  // Additional Salt Formations
  FLi: {
    productName: "Lithium Fluoride",
    productFormula: "LiF",
    description: "Used in molten salt reactors and specialized ceramics.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "2Li + F₂ → 2LiF",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  ClK: {
    productName: "Potassium Chloride",
    productFormula: "KCl",
    description: "Salt substitute and fertilizer. Essential for plant growth.",
    animation: "salt",
    type: "synthesis",
    balancedEquation: "2K + Cl₂ → 2KCl",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  // Nitrides
  BN: {
    productName: "Boron Nitride",
    productFormula: "BN",
    description: "Ultra-hard material sometimes called 'white graphite'.",
    animation: "crystal",
    type: "synthesis",
    balancedEquation: "B + N → BN",
    energyChange: "exothermic",
    difficulty: "hard",
    realWorld: true,
    temperature: 2300,
    pressure: 1,
  },

  // Carbides
  SiC: {
    productName: "Silicon Carbide",
    productFormula: "SiC",
    description: "Extremely hard abrasive known as carborundum.",
    animation: "crystal",
    type: "synthesis",
    balancedEquation: "Si + C → SiC",
    energyChange: "exothermic",
    difficulty: "hard",
    realWorld: true,
    temperature: 2200,
    pressure: 1,
  },

  // Intermetallics
  CuSn: {
    productName: "Bronze",
    productFormula: "Cu-Sn",
    description: "Historic alloy harder than copper, used in tools and art.",
    animation: "alloy",
    type: "synthesis",
    balancedEquation: "Cu + Sn → CuSn (bronze)",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: true,
  },

  FeFe: {
    productName: "Steel",
    productFormula: "Fe-C",
    description: "Iron-carbon alloy that built civilization.",
    animation: "alloy",
    type: "synthesis",
    balancedEquation: "Fe + C → Fe-C (steel)",
    energyChange: "endothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 1811,
    pressure: 1,
  },

  // Complex Oxides
  TiO: {
    productName: "Titanium Dioxide",
    productFormula: "TiO₂",
    description: "White pigment in paint and sunscreen.",
    animation: "titaniumOxide",
    type: "synthesis",
    balancedEquation: "Ti + O₂ → TiO₂",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
    temperature: 1941,
    pressure: 1,
  },

  ZnO: {
    productName: "Zinc Oxide",
    productFormula: "ZnO",
    description: "White pigment and UV blocker in sunscreen.",
    animation: "zincOxide",
    type: "synthesis",
    balancedEquation: "2Zn + O₂ → 2ZnO",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
    temperature: 693,
    pressure: 1,
  },
};

// Reaction-related utility functions
export const hasReaction = (element1: string, element2: string): boolean => {
  const key = [element1, element2].sort().join("");
  return key in reactions;
};

export const getReaction = (
  element1: string,
  element2: string,
): Reaction | undefined => {
  const key = [element1, element2].sort().join("");
  return reactions[key];
};

export const getDifficultyColor = (
  difficulty: Reaction["difficulty"],
): string => {
  switch (difficulty) {
    case "easy":
      return "#10B981";
    case "moderate":
      return "#F59E0B";
    case "hard":
      return "#EF4444";
    case "expert":
      return "#7C3AED";
    default:
      return "#6B7280";
  }
};

export const getEnergyChangeColor = (
  energyChange: Reaction["energyChange"],
): string => {
  switch (energyChange) {
    case "exothermic":
      return "#DC2626";
    case "endothermic":
      return "#2563EB";
    default:
      return "#6B7280";
  }
};

export const getReactionsByType = (
  type: Reaction["type"],
): Reaction[] => {
  return Object.values(reactions).filter((reaction) => reaction.type === type);
};

export const getReactionsByDifficulty = (
  difficulty: Reaction["difficulty"],
): Reaction[] => {
  return Object.values(reactions).filter(
    (reaction) => reaction.difficulty === difficulty,
  );
};

export const getRealWorldReactions = (): Reaction[] => {
  return Object.values(reactions).filter((reaction) => reaction.realWorld);
};

export const getExothermicReactions = (): Reaction[] => {
  return Object.values(reactions).filter(
    (reaction) => reaction.energyChange === "exothermic",
  );
};

export const getEndothermicReactions = (): Reaction[] => {
  return Object.values(reactions).filter(
    (reaction) => reaction.energyChange === "endothermic",
  );
};

export const getAllReactions = (): Reaction[] => {
  return Object.values(reactions);
};
