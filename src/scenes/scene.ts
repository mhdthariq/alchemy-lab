import * as THREE from "three";
import { createWaterAnimation } from "./animations/water-animation";
import { createSaltAnimation } from "./animations/salt-animation";
import { createCarbonMonoxideAnimation } from "./animations/co-animation";
import { createCarbonDioxideAnimation } from "./animations/carbon-dioxide-animation";
import { createAmmoniaAnimation } from "./animations/ammonia-animation";
import { createMethaneAnimation } from "./animations/methane-animation";
import { createIronOxideAnimation } from "./animations/iron-oxide-animation";
import { createAlloyAnimation } from "./animations/alloy-animation";
import { createImpossibleAnimation } from "./animations/impossible-animation";

// A map to associate reaction keys with their corresponding animation functions
const animationMap: Record<string, (group: THREE.Group) => void> = {
  // Basic compound formations
  HO: createWaterAnimation,
  ClNa: createSaltAnimation,
  CO: createCarbonMonoxideAnimation,
  CO2: createCarbonDioxideAnimation,
  HN: createAmmoniaAnimation,
  CH: createMethaneAnimation,

  // Oxides and corrosion
  FeO: createIronOxideAnimation,
  MgO: (group) => createBasicOxideAnimation(group, "Mg", "O", 0x8aff00),
  CaO: (group) => createBasicOxideAnimation(group, "Ca", "O", 0x3dff00),
  CuO: (group) => createBasicOxideAnimation(group, "Cu", "O", 0xc88033),
  AlO: (group) => createBasicOxideAnimation(group, "Al", "O", 0xbfa6a6),
  OSi: (group) => createBasicOxideAnimation(group, "Si", "O", 0xf0c8a0),
  OP: (group) => createBasicOxideAnimation(group, "P", "O", 0xff8000),
  OS: (group) => createBasicOxideAnimation(group, "S", "O", 0xffff30),

  // Sulfur compounds
  HS: (group) => createHydrogenSulfideAnimation(group),

  // Halide salts
  FLi: (group) => createHalideAnimation(group, "Li", "F"),
  ClK: (group) => createHalideAnimation(group, "K", "Cl"),
  BrK: (group) => createHalideAnimation(group, "K", "Br"),
  ClMg: (group) => createHalideAnimation(group, "Mg", "Cl"),
  ClCa: (group) => createHalideAnimation(group, "Ca", "Cl"),

  // Alloys and mixtures
  AuAg: createAlloyAnimation,
  AgCu: createAlloyAnimation,
  CuZn: createAlloyAnimation,

  // Impossible reactions
  HeO: createImpossibleAnimation,
  NeO: createImpossibleAnimation,
  HeH: createImpossibleAnimation,
  NeH: createImpossibleAnimation,
  HeCl: createImpossibleAnimation,
  HeHe: createImpossibleAnimation,
  NeNe: createImpossibleAnimation,
};

// Helper function to create basic oxide animations
const createBasicOxideAnimation = (
  group: THREE.Group,
  metalSymbol: string,
  oxygenSymbol: string,
  metalColor: number,
) => {
  const metalGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: metalColor,
    metalness: 0.6,
    roughness: 0.4,
  });

  const oxygenGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const oxygenMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0d0d,
    metalness: 0.3,
    roughness: 0.5,
  });

  const metalAtom = new THREE.Mesh(metalGeometry, metalMaterial);
  const oxygenAtom = new THREE.Mesh(oxygenGeometry, oxygenMaterial);

  metalAtom.position.set(-1, 0, 0);
  oxygenAtom.position.set(1, 0, 0);

  group.add(metalAtom);
  group.add(oxygenAtom);

  // Create bond
  const bondGeometry = new THREE.CylinderGeometry(0.06, 0.06, 2, 8);
  const bondMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const bond = new THREE.Mesh(bondGeometry, bondMaterial);
  bond.rotation.z = Math.PI / 2;
  group.add(bond);

  // Add oxidation particles
  for (let i = 0; i < 10; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.7,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    const angle = (i / 10) * Math.PI * 2;
    particle.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
    group.add(particle);

    const animateParticle = () => {
      particle.position.multiplyScalar(1.01);
      particle.material.opacity *= 0.98;
      if (particle.material.opacity > 0.1) {
        requestAnimationFrame(animateParticle);
      }
    };
    setTimeout(animateParticle, i * 100);
  }
};

// Helper function for hydrogen sulfide animation
const createHydrogenSulfideAnimation = (group: THREE.Group) => {
  const sulfurGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sulfurMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff30,
    metalness: 0.3,
    roughness: 0.5,
  });
  const sulfurAtom = new THREE.Mesh(sulfurGeometry, sulfurMaterial);
  group.add(sulfurAtom);

  const hydrogenGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const hydrogenMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.3,
    roughness: 0.5,
  });

  const hydrogen1 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
  const hydrogen2 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);

  hydrogen1.position.set(1.2, 0.8, 0);
  hydrogen2.position.set(1.2, -0.8, 0);

  group.add(hydrogen1);
  group.add(hydrogen2);

  // Add stink lines
  for (let i = 0; i < 5; i++) {
    const lineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: 0x666600,
      transparent: true,
      opacity: 0.5,
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(-2 + i * 0.5, 1.5 + Math.sin(i) * 0.3, 0);
    line.rotation.z = Math.PI / 6;
    group.add(line);

    const animateLine = () => {
      line.position.y += 0.02;
      line.material.opacity *= 0.995;
      line.scale.x *= 1.005;
      if (line.material.opacity > 0.1) {
        requestAnimationFrame(animateLine);
      }
    };
    setTimeout(animateLine, i * 200);
  }
};

