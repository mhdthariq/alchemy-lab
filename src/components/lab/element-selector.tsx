import { useState } from "react";
import { Element } from "@/lib/data";

interface ElementSelectorProps {
  elements: Element[];
  onSelect: (element: Element) => void;
}

const categoryColors = {
  alkali: "from-purple-500 to-purple-700",
  "alkaline-earth": "from-green-500 to-green-700",
  "transition-metal": "from-orange-500 to-orange-700",
  metal: "from-gray-500 to-gray-700",
  metalloid: "from-yellow-500 to-yellow-700",
  nonmetal: "from-blue-500 to-blue-700",
  halogen: "from-teal-500 to-teal-700",
  "noble-gas": "from-indigo-500 to-indigo-700",
};

const categoryNames = {
  alkali: "Alkali Metals",
  "alkaline-earth": "Alkaline Earth",
  "transition-metal": "Transition Metals",
  metal: "Other Metals",
  metalloid: "Metalloids",
  nonmetal: "Nonmetals",
  halogen: "Halogens",
  "noble-gas": "Noble Gases",
};

export const ElementSelector = ({
  elements,
  onSelect,
}: ElementSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  const filteredElements = elements.filter((element) => {
    const matchesCategory =
      !selectedCategory || element.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(elements.map((el) => el.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          <span className="text-3xl">⚗️</span>
          Select Elements
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
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
          All Elements ({elements.length})
        </button>
        {categories.map((category) => {
          const count = elements.filter(
            (el) => el.category === category,
          ).length;
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

      {/* Elements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filteredElements.map((element) => (
          <button
            key={element.symbol}
            onClick={() => onSelect(element)}
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
            className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            ></div>

            {/* Alchemical Symbol if available */}
            {element.alchemicalSymbol && (
              <div className="absolute top-2 left-2 text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                {element.alchemicalSymbol}
              </div>
            )}

            {/* Hover Glow Effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: element.color }}
            ></div>
          </button>
        ))}
      </div>

      {/* Element Tooltip */}
      {hoveredElement && (
        <div className="fixed z-50 pointer-events-none">
          <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-xl max-w-sm">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: hoveredElement.color }}
              >
                {hoveredElement.symbol}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {hoveredElement.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Atomic Number: {hoveredElement.atomicNumber}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-2">
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
          </div>
        </div>
      )}

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
          Showing {filteredElements.length} of {elements.length} elements
        </div>
      )}
    </div>
  );
};
