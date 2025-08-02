export interface Element {
  name: string;
  symbol: string;
  atomicNumber: number;
  color: string; // Hex color for the 3D sphere material
  radius: number; // Relative radius for the 3D sphere
  category:
    | "metal"
    | "nonmetal"
    | "metalloid"
    | "noble-gas"
    | "alkali"
    | "alkaline-earth"
    | "halogen"
    | "transition-metal";
  description: string;
  discovered?: string; // Year or era discovered
  alchemicalSymbol?: string; // Traditional alchemical symbol
}

export interface Reaction {
  productName: string;
  productFormula: string;
  description: string;
  animation: string; // A key to identify which animation function to call
  type:
    | "synthesis"
    | "decomposition"
    | "single-replacement"
    | "double-replacement"
    | "combustion"
    | "acid-base"
    | "precipitation"
    | "redox";
  balancedEquation: string;
  energyChange: "exothermic" | "endothermic";
  difficulty: "easy" | "moderate" | "hard";
  realWorld: boolean; // Whether this reaction occurs in real life
  explanation?: string; // For impossible reactions
}

// A record of all available elements, keyed by their symbol for easy lookup.
export const elements: Record<string, Element> = {
  // Basic Elements - The Fundamentals
  H: {
    name: "Hydrogen",
    symbol: "H",
    atomicNumber: 1,
    color: "#FFFFFF",
    radius: 0.5,
    category: "nonmetal",
    description:
      "The lightest and most abundant element in the universe. Essential for water and organic compounds.",
    discovered: "1766",
    alchemicalSymbol: "🜄",
  },
  He: {
    name: "Helium",
    symbol: "He",
    atomicNumber: 2,
    color: "#D9FFFF",
    radius: 0.6,
    category: "noble-gas",
    description:
      "A noble gas that makes your voice squeaky. Used in balloons and as a coolant.",
    discovered: "1895",
  },
  C: {
    name: "Carbon",
    symbol: "C",
    atomicNumber: 6,
    color: "#444444",
    radius: 0.7,
    category: "nonmetal",
    description:
      "The basis of all organic life. Forms diamonds, graphite, and countless compounds.",
    discovered: "Ancient",
    alchemicalSymbol: "🜁",
  },
  N: {
    name: "Nitrogen",
    symbol: "N",
    atomicNumber: 7,
    color: "#3050F8",
    radius: 0.7,
    category: "nonmetal",
    description:
      "Makes up 78% of Earth's atmosphere. Essential for proteins and DNA.",
    discovered: "1772",
  },
  O: {
    name: "Oxygen",
    symbol: "O",
    atomicNumber: 8,
    color: "#FF0D0D",
    radius: 0.8,
    category: "nonmetal",
    description:
      "Essential for respiration and combustion. Makes up 21% of Earth's atmosphere.",
    discovered: "1774",
    alchemicalSymbol: "🜃",
  },
  F: {
    name: "Fluorine",
    symbol: "F",
    atomicNumber: 9,
    color: "#90E050",
    radius: 0.6,
    category: "halogen",
    description: "The most electronegative element. Highly reactive and toxic.",
    discovered: "1886",
  },
  Ne: {
    name: "Neon",
    symbol: "Ne",
    atomicNumber: 10,
    color: "#B3E3F5",
    radius: 0.7,
    category: "noble-gas",
    description:
      "A noble gas famous for its bright orange-red glow in neon signs.",
    discovered: "1898",
  },

  // Alkali Metals - The Reactive Ones
  Li: {
    name: "Lithium",
    symbol: "Li",
    atomicNumber: 3,
    color: "#CC80FF",
    radius: 1.3,
    category: "alkali",
    description:
      "The lightest metal. Used in batteries and mood-stabilizing medications.",
    discovered: "1817",
  },
  Na: {
    name: "Sodium",
    symbol: "Na",
    atomicNumber: 11,
    color: "#AB5CF2",
    radius: 1.5,
    category: "alkali",
    description:
      "Highly reactive metal that explodes in water. Essential for nerve function.",
    discovered: "1807",
    alchemicalSymbol: "🜔",
  },
  K: {
    name: "Potassium",
    symbol: "K",
    atomicNumber: 19,
    color: "#8F40D4",
    radius: 2.0,
    category: "alkali",
    description:
      "Essential for plant growth and human health. Burns with a violet flame.",
    discovered: "1807",
  },

  // Alkaline Earth Metals
  Mg: {
    name: "Magnesium",
    symbol: "Mg",
    atomicNumber: 12,
    color: "#8AFF00",
    radius: 1.4,
    category: "alkaline-earth",
    description:
      "Burns with a brilliant white light. Essential for chlorophyll in plants.",
    discovered: "1755",
  },
  Ca: {
    name: "Calcium",
    symbol: "Ca",
    atomicNumber: 20,
    color: "#3DFF00",
    radius: 1.7,
    category: "alkaline-earth",
    description:
      "Essential for bones and teeth. Makes water 'hard' and enables muscle contractions.",
    discovered: "1808",
  },

  // Halogens - The Salt Formers
  Cl: {
    name: "Chlorine",
    symbol: "Cl",
    atomicNumber: 17,
    color: "#1FF01F",
    radius: 1.0,
    category: "halogen",
    description:
      "A toxic yellow-green gas used for water purification and bleaching.",
    discovered: "1774",
  },
  Br: {
    name: "Bromine",
    symbol: "Br",
    atomicNumber: 35,
    color: "#A62929",
    radius: 1.1,
    category: "halogen",
    description:
      "The only nonmetal that's liquid at room temperature. Has a strong, unpleasant odor.",
    discovered: "1826",
  },
  I: {
    name: "Iodine",
    symbol: "I",
    atomicNumber: 53,
    color: "#940094",
    radius: 1.3,
    category: "halogen",
    description:
      "Essential for thyroid function. Produces beautiful purple vapor when heated.",
    discovered: "1811",
  },

  // Transition Metals - The Versatile Ones
  Fe: {
    name: "Iron",
    symbol: "Fe",
    atomicNumber: 26,
    color: "#E06633",
    radius: 1.2,
    category: "transition-metal",
    description:
      "The most common metal on Earth. Essential for blood and steel production.",
    discovered: "Ancient",
    alchemicalSymbol: "♂",
  },
  Cu: {
    name: "Copper",
    symbol: "Cu",
    atomicNumber: 29,
    color: "#C88033",
    radius: 1.3,
    category: "transition-metal",
    description:
      "Excellent conductor of electricity. Turns green when oxidized (Statue of Liberty).",
    discovered: "Ancient",
    alchemicalSymbol: "♀",
  },
  Zn: {
    name: "Zinc",
    symbol: "Zn",
    atomicNumber: 30,
    color: "#7D80B0",
    radius: 1.3,
    category: "transition-metal",
    description:
      "Used to galvanize steel and in batteries. Essential for immune function.",
    discovered: "Ancient",
  },
  Ag: {
    name: "Silver",
    symbol: "Ag",
    atomicNumber: 47,
    color: "#C0C0C0",
    radius: 1.4,
    category: "transition-metal",
    description:
      "The best conductor of electricity. Has natural antibacterial properties.",
    discovered: "Ancient",
    alchemicalSymbol: "☽",
  },
  Au: {
    name: "Gold",
    symbol: "Au",
    atomicNumber: 79,
    color: "#FFD123",
    radius: 1.4,
    category: "transition-metal",
    description:
      "The most noble of metals. Doesn't tarnish and has been valued throughout history.",
    discovered: "Ancient",
    alchemicalSymbol: "☉",
  },

  // Metalloids - The In-Between Elements
  Si: {
    name: "Silicon",
    symbol: "Si",
    atomicNumber: 14,
    color: "#F0C8A0",
    radius: 1.1,
    category: "metalloid",
    description:
      "The foundation of computer chips and glass. Second most abundant element in Earth's crust.",
    discovered: "1824",
  },

  // Other Important Elements
  S: {
    name: "Sulfur",
    symbol: "S",
    atomicNumber: 16,
    color: "#FFFF30",
    radius: 1.0,
    category: "nonmetal",
    description:
      "Known since ancient times. Essential for proteins and has a distinctive rotten egg smell.",
    discovered: "Ancient",
    alchemicalSymbol: "🜍",
  },
  P: {
    name: "Phosphorus",
    symbol: "P",
    atomicNumber: 15,
    color: "#FF8000",
    radius: 1.0,
    category: "nonmetal",
    description:
      "Essential for DNA, bones, and energy storage in cells. Can glow in the dark.",
    discovered: "1669",
  },
  Al: {
    name: "Aluminum",
    symbol: "Al",
    atomicNumber: 13,
    color: "#BFA6A6",
    radius: 1.2,
    category: "metal",
    description:
      "Lightweight metal used in aircraft and cans. Most abundant metal in Earth's crust.",
    discovered: "1825",
  },
  Pb: {
    name: "Lead",
    symbol: "Pb",
    atomicNumber: 82,
    color: "#575961",
    radius: 1.8,
    category: "metal",
    description:
      "Dense, toxic metal once used in paint and gasoline. Alchemists' symbol for time.",
    discovered: "Ancient",
    alchemicalSymbol: "♄",
  },
  Hg: {
    name: "Mercury",
    symbol: "Hg",
    atomicNumber: 80,
    color: "#B8B8D0",
    radius: 1.5,
    category: "transition-metal",
    description:
      "The only metal that's liquid at room temperature. Highly toxic but fascinating.",
    discovered: "Ancient",
    alchemicalSymbol: "☿",
  },
};

