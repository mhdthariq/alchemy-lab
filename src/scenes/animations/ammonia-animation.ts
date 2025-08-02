import * as THREE from "three";
import { elements } from "@/lib/data";

export const createAmmoniaAnimation = (group: THREE.Group) => {
  // Get element data for Nitrogen and Hydrogen
  const nitrogenData = elements["N"];
  const hydrogenData = elements["H"];

  // Create the central Nitrogen atom
  const nitrogenGeometry = new THREE.SphereGeometry(nitrogenData.radius, 32, 32);
  const nitrogenMaterial = new THREE.MeshStandardMaterial({
    color: nitrogenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const nitrogenAtom = new THREE.Mesh(nitrogenGeometry, nitrogenMaterial);
  group.add(nitrogenAtom);

  // Create the three Hydrogen atoms
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

  const hydrogenAtom1 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
  const hydrogenAtom2 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
  const hydrogenAtom3 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);

  // Position Hydrogen atoms in a trigonal pyramidal arrangement (NH3 is pyramidal)
  const distance = 1.4; // N-H bond length
  const angle = 107; // H-N-H bond angle in degrees
  const angleRad = angle * (Math.PI / 180);

  // Position the three hydrogen atoms around nitrogen
  hydrogenAtom1.position.set(
    distance * Math.cos(0),
    distance * Math.sin(angleRad / 2),
    distance * Math.sin(0),
  );

  hydrogenAtom2.position.set(
    distance * Math.cos((2 * Math.PI) / 3),
    distance * Math.sin(angleRad / 2),
    distance * Math.sin((2 * Math.PI) / 3),
  );

  hydrogenAtom3.position.set(
    distance * Math.cos((4 * Math.PI) / 3),
    distance * Math.sin(angleRad / 2),
    distance * Math.sin((4 * Math.PI) / 3),
  );

  group.add(hydrogenAtom1);
  group.add(hydrogenAtom2);
  group.add(hydrogenAtom3);

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

  const bond1 = createBond(nitrogenAtom.position, hydrogenAtom1.position);
  const bond2 = createBond(nitrogenAtom.position, hydrogenAtom2.position);
  const bond3 = createBond(nitrogenAtom.position, hydrogenAtom3.position);

  group.add(bond1);
  group.add(bond2);
  group.add(bond3);

  // Add a visual indicator for the lone pair of electrons on nitrogen
  const lonePairGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const lonePairMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.3,
  });
  const lonePair = new THREE.Mesh(lonePairGeometry, lonePairMaterial);
  lonePair.position.set(0, -1.2, 0); // Position below nitrogen
  group.add(lonePair);

  // Add some industrial-style particles to represent the Haber process
  const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0x4444ff,
    transparent: true,
    opacity: 0.8,
  });

  for (let i = 0; i < 8; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 2.5;
    particle.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 0.5,
      Math.sin(angle) * radius
    );
    group.add(particle);

    // Animate particles in a spiral pattern
    const animateParticle = () => {
      const currentAngle = Math.atan2(particle.position.z, particle.position.x);
      const currentRadius = Math.sqrt(particle.position.x ** 2 + particle.position.z ** 2);
      const newRadius = currentRadius * 0.99;
      const newAngle = currentAngle + 0.05;

      particle.position.x = Math.cos(newAngle) * newRadius;
      particle.position.z = Math.sin(newAngle) * newRadius;
      particle.material.opacity *= 0.995;

      if (particle.material.opacity > 0.1 && newRadius > 0.5) {
        requestAnimationFrame(animateParticle);
      }
    };
    setTimeout(animateParticle, i * 200);
  }
};
