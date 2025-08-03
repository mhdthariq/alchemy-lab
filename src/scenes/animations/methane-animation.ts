import * as THREE from "three";
import { elements } from "@/lib/data";

export const createMethaneAnimation = (group: THREE.Group) => {
  // Get element data for Carbon and Hydrogen
  const carbonData = elements["C"];
  const hydrogenData = elements["H"];

  // Create the central Carbon atom
  const carbonGeometry = new THREE.SphereGeometry(carbonData.radius, 32, 32);
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: carbonData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
  group.add(carbonAtom);

  // Create the four Hydrogen atoms
  const hydrogenGeometry = new THREE.SphereGeometry(
    hydrogenData.radius,
    32,
    32,
  );
  const hydrogenMaterial = new THREE.MeshStandardMaterial({
    color: hydrogenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });

  const hydrogenAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const hydrogenAtom = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
    hydrogenAtoms.push(hydrogenAtom);
    group.add(hydrogenAtom);
  }

  // Position Hydrogen atoms in a tetrahedral arrangement (CH4 is tetrahedral)
  const distance = 1.5; // C-H bond length

  // Tetrahedral coordinates
  const positions = [
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(-1, -1, 1),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(1, -1, -1),
  ];

  positions.forEach((pos, i) => {
    pos.normalize().multiplyScalar(distance);
    hydrogenAtoms[i].position.copy(pos);
  });

  // Create bonds using thin cylinders
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.8,
  });

  /**
   * Helper function to create a cylinder mesh between two points.
   */
  const createBond = (pos1: THREE.Vector3, pos2: THREE.Vector3) => {
    const direction = new THREE.Vector3().subVectors(pos2, pos1);
    const orientation = new THREE.Matrix4();
    orientation.lookAt(pos1, pos2, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

    const bondGeometry = new THREE.CylinderGeometry(
      0.08,
      0.08,
      direction.length(),
      8,
    );
    const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
    bondMesh.applyMatrix4(orientation);
    bondMesh.position.copy(pos1).add(direction.multiplyScalar(0.5));
    return bondMesh;
  };

  // Create all C-H bonds
  hydrogenAtoms.forEach((hydrogen) => {
    const bond = createBond(carbonAtom.position, hydrogen.position);
    group.add(bond);
  });

  // Add glowing effect to represent natural gas
  const glowGeometry = new THREE.SphereGeometry(3, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x0088ff,
    transparent: true,
    opacity: 0.1,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  group.add(glow);

  // Add flame-like particles to represent combustion potential
  const particleGeometry = new THREE.SphereGeometry(0.04, 8, 8);
  const flameMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.8,
  });

  for (let i = 0; i < 12; i++) {
    const particle = new THREE.Mesh(particleGeometry, flameMaterial);
    const theta = (i / 12) * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 2 + Math.random() * 0.5;

    particle.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
    group.add(particle);

    // Animate particles to flicker like flames
    const animateFlame = () => {
      particle.position.y += 0.02;
      particle.scale.multiplyScalar(0.995);
      particle.material.opacity *= 0.99;

      // Add some random movement
      particle.position.x += (Math.random() - 0.5) * 0.01;
      particle.position.z += (Math.random() - 0.5) * 0.01;

      if (particle.material.opacity > 0.1 && particle.scale.x > 0.1) {
        requestAnimationFrame(animateFlame);
      }
    };
    setTimeout(animateFlame, i * 100);
  }

  // Add rotating glow effect
  let glowOpacity = 0.1;
  let increasing = true;
  const animateGlow = () => {
    if (increasing) {
      glowOpacity += 0.002;
      if (glowOpacity >= 0.2) increasing = false;
    } else {
      glowOpacity -= 0.002;
      if (glowOpacity <= 0.05) increasing = true;
    }
    glow.material.opacity = glowOpacity;
    glow.rotation.y += 0.01;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
};