// Defines the possible reactions. The key is a string of the two reactant symbols,
// sorted alphabetically and concatenated (e.g., 'Cl' + 'Na' becomes 'ClNa').
export const reactions: Record<string, Reaction> = {
  // Water Formation - The Classic
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
  },

  // Salt Formation - Ionic Bonding
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
  },

  // Carbon Monoxide - Incomplete Combustion
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
  },

  // Carbon Dioxide - Complete Combustion
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
  },

  // Ammonia - Industrial Process
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
  },

  // Methane - Simplest Hydrocarbon
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
  },

  // Hydrogen Sulfide - Rotten Egg Gas
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
  },

  // Sulfur Dioxide - Acid Rain Precursor
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
  },

  // Magnesium Oxide - Brilliant White Burn
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
  },

  // Calcium Oxide - Quicklime
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
  },

  // Lithium Fluoride - Ionic Crystal
  FLi: {
    productName: "Lithium Fluoride",
    productFormula: "LiF",
    description:
      "The most ionic of all compounds. Has an extremely high melting point.",
    animation: "lithiumFluoride",
    type: "synthesis",
    balancedEquation: "2Li + F₂ → 2LiF",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
  },

  // Potassium Chloride - Salt Substitute
  ClK: {
    productName: "Potassium Chloride",
    productFormula: "KCl",
    description:
      "Used as a salt substitute and fertilizer. Essential for nerve and muscle function.",
    animation: "potassiumChloride",
    type: "synthesis",
    balancedEquation: "2K + Cl₂ → 2KCl",
    energyChange: "exothermic",
    difficulty: "easy",
    realWorld: true,
  },

  // Iron Oxide - Rust
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
  },

  // Copper Oxide - Green Patina Precursor
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
  },

  // Silicon Dioxide - Quartz/Glass
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
  },

  // Aluminum Oxide - Sapphire/Ruby
  AlO: {
    productName: "Aluminum Oxide (Alumina)",
    productFormula: "Al₂O₃",
    description:
      "Forms sapphires and rubies when pure. Used in abrasives and ceramics.",
    animation: "aluminumOxide",
    type: "synthesis",
    balancedEquation: "4Al + 3O₂ → 2Al₂O₃",
    energyChange: "exothermic",
    difficulty: "moderate",
    realWorld: true,
  },

  // Phosphorus Pentoxide - Dehydrating Agent
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
  },

  // Noble Gas "Reactions" - Educational Examples
  HeO: {
    productName: "Impossible Reaction",
    productFormula: "No Product",
    description:
      "This reaction cannot occur because helium is a noble gas with a complete electron shell.",
    animation: "impossible",
    type: "synthesis",
    balancedEquation: "He + O → No Reaction",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: false,
    explanation:
      "Noble gases like helium are chemically inert because they have complete outer electron shells. They don't need to gain, lose, or share electrons, making them extremely unreactive under normal conditions.",
  },

  NeO: {
    productName: "Impossible Reaction",
    productFormula: "No Product",
    description:
      "Neon, being a noble gas, does not form compounds under normal conditions.",
    animation: "impossible",
    type: "synthesis",
    balancedEquation: "Ne + O → No Reaction",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: false,
    explanation:
      "Neon has a complete octet of electrons in its outermost shell, making it chemically stable and unreactive. It's one of the most inert elements on the periodic table.",
  },

  // Incompatible Combinations
  AuAg: {
    productName: "Alloy Formation",
    productFormula: "Au-Ag Alloy",
    description:
      "These metals can form alloys but don't chemically react to form compounds.",
    animation: "alloy",
    type: "synthesis",
    balancedEquation: "Au + Ag → Au-Ag (mixture)",
    energyChange: "endothermic",
    difficulty: "easy",
    realWorld: true,
    explanation:
      "Gold and silver can form alloys (mixtures) but don't form true chemical compounds. The resulting material has properties between those of pure gold and silver.",
  },
};

