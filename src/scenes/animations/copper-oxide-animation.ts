import * as THREE from "three";
import { elements } from "@/lib/data";

interface HeatParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
}

export const createCopperOxideAnimation = (group: THREE.Group) => {
  // Get element data
  const copperData = elements["Cu"];
  const oxygenData = elements["O"];

  // Main animation group
  const animationGroup = new THREE.Group();
  group.add(animationGroup);

  // Create initial copper atoms
  const copperAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const cuGeometry = new THREE.SphereGeometry(copperData.radius, 32, 32);
    const cuMaterial = new THREE.MeshStandardMaterial({
      color: copperData.color,
      metalness: 0.9,
      roughness: 0.1,
    });

    const cuAtom = new THREE.Mesh(cuGeometry, cuMaterial);
    cuAtom.position.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
    );

    copperAtoms.push(cuAtom);
    animationGroup.add(cuAtom);
  }

  // Create oxygen molecules (O2)
  const oxygenMolecules: THREE.Group[] = [];
  for (let i = 0; i < 2; i++) {
    const o2Group = new THREE.Group();

    for (let j = 0; j < 2; j++) {
      const oGeometry = new THREE.SphereGeometry(oxygenData.radius, 32, 32);
      const oMaterial = new THREE.MeshStandardMaterial({
        color: oxygenData.color,
        metalness: 0.3,
        roughness: 0.7,
      });

      const oAtom = new THREE.Mesh(oGeometry, oMaterial);
      oAtom.position.set(j * 0.6 - 0.3, 0, 0);
      o2Group.add(oAtom);
    }

    o2Group.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    );

    oxygenMolecules.push(o2Group);
    animationGroup.add(o2Group);
  }

  // Create heat shimmer particles
  const heatParticles: HeatParticle[] = [];
  for (let i = 0; i < 30; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff3300,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(0, -2, 0);

    heatParticles.push({
      mesh: particle,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        Math.random() * 0.15,
        (Math.random() - 0.5) * 0.05,
      ),
      life: Math.random(),
    });

    animationGroup.add(particle);
  }

  // Create CuO product atoms (initially hidden)
  const cuoProducts: THREE.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const cuoGroup = new THREE.Group();

    // Cu atom in CuO (black)
    const cuGeometry = new THREE.SphereGeometry(
      copperData.radius * 0.95,
      32,
      32,
    );
    const cuMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, // Dark black for CuO
      metalness: 0.2,
      roughness: 0.8,
    });
    const cuAtom = new THREE.Mesh(cuGeometry, cuMaterial);

    // O atom in CuO (dark)
    const oGeometry = new THREE.SphereGeometry(oxygenData.radius * 0.9, 32, 32);
    const oMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333, // Dark gray for oxygen in CuO
      metalness: 0.1,
      roughness: 0.9,
    });
    const oAtom = new THREE.Mesh(oGeometry, oMaterial);
    oAtom.position.set(1.0, 0, 0);

    cuoGroup.add(cuAtom);
    cuoGroup.add(oAtom);
    cuoGroup.scale.setScalar(0);

    cuoProducts.push(cuoGroup);
    animationGroup.add(cuoGroup);
  }

  // Oxidation surface effects
  const oxidationEffects: THREE.Mesh[] = [];
  copperAtoms.forEach((atom) => {
    const effectGeometry = new THREE.SphereGeometry(
      copperData.radius * 1.1,
      16,
      16,
    );
    const effectMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0,
      metalness: 0.1,
      roughness: 0.9,
    });

    const effect = new THREE.Mesh(effectGeometry, effectMaterial);
    effect.position.copy(atom.position);
    oxidationEffects.push(effect);
    animationGroup.add(effect);
  });

  // Animation function
  return (time: number) => {
    const t = time * 0.001;

    // Phase 1: Initial heating and movement (0-3s)
    if (t < 3) {
      const heatPhase = t / 3;

      // Move atoms towards center
      copperAtoms.forEach((atom, index) => {
        const targetPosition = new THREE.Vector3(
          Math.cos((index * Math.PI) / 2) * 0.5,
          Math.sin((index * Math.PI) / 2) * 0.5,
          0,
        );
        atom.position.lerp(targetPosition, 0.02);
        atom.rotation.y = t * 1.5 + index;
      });

      oxygenMolecules.forEach((molecule, index) => {
        const targetPosition = new THREE.Vector3(0, 0, 0);
        molecule.position.lerp(targetPosition, 0.015);
        molecule.rotation.x = t * 2 + index;
      });

      // Heat shimmer effects
      heatParticles.forEach((particle) => {
        particle.life += 0.015;

        if (particle.life > 1) {
          particle.life = 0;
          particle.mesh.position.set(
            (Math.random() - 0.5) * 2,
            -2,
            (Math.random() - 0.5) * 2,
          );
          particle.velocity.set(
            (Math.random() - 0.5) * 0.05,
            Math.random() * 0.15,
            (Math.random() - 0.5) * 0.05,
          );
        }

        particle.mesh.position.add(particle.velocity);
        particle.velocity.multiplyScalar(0.98); // Slow down over time

        const intensity = Math.sin(particle.life * Math.PI) * heatPhase;
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity =
          intensity * 0.7;
      });
    }

    // Phase 2: Oxidation process (3-7s)
    else if (t < 7) {
      const oxidationPhase = (t - 3) / 4;

      // Gradual color change from copper to black
      copperAtoms.forEach((atom) => {
        const material = atom.material as THREE.MeshStandardMaterial;
        const originalColor = new THREE.Color(copperData.color);
        const oxidizedColor = new THREE.Color(0x1a1a1a);

        // Interpolate color
        material.color.lerpColors(originalColor, oxidizedColor, oxidationPhase);

        // Change material properties
        material.metalness = 0.9 * (1 - oxidationPhase) + 0.2 * oxidationPhase;
        material.roughness = 0.1 * (1 - oxidationPhase) + 0.8 * oxidationPhase;

        // Scale down original atoms
        atom.scale.setScalar(1 - oxidationPhase * 0.3);
      });

      // Show oxidation surface effects
      oxidationEffects.forEach((effect, index) => {
        const delay = index * 0.2;
        const adjustedPhase = Math.max(
          0,
          Math.min(1, (oxidationPhase - delay) * 2),
        );

        (effect.material as THREE.MeshStandardMaterial).opacity =
          adjustedPhase * 0.5;
        effect.scale.setScalar(1 + adjustedPhase * 0.2);
      });

      // Fade out oxygen molecules
      oxygenMolecules.forEach((molecule) => {
        molecule.scale.setScalar(1 - oxidationPhase);
      });

      // Continue heat effects but reduce intensity
      heatParticles.forEach((particle) => {
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity *= 0.98;
      });
    }

    // Phase 3: Product formation (7s+)
    else {
      const productPhase = Math.min(1, (t - 7) / 2);

      // Hide original atoms completely
      copperAtoms.forEach((atom) => {
        atom.visible = false;
      });

      // Fade out oxidation effects
      oxidationEffects.forEach((effect) => {
        (effect.material as THREE.MeshStandardMaterial).opacity *= 0.95;
      });

      // Form CuO products
      cuoProducts.forEach((product, index) => {
        const delay = index * 0.3;
        const adjustedPhase = Math.max(
          0,
          Math.min(1, (productPhase - delay) * 1.5),
        );

        // Smooth growth with bounce effect
        const easedGrowth =
          adjustedPhase < 0.5
            ? 2 * adjustedPhase * adjustedPhase
            : 1 - Math.pow(-2 * adjustedPhase + 2, 3) / 2;

        product.scale.setScalar(easedGrowth);

        // Position products in a formation
        const angle = (index / cuoProducts.length) * Math.PI * 2;
        const radius = 1.2 + Math.sin(t * 0.5) * 0.2;
        product.position.set(
          Math.cos(angle) * radius,
          Math.sin(t * 0.3 + index) * 0.15,
          Math.sin(angle) * radius,
        );

        product.rotation.y = t * 0.4 + index;
        product.rotation.x = Math.sin(t * 0.2 + index) * 0.1;
      });

      // Completely fade out heat particles
      heatParticles.forEach((particle) => {
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity *= 0.9;
      });
    }

    // Overall rotation
    animationGroup.rotation.y = t * 0.08;
    animationGroup.rotation.x = Math.sin(t * 0.1) * 0.05;
  };
};
