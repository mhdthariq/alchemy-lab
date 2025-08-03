import * as THREE from "three";

export const createCrystalAnimation = (group: THREE.Group) => {
  // Create a crystal lattice structure animation
  const crystalGroup = new THREE.Group();
  group.add(crystalGroup);

  // Define crystal colors for different compounds
  const crystalColors = {
    fluorite: 0x9966ff, // Purple for CaF₂
    boronNitride: 0xf0f0f0, // White for BN
    siliconCarbide: 0x404040, // Dark gray for SiC
    default: 0x87ceeb, // Sky blue for generic crystals
  };

  // Create crystal lattice points
  const latticeSize = 3;
  const spacing = 0.8;
  const crystalAtoms: THREE.Mesh[] = [];

  // Generate cubic crystal structure
  for (let x = -latticeSize; x <= latticeSize; x++) {
    for (let y = -latticeSize; y <= latticeSize; y++) {
      for (let z = -latticeSize; z <= latticeSize; z++) {
        // Skip some atoms to create a more interesting structure
        if (Math.random() > 0.7) continue;

        const atomGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const atomMaterial = new THREE.MeshStandardMaterial({
          color: crystalColors.default,
          metalness: 0.3,
          roughness: 0.4,
          transparent: true,
          opacity: 0.8,
        });

        const atom = new THREE.Mesh(atomGeometry, atomMaterial);
        atom.position.set(x * spacing, y * spacing, z * spacing);

        // Random initial scale for growing effect
        atom.scale.setScalar(0.1);
        crystalAtoms.push(atom);
        crystalGroup.add(atom);
      }
    }
  }

  // Add connecting bonds between nearby atoms
  const bonds: THREE.Mesh[] = [];
  crystalAtoms.forEach((atom1, i) => {
    crystalAtoms.forEach((atom2, j) => {
      if (i >= j) return;

      const distance = atom1.position.distanceTo(atom2.position);
      if (distance < spacing * 1.5) {
        const bondGeometry = new THREE.CylinderGeometry(0.03, 0.03, distance);
        const bondMaterial = new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          transparent: true,
          opacity: 0.6,
        });

        const bond = new THREE.Mesh(bondGeometry, bondMaterial);

        // Position bond between atoms
        const midpoint = new THREE.Vector3()
          .addVectors(atom1.position, atom2.position)
          .multiplyScalar(0.5);
        bond.position.copy(midpoint);

        // Orient bond towards connection
        const direction = new THREE.Vector3()
          .subVectors(atom2.position, atom1.position)
          .normalize();
        bond.lookAt(bond.position.clone().add(direction));
        bond.rotateX(Math.PI / 2);

        bond.scale.set(0.1, 0.1, 0.1);
        bonds.push(bond);
        crystalGroup.add(bond);
      }
    });
  });

  // Add sparkle effects for crystal formation
  const sparkles: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const sparkleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const sparkleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0,
    });

    const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
    sparkle.position.set(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
    );

    sparkles.push(sparkle);
    crystalGroup.add(sparkle);
  }

  // Animation function
  return (time: number) => {
    const t = time * 0.001; // Convert to seconds

    // Rotate the entire crystal structure slowly
    crystalGroup.rotation.y = t * 0.3;
    crystalGroup.rotation.x = Math.sin(t * 0.2) * 0.1;

    // Crystal growth animation
    crystalAtoms.forEach((atom, index) => {
      const delay = index * 0.1;
      const growthPhase = Math.max(0, Math.min(1, (t - delay) * 2));

      // Smooth growth using easing function
      const easedGrowth = 1 - Math.pow(1 - growthPhase, 3);
      atom.scale.setScalar(0.1 + easedGrowth * 0.9);

      // Slight bobbing motion
      atom.position.y += Math.sin(t * 2 + index) * 0.02;

      // Color shift during formation
      const material = atom.material as THREE.MeshStandardMaterial;
      const hue = (Math.sin(t * 0.5 + index * 0.5) + 1) * 0.5;
      material.color.setHSL(0.7 + hue * 0.3, 0.8, 0.6);
    });

    // Bond growth animation
    bonds.forEach((bond, index) => {
      const delay = index * 0.05 + 1; // Start after atoms begin growing
      const growthPhase = Math.max(0, Math.min(1, (t - delay) * 3));

      const easedGrowth = 1 - Math.pow(1 - growthPhase, 2);
      bond.scale.set(easedGrowth, easedGrowth, easedGrowth);
    });

    // Sparkle effects
    sparkles.forEach((sparkle, index) => {
      const sparkleTime = (t + index * 0.5) % 3;

      if (sparkleTime < 0.5) {
        const alpha = Math.sin(sparkleTime * Math.PI * 4) * 0.8;
        (sparkle.material as THREE.MeshStandardMaterial).opacity = Math.max(
          0,
          alpha,
        );

        // Sparkle movement
        sparkle.position.x += Math.sin(t * 2 + index) * 0.01;
        sparkle.position.z += Math.cos(t * 2 + index) * 0.01;
      } else {
        (sparkle.material as THREE.MeshStandardMaterial).opacity = 0;
      }
    });

    // Overall pulsing effect
    const pulse = 1 + Math.sin(t * 1.5) * 0.05;
    crystalGroup.scale.setScalar(pulse);
  };
};