// Helper function to get elements by category
export const getElementsByCategory = (
  category: Element["category"],
): Element[] => {
  return Object.values(elements).filter(
    (element) => element.category === category,
  );
};

// Helper function to get random element
export const getRandomElement = (): Element => {
  const elementKeys = Object.keys(elements);
  const randomKey = elementKeys[Math.floor(Math.random() * elementKeys.length)];
  return elements[randomKey];
};

// Helper function to check if a reaction exists
export const hasReaction = (element1: string, element2: string): boolean => {
  const key = [element1, element2].sort().join("");
  return key in reactions;
};

// Helper function to get reaction difficulty color
export const getDifficultyColor = (
  difficulty: Reaction["difficulty"],
): string => {
  switch (difficulty) {
    case "easy":
      return "#10B981"; // green
    case "moderate":
      return "#F59E0B"; // yellow
    case "hard":
      return "#EF4444"; // red
    default:
      return "#6B7280"; // gray
  }
};

// Helper function to get energy change color
export const getEnergyChangeColor = (
  energyChange: Reaction["energyChange"],
): string => {
  switch (energyChange) {
    case "exothermic":
      return "#DC2626"; // red (hot)
    case "endothermic":
      return "#2563EB"; // blue (cold)
    default:
      return "#6B7280"; // gray
  }
};
