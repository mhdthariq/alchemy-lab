import * as THREE from "three";

interface RadiationParticle {
  mesh: THREE.Mesh;
  type: "alpha" | "beta" | "gamma";
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

interface GeigerParticle {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  clickTime: number;
}

export const createRadioactiveAnimation = (group: THREE.Group) => {
  // Main animation group
  const animationGroup = new THREE.Group();
  group.add(animationGroup);

  // Create uranium atom (large, heavy nucleus)
  const uraniumGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const uraniumMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    emissive: 0x004400,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2,
  });
  const uraniumAtom = new THREE.Mesh(uraniumGeometry, uraniumMaterial);
  animationGroup.add(uraniumAtom);

  // Create oxygen atoms for UO2
  const oxygenAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 2; i++) {
    const oxygenGeometry = new THREE.SphereGeometry(0.35, 24, 24);
    const oxygenMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d4a2d,
      emissive: 0x002200,
      emissiveIntensity: 0.2,
      metalness: 0.3,
      roughness: 0.7,
    });

    const oxygenAtom = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
    const angle = (i / 2) * Math.PI * 2;
    oxygenAtom.position.set(Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2);

    oxygenAtoms.push(oxygenAtom);
    animationGroup.add(oxygenAtom);
  }

  // Create radiation particles (alpha, beta, gamma rays)
  const radiationParticles: RadiationParticle[] = [];

  // Alpha particles (helium nuclei)
  for (let i = 0; i < 8; i++) {
    const alphaGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    const alphaMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      emissive: 0xff2222,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0,
    });

    const alpha = new THREE.Mesh(alphaGeometry, alphaMaterial);
    alpha.position.set(0, 0, 0);

    radiationParticles.push({
      mesh: alpha,
      type: "alpha",
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 2 + Math.random() * 2,
    });

    animationGroup.add(alpha);
  }

  // Beta particles (electrons)
  for (let i = 0; i < 12; i++) {
    const betaGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const betaMaterial = new THREE.MeshStandardMaterial({
      color: 0x4444ff,
      emissive: 0x2222ff,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0,
    });

    const beta = new THREE.Mesh(betaGeometry, betaMaterial);
    beta.position.set(0, 0, 0);

    radiationParticles.push({
      mesh: beta,
      type: "beta",
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 1.5 + Math.random() * 1.5,
    });

    animationGroup.add(beta);
  }

  // Gamma rays (high-energy photons)
  for (let i = 0; i < 15; i++) {
    // Create gamma ray as a small glowing line
    const gammaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3);
    const gammaMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff44,
      emissive: 0xffff22,
      emissiveIntensity: 2.0,
      transparent: true,
      opacity: 0,
    });

    const gamma = new THREE.Mesh(gammaGeometry, gammaMaterial);
    gamma.position.set(0, 0, 0);

    radiationParticles.push({
      mesh: gamma,
      type: "gamma",
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 3 + Math.random() * 2,
    });

    animationGroup.add(gamma);
  }

  // Create radioactive symbol particles
  const symbolParticles: THREE.Mesh[] = [];
  const symbolPoints = [
    // Radioactive trefoil symbol
    // Center
    { x: 0, y: 0, z: 0 },
    // Three sectors
    { x: 0, y: 1, z: 0 },
    { x: 0.1, y: 0.9, z: 0 },
    { x: -0.1, y: 0.9, z: 0 },
    { x: 0.87, y: -0.5, z: 0 },
    { x: 0.77, y: -0.4, z: 0 },
    { x: 0.97, y: -0.4, z: 0 },
    { x: -0.87, y: -0.5, z: 0 },
    { x: -0.97, y: -0.4, z: 0 },
    { x: -0.77, y: -0.4, z: 0 },
  ];

  symbolPoints.forEach((point) => {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(point.x * 2, point.y * 2 + 4, point.z * 2);

    symbolParticles.push(particle);
    animationGroup.add(particle);
  });

  // Geiger counter effect particles
  const geigerParticles: GeigerParticle[] = [];
  for (let i = 0; i < 30; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    );

    geigerParticles.push({
      mesh: particle,
      basePosition: particle.position.clone(),
      clickTime: Math.random() * 10,
    });

    animationGroup.add(particle);
  }

  // Radiation warning light
  const radiationLight = new THREE.PointLight(0xffff00, 0, 12);
  radiationLight.position.set(0, 0, 0);
  animationGroup.add(radiationLight);

  // Animation function
  return (time: number) => {
    const t = time * 0.001;

    // Rotate the uranium dioxide molecule
    uraniumAtom.rotation.y = t * 0.5;
    uraniumAtom.rotation.x = Math.sin(t * 0.3) * 0.2;

    // Orbit oxygen atoms around uranium
    oxygenAtoms.forEach((atom, index) => {
      const angle = t * 0.8 + (index / 2) * Math.PI * 2;
      const radius = 1.2 + Math.sin(t * 0.7 + index) * 0.1;

      atom.position.set(
        Math.cos(angle) * radius,
        Math.sin(t * 0.4 + index) * 0.2,
        Math.sin(angle) * radius,
      );

      atom.rotation.y = t * 1.2 + index;
    });

    // Pulsing radioactive glow
    const glowIntensity = (Math.sin(t * 2) + 1) * 0.5;
    uraniumMaterial.emissiveIntensity = 0.3 + glowIntensity * 0.4;
    radiationLight.intensity = glowIntensity * 3;

    // Radiation particle emissions
    radiationParticles.forEach((particle, index) => {
      particle.life += 0.016;

      // Reset particle when it expires
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.mesh.position.set(0, 0, 0);

        // Set random emission direction
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;

        const speed =
          particle.type === "alpha"
            ? 0.03
            : particle.type === "beta"
              ? 0.05
              : 0.08;

        particle.velocity.set(
          Math.sin(theta) * Math.cos(phi) * speed,
          Math.sin(theta) * Math.sin(phi) * speed,
          Math.cos(theta) * speed,
        );
      }

      // Move particle
      particle.mesh.position.add(particle.velocity);

      // Fade based on distance from center
      const distance = particle.mesh.position.length();
      const fadeDistance =
        particle.type === "alpha" ? 2 : particle.type === "beta" ? 3 : 4;

      const opacity = Math.max(0, 1 - distance / fadeDistance);
      (particle.mesh.material as THREE.MeshStandardMaterial).opacity = opacity;

      // Rotate gamma rays to face movement direction
      if (particle.type === "gamma") {
        particle.mesh.lookAt(
          particle.mesh.position.clone().add(particle.velocity),
        );
      }

      // Different behaviors for different radiation types
      if (particle.type === "alpha") {
        // Alpha particles are heavy and slow down quickly
        particle.velocity.multiplyScalar(0.98);
      } else if (particle.type === "beta") {
        // Beta particles curve due to magnetic fields
        particle.velocity.x += Math.sin(t * 5 + index) * 0.001;
        particle.velocity.z += Math.cos(t * 5 + index) * 0.001;
      }
      // Gamma rays travel in straight lines at constant speed
    });

    // Radioactive symbol warning
    symbolParticles.forEach((particle, index) => {
      const symbolPhase = Math.sin(t * 1.5) > 0.5 ? 1 : 0;
      const flicker = Math.sin(t * 20 + index) > 0 ? 1 : 0.7;

      (particle.material as THREE.MeshStandardMaterial).opacity =
        symbolPhase * flicker * 0.9;

      // Slow rotation of symbol
      particle.rotation.z = t * 0.5;
    });

    // Geiger counter clicking effect
    geigerParticles.forEach((particle) => {
      particle.clickTime += 0.016;

      // Random geiger clicks based on radiation intensity
      const clickProbability = 0.05 + glowIntensity * 0.1;

      if (particle.clickTime > 0.1 && Math.random() < clickProbability) {
        particle.clickTime = 0;

        // Brief flash
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity = 1;
        particle.mesh.scale.setScalar(2);
      } else {
        // Fade out
        (particle.mesh.material as THREE.MeshStandardMaterial).opacity *= 0.9;
        particle.mesh.scale.multiplyScalar(0.95);
      }

      // Random position around detection area
      if (Math.random() < 0.01) {
        particle.mesh.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        );
      }
    });

    // Radiation hazard shake effect
    const shakeIntensity = glowIntensity * 0.01;
    animationGroup.position.set(
      Math.sin(t * 10) * shakeIntensity,
      Math.cos(t * 8) * shakeIntensity,
      Math.sin(t * 12) * shakeIntensity,
    );

    // Overall slow rotation
    animationGroup.rotation.y = t * 0.1;
  };
};
