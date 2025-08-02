import { useState, useEffect } from "react";
import { Element } from "@/lib/data";

interface CombinationAreaProps {
  selectedElements: (Element | null)[];
  onCombine: () => void;
  onReset: () => void;
}

// A single slot for an element with enhanced animations
const ElementSlot = ({
  element,
  index,
  isAnimating,
}: {
  element: Element | null;
  index: number;
  isAnimating: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (element) {
      setJustAdded(true);
      const timer = setTimeout(() => setJustAdded(false), 600);
      return () => clearTimeout(timer);
    }
  }, [element]);

  const slotNumber = index + 1;
  const bgColor = element ? element.color + "20" : "rgba(75, 85, 99, 0.3)";
  const borderColor = element ? element.color : "#4b5563";
  const glowColor = element ? element.color + "40" : "transparent";

  return (
    <div className="relative">
      {/* Slot Label */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-semibold">
        Element {slotNumber}
      </div>

      <div
        className={`
          relative w-full h-32 lg:h-36 border-2 border-dashed rounded-xl
          flex items-center justify-center transition-all duration-500 overflow-hidden
          ${element ? "border-solid shadow-lg" : ""}
          ${isHovered ? "scale-105" : ""}
          ${justAdded ? "animate-pulse" : ""}
          ${isAnimating ? "animate-bounce" : ""}
        `}
        style={{
          borderColor: borderColor,
          backgroundColor: bgColor,
          boxShadow: element ? `0 0 20px ${glowColor}` : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${borderColor} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        {element ? (
          <div className="relative text-center z-10">
            {/* Atomic Number */}
            <div className="absolute -top-2 -left-2 text-xs font-mono text-gray-400 bg-gray-800 rounded px-1">
              {element.atomicNumber}
            </div>

            {/* Element Symbol */}
            <div className="font-extrabold text-4xl lg:text-5xl text-white mb-1 drop-shadow-lg">
              {element.symbol}
            </div>

            {/* Element Name */}
            <div className="text-sm text-gray-200 font-medium">
              {element.name}
            </div>

            {/* Category Badge */}
            <div className="absolute -bottom-2 -right-2 text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
              {element.category}
            </div>

            {/* Alchemical Symbol if available */}
            {element.alchemicalSymbol && (
              <div className="absolute top-2 right-2 text-2xl opacity-70">
                {element.alchemicalSymbol}
              </div>
            )}

            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-20 animate-pulse"
              style={{ backgroundColor: element.color }}
            ></div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">⚪</div>
            <span className="text-sm">Empty Slot</span>
            <div className="text-xs mt-1 opacity-70">Select an element</div>
          </div>
        )}

        {/* Particle Effects */}
        {element && justAdded && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-ping"
                style={{
                  backgroundColor: element.color,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CombinationArea = ({
  selectedElements,
  onCombine,
  onReset,
}: CombinationAreaProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReactionHint, setShowReactionHint] = useState(false);

  const canCombine = selectedElements[0] && selectedElements[1];

  useEffect(() => {
    if (canCombine) {
      setShowReactionHint(true);
      const timer = setTimeout(() => setShowReactionHint(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowReactionHint(false);
    }
  }, [canCombine]);

  const handleCombine = () => {
    if (canCombine) {
      setIsAnimating(true);
      setTimeout(() => {
        onCombine();
        setIsAnimating(false);
      }, 1000);
    }
  };

  const getReactionPreview = () => {
    if (!canCombine) return null;

    const element1 = selectedElements[0]!;
    const element2 = selectedElements[1]!;

    return `${element1.symbol} + ${element2.symbol} → ?`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          <span className="text-3xl">🧪</span>
          Combine Elements
        </h2>

        {/* Reaction Preview */}
        {canCombine && (
          <div className="hidden sm:block">
            <div className="text-sm font-mono text-gray-300 bg-gray-800 px-3 py-1 rounded-lg border border-gray-600">
              {getReactionPreview()}
            </div>
          </div>
        )}
      </div>

      {/* Combination Slots */}
      <div className="relative">
        <div className="flex items-center gap-6">
          {/* First Element Slot */}
          <div className="flex-1">
            <ElementSlot
              element={selectedElements[0]}
              index={0}
              isAnimating={isAnimating}
            />
          </div>

          {/* Plus Symbol with Animation */}
          <div className="relative flex-shrink-0">
            <div
              className={`
              text-4xl font-bold text-gray-400 transition-all duration-500
              ${isAnimating ? "text-cyan-400 scale-125 animate-spin" : ""}
              ${canCombine ? "text-cyan-500" : ""}
            `}
            >
              +
            </div>

            {/* Energy Sparks */}
            {isAnimating && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 125}ms`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Second Element Slot */}
          <div className="flex-1">
            <ElementSlot
              element={selectedElements[1]}
              index={1}
              isAnimating={isAnimating}
            />
          </div>
        </div>

        {/* Reaction Hint */}
        {showReactionHint && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="bg-cyan-900 text-cyan-100 px-4 py-2 rounded-lg text-sm border border-cyan-600 shadow-lg">
              <div className="flex items-center gap-2">
                <span>✨</span>
                Ready to react!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleCombine}
          disabled={!canCombine || isAnimating}
          className={`
            w-full px-6 py-4 rounded-xl font-bold text-white transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-cyan-400/50 relative overflow-hidden
            ${
              canCombine && !isAnimating
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transform hover:scale-105 shadow-lg shadow-cyan-600/30"
                : "bg-gray-600 cursor-not-allowed"
            }
            ${isAnimating ? "animate-pulse" : ""}
          `}
        >
          {/* Button Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <span className="relative flex items-center justify-center gap-2">
            {isAnimating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Reacting...
              </>
            ) : (
              <>
                <span className="text-xl">⚗️</span>
                {canCombine ? "Combine Elements!" : "Select Two Elements"}
              </>
            )}
          </span>
        </button>

        <button
          onClick={onReset}
          className="w-full px-4 py-3 rounded-xl font-semibold text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200 border border-gray-600 hover:border-gray-500 backdrop-blur-sm"
        >
          <span className="flex items-center justify-center gap-2">
            <span>🔄</span>
            Reset & Try Again
          </span>
        </button>
      </div>

      {/* Instructions */}
      {!canCombine && (
        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-sm font-semibold text-cyan-400 mb-2">
            How to Use:
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>1. Select your first element from the periodic table above</li>
            <li>2. Choose a second element to react with</li>
            <li>3. Click &quot;Combine Elements&quot; to see the reaction!</li>
            <li>4. Watch the 3D animation and learn about the chemistry</li>
          </ul>
        </div>
      )}

      {/* Fun Tips */}
      {canCombine && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-600/30">
          <div className="text-xs text-purple-200 flex items-center gap-2">
            <span>💡</span>
            <span>
              Tip: Different element combinations create different types of
              bonds and reactions!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
