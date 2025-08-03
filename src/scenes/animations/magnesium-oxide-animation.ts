import * as THREE from "three";
import { elements } from "@/lib/data";

interface FlameParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
}

export const createMagnesiumOxideAnimation = (group: THREE.Group) => {
  // Get element data
  const magnesiumData = elements["Mg"];
  const oxygenData = elements["O"];

  // Main animation group
  const animationGroup = new THREE.Group();
  group.add(animationGroup);

  // Create initial magnesium atoms
  const magnesiumAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const mgGeometry = new THREE.SphereGeometry(magnesiumData.radius, 32, 32);
    const mgMaterial = new THREE.MeshStandardMaterial({
      color: magnesiumData.color,
      metalness: 0.8,
      roughness: 0.2,
    });

    const mgAtom = new THREE.Mesh(mgGeometry, mgMaterial);
    mgAtom.position.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
    );

    magnesiumAtoms.push(mgAtom);
    animationGroup.add(mgAtom);
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
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
    );

    oxygenMolecules.push(o2Group);
    animationGroup.add(o2Group);
  }

  // Create brilliant white flame particles
  const flameParticles: FlameParticle[] = [];
  for (let i = 0; i < 50; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2.0,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(0, 0, 0);

    flameParticles.push({
      mesh: particle,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.2,
        (Math.random() - 0.5) * 0.1,
      ),
      life: Math.random(),
    });

    animationGroup.add(particle);
  }

  // Create MgO product atoms (initially hidden)
  const mgoProducts: THREE.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const mgoGroup = new THREE.Group();

    // Mg atom in MgO
    const mgGeometry = new THREE.SphereGeometry(
      magnesiumData.radius * 0.9,
      32,
      32,
    );
    const mgMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0, // White for MgO
      metalness: 0.1,
      roughness: 0.9,
    });
    const mgAtom = new THREE.Mesh(mgGeometry, mgMaterial);

    // O atom in MgO
    const oGeometry = new THREE.SphereGeometry(oxygenData.radius * 0.9, 32, 32);
    const oMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0, // White for MgO
      metalness: 0.1,
      roughness: 0.9,
    });
    const oAtom = new THREE.Mesh(oGeometry, oMaterial);
    oAtom.position.set(1.2, 0, 0);

    mgoGroup.add(mgAtom);
    mgoGroup.add(oAtom);
    mgoGroup.scale.setScalar(0);

    mgoProducts.push(mgoGroup);
    animationGroup.add(mgoGroup);
  }

  // Intense white light source for the burning effect
  const whiteLight = new THREE.PointLight(0xffffff, 0, 10);
  whiteLight.position.set(0, 0, 0);
  animationGroup.add(whiteLight);

  // Animation function
  return (time: number) => {
    const t = time * 0.001;

    // Phase 1: Initial movement (0-2s)
    if (t < 2) {
      // Move atoms towards center
      magnesiumAtoms.forEach((atom, index) => {
        const targetPosition = new THREE.Vector3(0, 0, 0);
        atom.position.lerp(targetPosition, 0.02);
        atom.rotation.y = t * 2 + index;
      });

      oxygenMolecules.forEach((molecule, index) => {
        const targetPosition = new THREE.Vector3(0, 0, 0);
        molecule.position.lerp(targetPosition, 0.015);
        molecule.rotation.z = t * 3 + index;
      });
    }

    // Phase 2: Ignition and burning (2-6s)
    else if (t < 6) {
      const burnPhase = (t - 2) / 4;

      // Intense white light during burning
      whiteLight.intensity = burnPhase * 5;

      // Hide original atoms as they "burn"
      magnesiumAtoms.forEach((atom) => {
        atom.scale.setScalar(Math.max(0, 1 - burnPhase));
      });

      oxygenMolecules.forEach((molecule) => {
        molecule.scale.setScalar(Math.max(0, 1 - burnPhase));
      });

      // Brilliant white flame particles
      flameParticles.forEach((particle) => {
        particle.life += 0.02;

        if (particle.life > 1) {
          particle.life = 0;
          particle.mesh.position.set(0, 0, 0);
          particle.velocity.set(
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.3,
            (Math.random() - 0.5) * 0.2,
          );
        }

        particle.mesh.position.add(particle.velocity);
        particle.velocity.y -= 0.005; // Gravity

        // Brilliant white with slight blue tint
        const intensity = Math.sin(particle.life * Math.PI) * burnPhase;
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity =
          intensity;
        (
          particle.mesh.material as THREE.MeshStandardMaterial
        ).emissiveIntensity = intensity * 3;

        // Color variation from white to slight blue
        const color = new THREE.Color().setHSL(0.6, 0.1, 1.0);
        (particle.mesh.material as THREE.MeshStandardMaterial).color = color;
        (particle.mesh.material as THREE.MeshStandardMaterial).emissive = color;
      });
    }

    // Phase 3: Product formation (6s+)
    else {
      const productPhase = Math.min(1, (t - 6) / 2);

      // Fade out flame
      whiteLight.intensity = Math.max(0, 5 * (1 - productPhase));

      flameParticles.forEach((particle) => {
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity *= 0.95;
      });

      // Form MgO products
      mgoProducts.forEach((product, index) => {
        const delay = index * 0.2;
        const adjustedPhase = Math.max(
          0,
          Math.min(1, (productPhase - delay) * 2),
        );

        // Smooth growth
        const easedGrowth = 1 - Math.pow(1 - adjustedPhase, 3);
        product.scale.setScalar(easedGrowth);

        // Position products in a loose arrangement
        const angle = (index / mgoProducts.length) * Math.PI * 2;
        const radius = 1.5;
        product.position.set(
          Math.cos(angle) * radius,
          Math.sin(t * 0.5 + index) * 0.1,
          Math.sin(angle) * radius,
        );

        product.rotation.y = t * 0.5 + index;
      });
    }

    // Overall gentle rotation
    animationGroup.rotation.y = t * 0.1;
  };
};
