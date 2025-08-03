import * as THREE from "three";

interface WarningParticle {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  phase: number;
}

interface GasParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
}

export const createDangerousAnimation = (group: THREE.Group) => {
  // Main animation group
  const animationGroup = new THREE.Group();
  group.add(animationGroup);

  // Create warning symbols (skull and crossbones effect)
  const warningGroup = new THREE.Group();
  animationGroup.add(warningGroup);

  // Create toxic molecule structure (e.g., cyanide CN-)
  const moleculeGroup = new THREE.Group();

  // Carbon atom
  const carbonGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c2c2c,
    metalness: 0.3,
    roughness: 0.7,
  });
  const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
  carbonAtom.position.set(-0.6, 0, 0);

  // Nitrogen atom
  const nitrogenGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  const nitrogenMaterial = new THREE.MeshStandardMaterial({
    color: 0x3050f8,
    metalness: 0.3,
    roughness: 0.7,
  });
  const nitrogenAtom = new THREE.Mesh(nitrogenGeometry, nitrogenMaterial);
  nitrogenAtom.position.set(0.6, 0, 0);

  // Triple bond between C and N
  const bondGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2);
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.5,
    roughness: 0.5,
  });

  // Three bonds for triple bond
  for (let i = 0; i < 3; i++) {
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bond.rotation.z = Math.PI / 2;
    bond.position.set(0, (i - 1) * 0.15, 0);
    moleculeGroup.add(bond);
  }

  moleculeGroup.add(carbonAtom);
  moleculeGroup.add(nitrogenAtom);
  animationGroup.add(moleculeGroup);

  // Create warning particles (red danger particles)
  const warningParticles: WarningParticle[] = [];
  for (let i = 0; i < 40; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    );

    warningParticles.push({
      mesh: particle,
      originalPosition: particle.position.clone(),
      phase: Math.random() * Math.PI * 2,
    });

    animationGroup.add(particle);
  }

  // Create skull outline using particles
  const skullParticles: THREE.Mesh[] = [];
  const skullPoints = [
    // Skull outline
    { x: 0, y: 1.5, z: 0 },
    { x: 0.3, y: 1.4, z: 0 },
    { x: 0.5, y: 1.2, z: 0 },
    { x: 0.6, y: 0.8, z: 0 },
    { x: 0.6, y: 0.4, z: 0 },
    { x: 0.5, y: 0, z: 0 },
    { x: 0.3, y: -0.2, z: 0 },
    { x: 0, y: -0.3, z: 0 },
    { x: -0.3, y: -0.2, z: 0 },
    { x: -0.5, y: 0, z: 0 },
    { x: -0.6, y: 0.4, z: 0 },
    { x: -0.6, y: 0.8, z: 0 },
    { x: -0.5, y: 1.2, z: 0 },
    { x: -0.3, y: 1.4, z: 0 },
    // Eyes
    { x: -0.25, y: 0.8, z: 0 },
    { x: -0.25, y: 0.6, z: 0 },
    { x: 0.25, y: 0.8, z: 0 },
    { x: 0.25, y: 0.6, z: 0 },
    // Crossbones
    { x: -1.2, y: -0.8, z: 0 },
    { x: -0.8, y: -1.2, z: 0 },
    { x: 1.2, y: -0.8, z: 0 },
    { x: 0.8, y: -1.2, z: 0 },
  ];

  skullPoints.forEach((point) => {
    const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(point.x, point.y + 3, point.z);

    skullParticles.push(particle);
    animationGroup.add(particle);
  });

  // Create toxic gas clouds
  const gasParticles: GasParticle[] = [];
  for (let i = 0; i < 25; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0x90ff90,
      transparent: true,
      opacity: 0,
      metalness: 0,
      roughness: 1,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
    );

    gasParticles.push({
      mesh: particle,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        Math.random() * 0.05,
        (Math.random() - 0.5) * 0.02,
      ),
      life: Math.random(),
    });

    animationGroup.add(particle);
  }

  // Pulsing red light for danger
  const dangerLight = new THREE.PointLight(0xff0000, 0, 8);
  dangerLight.position.set(0, 0, 0);
  animationGroup.add(dangerLight);

  // Animation function
  return (time: number) => {
    const t = time * 0.001;

    // Rotate the dangerous molecule
    moleculeGroup.rotation.y = t * 1.5;
    moleculeGroup.rotation.x = Math.sin(t * 0.8) * 0.3;

    // Pulsing danger light
    const lightIntensity = (Math.sin(t * 4) + 1) * 0.5;
    dangerLight.intensity = lightIntensity * 2;

    // Warning particles orbiting effect
    warningParticles.forEach((particle, index) => {
      const orbitRadius = 2 + Math.sin(t * 0.5 + index) * 0.5;
      const orbitSpeed = t * 2 + particle.phase;

      particle.mesh.position.set(
        Math.cos(orbitSpeed) * orbitRadius,
        Math.sin(orbitSpeed * 0.7) * 1.5,
        Math.sin(orbitSpeed) * orbitRadius,
      );

      // Pulsing opacity
      const opacity = (Math.sin(t * 3 + index * 0.5) + 1) * 0.5;
      (particle.mesh.material as THREE.MeshStandardMaterial).opacity =
        opacity * 0.8;

      // Size variation
      const scale = 0.5 + Math.sin(t * 2 + index) * 0.3;
      particle.mesh.scale.setScalar(scale);
    });

    // Skull warning symbol animation
    skullParticles.forEach((particle, index) => {
      // Fade in warning symbol
      const fadePhase = Math.sin(t * 0.8) > 0 ? 1 : 0;
      const flickerEffect = Math.sin(t * 15 + index) > 0 ? 1 : 0.3;

      (particle.material as THREE.MeshStandardMaterial).opacity =
        fadePhase * flickerEffect * 0.9;

      // Slight movement
      particle.position.y += Math.sin(t * 2 + index) * 0.002;
    });

    // Toxic gas effect
    gasParticles.forEach((particle) => {
      particle.life += 0.008;

      if (particle.life > 1) {
        particle.life = 0;
        particle.mesh.position.set(
          (Math.random() - 0.5) * 2,
          -2,
          (Math.random() - 0.5) * 2,
        );
        particle.velocity.set(
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.05,
          (Math.random() - 0.5) * 0.02,
        );
      }

      particle.mesh.position.add(particle.velocity);
      particle.velocity.y += 0.001; // Slight upward drift

      // Greenish toxic cloud appearance
      const opacity = Math.sin(particle.life * Math.PI) * 0.4;
      (particle.mesh.material as THREE.MeshStandardMaterial).opacity = opacity;

      // Scale variation
      const scale = 0.5 + particle.life * 0.8;
      particle.mesh.scale.setScalar(scale);
    });

    // Overall warning shake effect
    const shakeIntensity = Math.sin(t * 8) * 0.02;
    animationGroup.position.set(
      Math.random() * shakeIntensity,
      Math.random() * shakeIntensity,
      Math.random() * shakeIntensity,
    );

    // Color pulse on molecule atoms
    const pulsePhase = (Math.sin(t * 3) + 1) * 0.5;
    const warningColor = new THREE.Color().setHSL(
      0,
      0.8,
      0.3 + pulsePhase * 0.3,
    );

    (carbonAtom.material as THREE.MeshStandardMaterial).emissive = warningColor;
    (nitrogenAtom.material as THREE.MeshStandardMaterial).emissive =
      warningColor;
    (carbonAtom.material as THREE.MeshStandardMaterial).emissiveIntensity =
      pulsePhase * 0.3;
    (nitrogenAtom.material as THREE.MeshStandardMaterial).emissiveIntensity =
      pulsePhase * 0.3;
  };
};
