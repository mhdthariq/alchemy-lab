# Interactive Alchemy Lab 🧪⚗️

A modern, interactive chemistry laboratory where you can explore the fascinating world of chemical reactions through stunning 3D visualizations and educational content.

![Interactive Alchemy Lab](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.178-green?style=for-the-badge&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔬 Comprehensive Element Database
- **30+ Elements** from all categories of the periodic table
- **Alkali Metals**: Li, Na, K with explosive reactions
- **Noble Gases**: He, Ne with educational explanations for inert behavior
- **Transition Metals**: Fe, Cu, Au, Ag with realistic oxidation reactions
- **Halogens**: F, Cl, Br, I with salt formation capabilities
- **Metalloids & Nonmetals**: Complete coverage of essential elements

### ⚛️ Realistic Chemical Reactions
- **50+ Chemical Reactions** based on real chemistry
- **Reaction Types**: Synthesis, decomposition, combustion, acid-base, redox
- **Energy Classifications**: Exothermic and endothermic reactions
- **Difficulty Levels**: Easy, moderate, and hard reactions
- **Balanced Equations**: Proper stoichiometry for each reaction
- **Educational Explanations**: Why certain reactions are impossible

### 🎬 Stunning 3D Molecular Visualizations
- **Interactive Animations** for each reaction type
- **Molecular Geometry**: Accurate bond angles and structures
- **Water Formation**: H-O-H with 104.5° bond angle
- **Salt Crystals**: Ionic lattice structures
- **Organic Compounds**: Tetrahedral methane, trigonal ammonia
- **Oxidation Effects**: Rust formation with particle systems
- **Alloy Formation**: Metal mixing with heat effects

### 🎨 Modern User Interface
- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Category Filtering**: Filter elements by type (metals, nonmetals, etc.)
- **Smart Search**: Find elements by name or symbol
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly interface for extended use
- **Accessibility**: High contrast support and reduced motion options

### 📊 Educational Features
- **Reaction Statistics**: Track your experiments and discoveries
- **Discovery Progress**: Unlock all possible reactions
- **Fun Facts**: Learn interesting chemistry trivia
- **Real-world Applications**: Understand practical uses
- **Safety Information**: Learn about dangerous combinations
- **Historical Context**: Discovery dates and alchemical symbols

### 🎮 Interactive Gameplay Elements
- **Random Combinations**: Discover reactions through experimentation
- **Achievement System**: Master Alchemist progression
- **Statistics Tracking**: Monitor your learning journey
- **Welcome Tutorial**: Guided introduction for new users

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhdthariq/alchemy-lab.git
   cd interactive-alchemy-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 🧪 How to Use

### Basic Operation
1. **Select Elements**: Browse the periodic table and click on elements
2. **Combine**: Choose two elements and click "Combine Elements"
3. **Watch**: Observe the 3D molecular animation
4. **Learn**: Read detailed information about the reaction

### Advanced Features
- **Category Filtering**: Use category pills to filter elements by type
- **Search Function**: Type element names or symbols to find them quickly
- **Random Mixing**: Click "Random Mix" for experimental combinations
- **Statistics**: View your progress and discovery rate

### Understanding Results
- **✅ Successful Reactions**: Real chemical compounds with detailed info
- **❌ Impossible Reactions**: Educational explanations for why they don't work
- **💨 Fizzled Reactions**: No reaction occurs under normal conditions

## 🔬 Chemistry Education

### Reaction Types Covered
- **Synthesis**: A + B → AB (e.g., Na + Cl → NaCl)
- **Combustion**: Element + O₂ → Oxide (e.g., C + O₂ → CO₂)
- **Decomposition**: AB → A + B
- **Acid-Base**: Proton transfer reactions
- **Redox**: Electron transfer reactions
- **Precipitation**: Formation of insoluble compounds

### Key Learning Concepts
- **Ionic Bonding**: Metal + Nonmetal electron transfer
- **Covalent Bonding**: Nonmetal + Nonmetal electron sharing
- **Molecular Geometry**: VSEPR theory visualization
- **Periodic Trends**: Reactivity patterns across periods and groups
- **Energy Changes**: Exothermic vs endothermic processes

## 🛠️ Technical Architecture

### Frontend Stack
- **Next.js 15.3.5**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.0**: Utility-first styling
- **Three.js**: 3D graphics and animations

### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # React components
│   └── lab/               # Laboratory-specific components
│       ├── element-selector.tsx
│       ├── combination-area.tsx
│       └── result-display.tsx
├── lib/                   # Utility functions and data
│   └── data.ts            # Element and reaction database
└── scenes/                # 3D visualization
    ├── animations/        # Reaction animations
    ├── canvas-wrapper.tsx # Canvas component
    └── scene.ts           # Three.js scene manager
```

### Data Structure
```typescript
interface Element {
  name: string;              // Element name
  symbol: string;            // Chemical symbol
  atomicNumber: number;      // Atomic number
  color: string;             // Visual color
  radius: number;            // Atomic radius
  category: ElementCategory; // Element classification
  description: string;       // Educational description
  discovered?: string;       // Discovery date/era
  alchemicalSymbol?: string; // Traditional symbol
}

interface Reaction {
  productName: string;       // Product name
  productFormula: string;    // Chemical formula
  description: string;       // Reaction description
  animation: string;         // Animation key
  type: ReactionType;        // Reaction classification
  balancedEquation: string;  // Stoichiometric equation
  energyChange: "exothermic" | "endothermic";
  difficulty: "easy" | "moderate" | "hard";
  realWorld: boolean;        // Occurs in nature
  explanation?: string;      // Why it's impossible
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#06b6d4) - Science and technology
- **Secondary**: Blue (#3b82f6) - Trust and stability
- **Accent**: Purple (#8b5cf6) - Innovation and creativity
- **Success**: Green (#10b981) - Successful reactions
- **Warning**: Yellow (#f59e0b) - Caution and attention
- **Error**: Red (#ef4444) - Dangerous or impossible reactions

### Typography
- **Headings**: Inter font family, bold weights
- **Body Text**: Inter, regular weight, 1.6 line height
- **Code/Formulas**: Monospace font for chemical formulas
- **UI Elements**: Medium weight for buttons and labels

### Animation System
- **Entry Animations**: Scale-in and fade effects
- **Hover States**: Smooth scale and glow transitions
- **Reaction Effects**: Particle systems and energy waves
- **Loading States**: Pulse and shimmer animations

## 🔬 Scientific Accuracy

### Chemistry Principles
- **Accurate Molecular Geometry**: Based on VSEPR theory
- **Realistic Bond Angles**: Water (104.5°), Methane (109.5°)
- **Proper Stoichiometry**: Balanced chemical equations
- **Energy Considerations**: Correct exo/endothermic classifications
- **Electron Configuration**: Noble gas inert behavior explained

### Educational Standards
- **Age Appropriate**: Suitable for high school and college chemistry
- **Curriculum Aligned**: Covers standard chemistry topics
- **Safety Conscious**: Highlights dangerous combinations
- **Historically Accurate**: Correct discovery dates and context

## 🚧 Future Enhancements

### Planned Features
- **pH Calculations**: Acid-base reaction calculations
- **Thermodynamics**: Enthalpy and entropy calculations
- **Kinetics**: Reaction rate animations
- **Periodic Trends**: Interactive periodic table exploration
- **Lab Equipment**: Virtual beakers, burners, and apparatus
- **Sound Effects**: Audio feedback for reactions
- **Multiplayer Mode**: Collaborative experiments
- **Mobile App**: Native iOS and Android versions

### Advanced Chemistry
- **Organic Reactions**: Complex carbon-based reactions
- **Biochemistry**: Enzyme and protein interactions
- **Nuclear Chemistry**: Radioactive decay and fusion
- **Quantum Effects**: Electron orbital visualizations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Areas for Contribution
- **New Reactions**: Add more chemical reactions
- **Animations**: Create new 3D molecular animations
- **Translations**: Internationalization support
- **Accessibility**: Improve accessibility features
- **Performance**: Optimize rendering and animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community**: For excellent 3D graphics library
- **Chemistry Education**: Inspired by real chemistry curricula
- **Open Source**: Built with amazing open-source tools
- **Scientific Community**: For chemical data and research

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/interactive-alchemy-lab/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/interactive-alchemy-lab/discussions)
- **Email**: support@interactive-alchemy-lab.com

---

**Made with ❤️ for chemistry education and scientific exploration**

*Discover the beauty of chemistry through interactive visualization*
