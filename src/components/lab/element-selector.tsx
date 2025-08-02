"use client";

import { useState } from "react";
import { Element, getAllElements, getElementsByCategory } from "@/lib/data";

interface ElementSelectorProps {
  onSelect: (element: Element) => void;
}

const categoryColors: Record<Element["category"], string> = {
  alkali: "from-purple-500 to-purple-700",
  "alkaline-earth": "from-green-500 to-green-700",
  "transition-metal": "from-orange-500 to-orange-700",
  "post-transition-metal": "from-gray-500 to-gray-700",
  metalloid: "from-yellow-500 to-yellow-700",
  nonmetal: "from-blue-500 to-blue-700",
  halogen: "from-teal-500 to-teal-700",
  "noble-gas": "from-indigo-500 to-indigo-700",
  lanthanide: "from-pink-500 to-pink-700",
  actinide: "from-red-500 to-red-700",
};

const categoryNames: Record<Element["category"], string> = {
  alkali: "Alkali Metals",
  "alkaline-earth": "Alkaline Earth",
  "transition-metal": "Transition Metals",
  "post-transition-metal": "Post-Transition Metals",
  metalloid: "Metalloids",
  nonmetal: "Nonmetals",
  halogen: "Halogens",
  "noble-gas": "Noble Gases",
  lanthanide: "Lanthanides",
  actinide: "Actinides",
};

// Periodic table layout positions
const getElementPosition = (element: Element): { row: number; col: number } => {
  const period = element.period;
  const group = element.group || 0;

  // Special handling for lanthanides and actinides
  if (element.category === "lanthanide") {
    return { row: 8, col: element.atomicNumber - 54 }; // Row 8 starting from La
  }
  if (element.category === "actinide") {
    return { row: 9, col: element.atomicNumber - 86 }; // Row 9 starting from Ac
  }

  return { row: period, col: group };
};

export const ElementSelector = ({ onSelect }: ElementSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const allElements = getAllElements();

  const filteredElements = allElements.filter((element) => {
    const matchesCategory =
      !selectedCategory || element.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(
    new Set(allElements.map((el) => el.category)),
  ) as Element["category"][];

  // Create periodic table grid
  const createPeriodicTable = () => {
    const table: (Element | null)[][] = Array(10)
      .fill(null)
      .map(() => Array(18).fill(null));

    allElements.forEach((element) => {
      const pos = getElementPosition(element);
      if (pos.row <= 9 && pos.col <= 18) {
        table[pos.row - 1][pos.col - 1] = element;
      }
    });

    return table;
  };

  const periodicTable = createPeriodicTable();

  const renderPeriodicTable = () => (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px] space-y-1">
        {periodicTable.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1 justify-center">
            {row.map((element, colIndex) => {
              if (!element) {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-12 h-12 sm:w-14 sm:h-14"
                  />
                );
              }

              const isFiltered = filteredElements.includes(element);
              const opacity =
                selectedCategory && !isFiltered ? "opacity-30" : "opacity-100";

              return (
                <div key={element.symbol} className="relative">
                  <button
                    onClick={() => onSelect(element)}
                    onMouseEnter={() => setHoveredElement(element)}
                    onMouseLeave={() => setHoveredElement(null)}
                    disabled={!isFiltered}
                    className={`group relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/50 backdrop-blur-sm rounded border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${opacity} ${!isFiltered ? "cursor-not-allowed" : ""}`}
                    style={{
                      background: `linear-gradient(135deg, ${element.color}20, ${element.color}10)`,
                    }}
                  >
                    {/* Atomic Number */}
                    <div className="absolute top-0 left-1 text-[8px] text-gray-400 font-mono">
                      {element.atomicNumber}
                    </div>

                    {/* Element Symbol */}
                    <div className="font-extrabold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors flex items-center justify-center h-full">
                      {element.symbol}
                    </div>

                    {/* Category Indicator */}
                    <div
                      className={`absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[element.category]}`}
                    />

                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: element.color }}
                    />
                  </button>

                  {/* Element Tooltip */}
                  {hoveredElement === element && (
                    <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                      <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-xl max-w-xs">
                        <h3 className="text-sm font-bold text-white mb-1">
                          {hoveredElement.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-1">
                          Atomic Number: {hoveredElement.atomicNumber}
                        </p>
                        <p className="text-xs text-gray-400 mb-1">
                          Atomic Mass: {hoveredElement.atomicMass}
                        </p>
                        <p className="text-xs text-gray-300 mb-2">
                          {hoveredElement.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-white bg-gradient-to-r ${categoryColors[hoveredElement.category]}`}
                          >
                            {categoryNames[hoveredElement.category]}
                          </span>
                          <span className="text-gray-400">
                            {hoveredElement.discovered}
                          </span>
                        </div>
                        {/* Arrow pointing down to the element */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                          <div className="border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Period and Group Labels */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>
          Periods (rows) represent electron shells • Groups (columns) represent
          similar properties
        </p>
        <p className="mt-1">
          Lanthanides and Actinides shown in separate rows below main table
        </p>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {filteredElements.map((element) => (
        <div key={element.symbol} className="relative">
          <button
            onClick={() => onSelect(element)}
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
            className="group w-full p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            style={{
              background: `linear-gradient(135deg, ${element.color}20, ${element.color}10)`,
            }}
          >
            {/* Element Symbol */}
            <div className="font-extrabold text-2xl md:text-3xl text-white mb-1 group-hover:text-cyan-300 transition-colors">
              {element.symbol}
            </div>

            {/* Atomic Number */}
            <div className="text-xs text-gray-400 font-mono mb-1">
              {element.atomicNumber}
            </div>

            {/* Element Name */}
            <div className="text-xs text-gray-300 truncate">{element.name}</div>

            {/* Category Indicator */}
            <div
              className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[element.category]}`}
            />

            {/* Hover Glow Effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: element.color }}
            />
          </button>

          {/* Element Tooltip */}
          {hoveredElement === element && (
            <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
              <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-xl max-w-sm">
                <h3 className="text-lg font-bold text-white mb-2">
                  {hoveredElement.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Atomic Number: {hoveredElement.atomicNumber}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  {hoveredElement.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-full text-white bg-gradient-to-r ${categoryColors[hoveredElement.category]}`}
                  >
                    {categoryNames[hoveredElement.category]}
                  </span>
                  {hoveredElement.discovered && (
                    <span className="text-gray-400">
                      Discovered: {hoveredElement.discovered}
                    </span>
                  )}
                </div>
                {/* Arrow pointing down to the element */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-600"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          <span className="text-3xl">⚗️</span>
          Periodic Table of Elements
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />

          <div className="flex bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-cyan-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !selectedCategory
              ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All Elements ({allElements.length})
        </button>
        {categories.map((category) => {
          const count = getElementsByCategory(category).length;
          return (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category,
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white shadow-lg`
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {categoryNames[category as keyof typeof categoryNames]} ({count})
            </button>
          );
        })}
      </div>

      {/* Elements Display */}
      {viewMode === "table" ? renderPeriodicTable() : renderGridView()}

      {/* Results Count */}
      {filteredElements.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">🔍</div>
          <p className="text-gray-400">
            No elements found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
            }}
            className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {filteredElements.length > 0 && (searchTerm || selectedCategory) && (
        <div className="text-center text-sm text-gray-400">
          Showing {filteredElements.length} of {allElements.length} elements
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-800/50 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Element Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(categoryNames).map(([key, name]) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[key as keyof typeof categoryColors]}`}
              />
              <span className="text-sm text-gray-300">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
