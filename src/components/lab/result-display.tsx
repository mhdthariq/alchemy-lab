import { Reaction, getDifficultyColor, getEnergyChangeColor } from "@/lib/data";

interface ResultDisplayProps {
  result: Reaction | "fizzled" | null;
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const renderReactionDetails = (reaction: Reaction) => (
    <div className="space-y-4">
      {/* Product Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-cyan-300 mb-1">
          {reaction.productName}
        </h3>
        <div className="text-3xl font-mono text-white bg-gray-800 rounded-lg px-4 py-2 inline-block border border-gray-600">
          {reaction.productFormula}
        </div>
      </div>

      {/* Reaction Type Badge */}
      <div className="flex justify-center">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
          {reaction.type.charAt(0).toUpperCase() +
            reaction.type.slice(1).replace("-", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-center leading-relaxed">
        {reaction.description}
      </p>

      {/* Balanced Equation */}
      <div className="bg-gray-800/70 rounded-lg p-3 border border-gray-600">
        <h4 className="text-sm font-semibold text-cyan-400 mb-2">
          Balanced Equation:
        </h4>
        <div className="text-center font-mono text-lg text-white">
          {reaction.balancedEquation}
        </div>
      </div>

      {/* Reaction Properties */}
      <div className="grid grid-cols-2 gap-3">
        {/* Energy Change */}
        <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-600">
          <div className="text-xs text-gray-400 mb-1">Energy Change</div>
          <div
            className="font-semibold text-sm px-2 py-1 rounded"
            style={{
              backgroundColor:
                getEnergyChangeColor(reaction.energyChange) + "30",
              color: getEnergyChangeColor(reaction.energyChange),
            }}
          >
            {reaction.energyChange === "exothermic"
              ? "🔥 Exothermic"
              : "❄️ Endothermic"}
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-600">
          <div className="text-xs text-gray-400 mb-1">Difficulty</div>
          <div
            className="font-semibold text-sm px-2 py-1 rounded"
            style={{
              backgroundColor: getDifficultyColor(reaction.difficulty) + "30",
              color: getDifficultyColor(reaction.difficulty),
            }}
          >
            {reaction.difficulty.charAt(0).toUpperCase() +
              reaction.difficulty.slice(1)}
          </div>
        </div>
      </div>

      {/* Real World Status */}
      <div className="text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            reaction.realWorld
              ? "bg-green-600/20 text-green-400 border border-green-600/30"
              : "bg-red-600/20 text-red-400 border border-red-600/30"
          }`}
        >
          <span className="text-base">{reaction.realWorld ? "✅" : "❌"}</span>
          {reaction.realWorld ? "Occurs in Nature" : "Theoretical/Impossible"}
        </div>
      </div>

      {/* Explanation for impossible reactions */}
      {reaction.explanation && (
        <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
          <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            Why This Doesn&apos;t Work:
          </h4>
          <p className="text-amber-200 text-sm leading-relaxed">
            {reaction.explanation}
          </p>
        </div>
      )}

      {/* Fun Facts or Additional Info */}
      {reaction.realWorld && (
        <div className="bg-cyan-900/20 border border-cyan-600/30 rounded-lg p-4">
          <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <span>🧪</span>
            Did You Know?
          </h4>
          <p className="text-cyan-200 text-sm leading-relaxed">
            {getInterestingFact(reaction)}
          </p>
        </div>
      )}
    </div>
  );

  const renderFizzled = () => (
    <div className="text-center space-y-4 animate-pulse">
      <div className="text-6xl mb-4">💨</div>
      <h3 className="text-2xl font-bold text-yellow-400">Reaction Fizzled!</h3>
      <p className="text-yellow-300 mb-4">
        These elements don&apos;t react under normal conditions.
      </p>
      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
        <p className="text-yellow-200 text-sm">
          <strong>💡 Tip:</strong> Try combining reactive metals with nonmetals,
          or elements that can share or transfer electrons easily!
        </p>
      </div>
      <div className="text-sm text-gray-400">
        Experiment with different combinations to discover new reactions!
      </div>
    </div>
  );

  const renderWaiting = () => (
    <div className="text-center space-y-4">
      <div className="text-6xl mb-4 animate-bounce">⚗️</div>
      <h3 className="text-xl font-semibold text-gray-400">
        Ready for Alchemy!
      </h3>
      <p className="text-gray-500">
        Select two elements and click &quot;Combine&quot; to see what happens.
      </p>
      <div className="flex justify-center space-x-8 text-sm text-gray-500 mt-6">
        <div className="text-center">
          <div className="text-2xl mb-1">🔥</div>
          <div>Exothermic</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">❄️</div>
          <div>Endothermic</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">⚡</div>
          <div>Energetic</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
        <span className="text-3xl">🧬</span>
        Reaction Result
      </h2>

      <div className="bg-gray-900/70 min-h-[300px] rounded-xl flex items-center justify-center p-6 border border-gray-700 backdrop-blur-sm">
        {!result && renderWaiting()}
        {result === "fizzled" && renderFizzled()}
        {result && typeof result === "object" && renderReactionDetails(result)}
      </div>
    </div>
  );
};

// Helper function to provide interesting facts about reactions
function getInterestingFact(reaction: Reaction): string {
  const facts: Record<string, string> = {
    Water:
      "Water molecules are polar, making them excellent solvents. A single drop contains about 1.67 × 10²¹ molecules!",
    "Sodium Chloride (Table Salt)":
      "Salt has been so valuable throughout history that Roman soldiers were sometimes paid in salt, giving us the word 'salary'!",
    "Carbon Monoxide":
      "CO binds to hemoglobin 200 times more readily than oxygen, which is why it's so dangerous in enclosed spaces.",
    "Carbon Dioxide":
      "Plants absorb about 120 billion tons of CO₂ annually through photosynthesis, helping regulate Earth's climate.",
    Ammonia:
      "The Haber process for making ammonia feeds about half the world's population by enabling fertilizer production.",
    Methane:
      "Methane is 25 times more potent as a greenhouse gas than CO₂, but it breaks down much faster in the atmosphere.",
    "Iron Oxide (Rust)":
      "The red color of Mars comes from iron oxide on its surface. Rust on Earth costs billions of dollars annually in maintenance!",
    "Calcium Oxide (Quicklime)":
      "When water is added to quicklime, it releases so much heat that it can boil the water and cause burns.",
    "Magnesium Oxide":
      "Magnesium burns so brightly (3100°C) that it was once used in camera flash bulbs and still lights up fireworks!",
  };

  return (
    facts[reaction.productName] ||
    "This reaction demonstrates the fascinating world of chemical bonding and molecular interactions!"
  );
}
