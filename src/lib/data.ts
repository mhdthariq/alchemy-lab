// Barrel export file - re-exports everything from elements.ts and reactions.ts
// This maintains backward compatibility while keeping the code organized

// Export all element-related types and functions
export type { Element } from "./elements";
export {
  elements,
  getElementsByCategory,
  getRandomElement,
  getElementBySymbol,
  getAllElements,
  getPeriodElements,
  getGroupElements,
} from "./elements";

// Export all reaction-related types and functions
export type { Reaction } from "./reactions";
export {
  reactions,
  hasReaction,
  getReaction,
  getDifficultyColor,
  getEnergyChangeColor,
  getReactionsByType,
  getReactionsByDifficulty,
  getRealWorldReactions,
  getExothermicReactions,
  getEndothermicReactions,
  getAllReactions,
} from "./reactions";
