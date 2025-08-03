"use client";

import { useState, useEffect } from "react";
import { ElementSelector } from "@/components/lab/element-selector";
import { CombinationArea } from "@/components/lab/combination-area";
import { ResultDisplay } from "@/components/lab/result-display";
import { CanvasWrapper } from "@/scenes/canvas-wrapper";
import { elements, reactions, getRandomElement } from "@/lib/data";
import type { Element, Reaction } from "@/lib/data";

export default function LabPage() {
  // State for the two selected elements
  const [selectedElements, setSelectedElements] = useState<(Element | null)[]>([
    null,
    null,
  ]);
  // State for the outcome of the combination
  const [reactionResult, setReactionResult] = useState<
    Reaction | "fizzled" | null
  >(null);
  // State to pass the correct animation key to the 3D scene
  const [reactionKey, setReactionKey] = useState<string | null>(null);

  // UI enhancement states
  const [showWelcome, setShowWelcome] = useState(true);
  const [reactionCount, setReactionCount] = useState(0);
  const [discoveredReactions, setDiscoveredReactions] = useState<Set<string>>(
    new Set(),
  );
  const [showStats, setShowStats] = useState(false);

  // Initialize with welcome screen
  useEffect(() => {
    const hasVisited = localStorage.getItem("alchemyLabVisited");
    if (hasVisited) {
      setShowWelcome(false);
    }
  }, []);

  /**
   * Handles selecting an element from the list.
   * Adds the element to the next available slot.
   */
  const handleSelectElement = (element: Element) => {
    setSelectedElements((prev) => {
      if (!prev[0]) {
        return [element, null];
      }
      // Prevent selecting the same element twice
      if (!prev[1] && prev[0]?.symbol !== element.symbol) {
        return [prev[0], element];
      }
      // If both slots are full, replace the first one
      return [element, prev[1]];
    });
  };

  /**
   * Handles the 'Combine' button click.
   * Determines the reaction and updates the state.
   */
  const handleCombine = () => {
    if (selectedElements[0] && selectedElements[1]) {
      const symbols = [
        selectedElements[0].symbol,
        selectedElements[1].symbol,
      ].sort();
      const key = symbols.join("");
      const result = reactions[key] || "fizzled";

      setReactionResult(result);
      setReactionKey(typeof result === "object" ? key : null);
      setReactionCount((prev) => prev + 1);

      // Track discovered reactions
      if (typeof result === "object") {
        setDiscoveredReactions((prev) => new Set([...prev, key]));
      }

      // Save stats to localStorage
      localStorage.setItem("alchemyLabReactionCount", reactionCount.toString());
      localStorage.setItem(
        "alchemyLabDiscovered",
        JSON.stringify([...discoveredReactions]),
      );
    }
  };

  /**
   * Resets the application state to its initial values.
   */
  const handleReset = () => {
    setSelectedElements([null, null]);
    setReactionResult(null);
    setReactionKey(null);
  };

  /**
   * Generates a random element combination for experimentation
   */
  const handleRandomCombination = () => {
    const element1 = getRandomElement();
    let element2 = getRandomElement();

    // Ensure we don't get the same element twice
    while (element2.symbol === element1.symbol) {
      element2 = getRandomElement();
    }

    setSelectedElements([element1, element2]);
  };

  /**
   * Closes the welcome modal
   */
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("alchemyLabVisited", "true");
  };

  const totalReactions = Object.keys(reactions).length;
  const discoveryPercentage = Math.round(
    (discoveredReactions.size / totalReactions) * 100,
  );

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">⚗️</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to the Interactive Alchemy Lab!
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Discover the fascinating world of chemistry by combining
                elements and watching their reactions unfold in stunning 3D
                animations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-2xl mb-2">🧪</div>
                  <h3 className="font-semibold text-cyan-400">Experiment</h3>
                  <p className="text-gray-400">
                    Mix elements and discover new compounds
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-2xl mb-2">🎬</div>
                  <h3 className="font-semibold text-cyan-400">Watch</h3>
                  <p className="text-gray-400">
                    See reactions in beautiful 3D animations
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold text-cyan-400">Learn</h3>
                  <p className="text-gray-400">
                    Understand the science behind each reaction
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseWelcome}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-600/30"
              >
                Start Experimenting! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Header */}
        <header className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3b82f6 2px, transparent 2px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  Interactive Alchemy Lab
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Where ancient alchemy meets modern chemistry. Combine
                  elements, witness reactions, and explore the fundamental
                  building blocks of matter.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRandomCombination}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
                >
                  🎲 Random Mix
                </button>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-xl font-semibold transition-all duration-300 border border-gray-600 hover:border-gray-500"
                >
                  📊 Stats
                </button>
              </div>
            </div>

            {/* Stats Panel */}
            {showStats && (
              <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-slide-down">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                  Laboratory Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {reactionCount}
                    </div>
                    <div className="text-sm text-gray-400">Experiments</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {discoveredReactions.size}
                    </div>
                    <div className="text-sm text-gray-400">
                      Discovered Reactions
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {discoveryPercentage}%
                    </div>
                    <div className="text-sm text-gray-400">Discovery Rate</div>
                  </div>
                </div>
                {discoveryPercentage === 100 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-600/30 text-center">
                    <span className="text-yellow-400">
                      🏆 Congratulations! Master Alchemist Achieved!
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Left Panel - Element Selection */}
            <div className="xl:col-span-3 space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <ElementSelector selectElementAction={handleSelectElement} />
              </div>

              {/* 3D Visualization */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                    <span className="text-3xl">🌟</span>
                    3D Molecular Visualization
                  </h2>
                  {reactionResult && typeof reactionResult === "object" && (
                    <div className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                      {reactionResult.animation} animation
                    </div>
                  )}
                </div>
                <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800">
                  <CanvasWrapper reactionKey={reactionKey} />
                </div>
              </div>
            </div>

            {/* Right Panel - Controls and Results */}
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <CombinationArea
                  selectedElements={selectedElements}
                  onCombine={handleCombine}
                  onReset={handleReset}
                />
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <ResultDisplay result={reactionResult} />
              </div>
            </div>
          </div>

          {/* Quick Tips Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-600/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <span>💡</span>
              Quick Tips for Budding Alchemists
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/20">
                <h4 className="font-semibold text-blue-300 mb-2">
                  🔥 Reactive Combinations
                </h4>
                <p className="text-gray-300">
                  Try alkali metals (Li, Na, K) with halogens (F, Cl, Br) for
                  explosive reactions!
                </p>
              </div>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/20">
                <h4 className="font-semibold text-green-300 mb-2">
                  💧 Water Formation
                </h4>
                <p className="text-gray-300">
                  Hydrogen + Oxygen creates the most essential compound for life
                  on Earth.
                </p>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/20">
                <h4 className="font-semibold text-purple-300 mb-2">
                  ❌ Noble Gases
                </h4>
                <p className="text-gray-300">
                  Noble gases (He, Ne) rarely react - they&apos;re the
                  introverts of chemistry!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/50 border-t border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-400 mb-4">
              Explore the wonders of chemistry through interactive
              experimentation
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>⚛️ {Object.keys(elements).length} Elements Available</span>
              <span>🧪 {Object.keys(reactions).length} Possible Reactions</span>
              <span>🎬 Animated Molecular Visualization</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