// Helper function for halide salt animations
const createHalideAnimation = (
  group: THREE.Group,
  metalSymbol: string,
  halogenSymbol: string,
) => {
  // Color mapping for different elements
  const colorMap: Record<string, number> = {
    Li: 0xcc80ff,
    Na: 0xab5cf2,
    K: 0x8f40d4,
    Mg: 0x8aff00,
    Ca: 0x3dff00,
    F: 0x90e050,
    Cl: 0x1ff01f,
    Br: 0xa62929,
    I: 0x940094,
  };

  const metalGeometry = new THREE.SphereGeometry(0.9, 32, 32);
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: colorMap[metalSymbol] || 0xcccccc,
    metalness: 0.6,
    roughness: 0.3,
  });

  const halogenGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const halogenMaterial = new THREE.MeshStandardMaterial({
    color: colorMap[halogenSymbol] || 0xcccccc,
    metalness: 0.3,
    roughness: 0.5,
  });

  // Create ionic crystal structure
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const x = (i - 1.5) * 1.5;
      const z = (j - 1.5) * 1.5;

      if ((i + j) % 2 === 0) {
        const metalAtom = new THREE.Mesh(metalGeometry, metalMaterial);
        metalAtom.position.set(x, 0, z);
        group.add(metalAtom);
      } else {
        const halogenAtom = new THREE.Mesh(halogenGeometry, halogenMaterial);
        halogenAtom.position.set(x, 0, z);
        group.add(halogenAtom);
      }
    }
  }

  // Add crystallization effect
  const crystalGeometry = new THREE.BoxGeometry(6, 0.1, 6);
  const crystalMaterial = new THREE.MeshBasicMaterial({
    color: 0xccccff,
    transparent: true,
    opacity: 0.2,
  });
  const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
  crystal.position.y = -1;
  group.add(crystal);

  // Animate crystal growth
  let scale = 0.1;
  const animateCrystal = () => {
    scale += 0.02;
    crystal.scale.set(scale, 1, scale);
    crystal.material.opacity = Math.max(0, 0.3 - scale * 0.1);
    if (scale < 2) {
      requestAnimationFrame(animateCrystal);
    }
  };
  animateCrystal();
};

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLDivElement;
  private animationFrameId: number = 0;
  private currentReactionGroup: THREE.Group | null = null;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);

    this.init();
  }

  private init() {
    // Set up the scene background with a subtle gradient
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.width = 256;
    canvas.height = 256;

    const gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#0f0f23");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    this.scene.background = texture;

    // Renderer setup
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Camera position
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 0, 0);

    // Lights
    this.ambientLight.color.setHex(0x404040);
    this.scene.add(this.ambientLight);

    this.directionalLight.position.set(10, 10, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;
    this.directionalLight.shadow.camera.left = -10;
    this.directionalLight.shadow.camera.right = 10;
    this.directionalLight.shadow.camera.top = 10;
    this.directionalLight.shadow.camera.bottom = -10;
    this.scene.add(this.directionalLight);

    // Add a subtle point light for better atom illumination
    const pointLight = new THREE.PointLight(0x00ffff, 0.5, 50);
    pointLight.position.set(0, 5, 5);
    this.scene.add(pointLight);

    // Handle window resizing
    window.addEventListener("resize", this.onWindowResize);
  }

  // The main animation loop, called every frame
  public animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Animate the current molecule group if it exists
    if (this.currentReactionGroup) {
      this.currentReactionGroup.rotation.y += 0.004;
      this.currentReactionGroup.rotation.x += 0.002;

      // Add subtle floating animation
      this.currentReactionGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    // Animate lights for dynamic effect
    this.directionalLight.intensity = 1.3 + Math.sin(Date.now() * 0.002) * 0.2;
    this.ambientLight.intensity = 0.6 + Math.sin(Date.now() * 0.003) * 0.1;

    this.renderer.render(this.scene, this.camera);
  };

  // Triggers a new reaction animation
  public triggerReaction(reactionKey: string | null) {
    // Clear any previous molecule from the scene
    if (this.currentReactionGroup) {
      this.scene.remove(this.currentReactionGroup);

      // Properly dispose of all geometries and materials
      this.currentReactionGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      this.currentReactionGroup = null;
    }

    if (!reactionKey) {
      return; // No reaction to trigger, so we just cleared the scene
    }

    const animationFunc = animationMap[reactionKey];
    if (animationFunc) {
      const reactionGroup = new THREE.Group();
      this.currentReactionGroup = reactionGroup;
      this.scene.add(this.currentReactionGroup);

      // Call the specific animation function
      animationFunc(this.currentReactionGroup);

      // Add entry animation
      this.currentReactionGroup.scale.set(0.1, 0.1, 0.1);
      const animateEntry = () => {
        if (this.currentReactionGroup) {
          this.currentReactionGroup.scale.multiplyScalar(1.05);
          if (this.currentReactionGroup.scale.x < 1) {
            requestAnimationFrame(animateEntry);
          }
        }
      };
      animateEntry();
    }
  }

  // Adjusts camera and renderer on window resize
  private onWindowResize = () => {
    if (!this.container) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  // Cleans up resources to prevent memory leaks
  public cleanup() {
    window.removeEventListener("resize", this.onWindowResize);
    cancelAnimationFrame(this.animationFrameId);

    // Clean up the current reaction group
    if (this.currentReactionGroup) {
      this.currentReactionGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    // Clean up renderer
    this.renderer.dispose();

    // Remove canvas from DOM
    if (this.renderer.domElement.parentElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
