import * as THREE from "three";
import { elements } from "@/lib/data";

export const createCarbonDioxideAnimation = (group: THREE.Group) => {
  // Get element data for Carbon and Oxygen
  const carbonData = elements["C"];
  const oxygenData = elements["O"];

  // Create the central Carbon atom
  const carbonGeometry = new THREE.SphereGeometry(carbonData.radius, 32, 32);
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: carbonData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
  group.add(carbonAtom);

  // Create the two Oxygen atoms
  const oxygenGeometry = new THREE.SphereGeometry(oxygenData.radius, 32, 32);
  const oxygenMaterial = new THREE.MeshStandardMaterial({
    color: oxygenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });

  const oxygenAtom1 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
  const oxygenAtom2 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);

  // Position Oxygen atoms in a linear arrangement (CO2 is linear)
  const distance = 2.0;
  oxygenAtom1.position.set(-distance, 0, 0);
  oxygenAtom2.position.set(distance, 0, 0);

  group.add(oxygenAtom1);
  group.add(oxygenAtom2);

  // Create double bonds (two cylinders per bond for CO2)
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.8,
  });

  /**
   * Helper function to create a cylinder mesh between two points.
   */
  const createBond = (pos1: THREE.Vector3, pos2: THREE.Vector3, offset: number = 0) => {
    const direction = new THREE.Vector3().subVectors(pos2, pos1);
    const orientation = new THREE.Matrix4();
    orientation.lookAt(pos1, pos2, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

    const bondGeometry = new THREE.CylinderGeometry(
      0.06,
      0.06,
      direction.length(),
      8,
    );
    const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
    bondMesh.applyMatrix4(orientation);
    bondMesh.position.copy(pos1).add(direction.multiplyScalar(0.5));

    // Offset for double bonds
    if (offset !== 0) {
      bondMesh.position.y += offset;
    }

    return bondMesh;
  };

  // Create double bonds (C=O=C structure)
  // Left side double bond
  const bond1a = createBond(carbonAtom.position, oxygenAtom1.position, 0.1);
  const bond1b = createBond(carbonAtom.position, oxygenAtom1.position, -0.1);

  // Right side double bond
  const bond2a = createBond(carbonAtom.position, oxygenAtom2.position, 0.1);
  const bond2b = createBond(carbonAtom.position, oxygenAtom2.position, -0.1);

  group.add(bond1a);
  group.add(bond1b);
  group.add(bond2a);
  group.add(bond2b);

  // Add some particles to show the exothermic reaction
  const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.7,
  });

  for (let i = 0; i < 10; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    const angle = (i / 10) * Math.PI * 2;
    const radius = 3;
    particle.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (Math.random() - 0.5) * 2
    );
    group.add(particle);

    // Animate particles outward
    const animateParticle = () => {
      particle.position.multiplyScalar(1.02);
      particle.material.opacity *= 0.98;
      if (particle.material.opacity > 0.01) {
        requestAnimationFrame(animateParticle);
      }
    };
    setTimeout(animateParticle, i * 100);
  }
};
