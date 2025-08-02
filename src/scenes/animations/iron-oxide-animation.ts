import * as THREE from "three";
import { elements } from "@/lib/data";

export const createIronOxideAnimation = (group: THREE.Group) => {
  // Get element data for Iron and Oxygen
  const ironData = elements["Fe"];
  const oxygenData = elements["O"];

  // Create the Iron atoms (2 Fe atoms for Fe2O3)
  const ironGeometry = new THREE.SphereGeometry(ironData.radius, 32, 32);
  const ironMaterial = new THREE.MeshStandardMaterial({
    color: ironData.color,
    metalness: 0.7,
    roughness: 0.3,
  });

  const ironAtom1 = new THREE.Mesh(ironGeometry, ironMaterial);
  const ironAtom2 = new THREE.Mesh(ironGeometry, ironMaterial);

  // Position iron atoms
  ironAtom1.position.set(-1.5, 0, 0);
  ironAtom2.position.set(1.5, 0, 0);

  group.add(ironAtom1);
  group.add(ironAtom2);

  // Create the Oxygen atoms (3 O atoms for Fe2O3)
  const oxygenGeometry = new THREE.SphereGeometry(oxygenData.radius, 32, 32);
  const oxygenMaterial = new THREE.MeshStandardMaterial({
    color: oxygenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });

  const oxygenAtom1 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
  const oxygenAtom2 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
  const oxygenAtom3 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);

  // Position oxygen atoms in a trigonal arrangement
  oxygenAtom1.position.set(0, 1.2, 0);
  oxygenAtom2.position.set(-0.6, -1.2, 1);
  oxygenAtom3.position.set(0.6, -1.2, -1);

  group.add(oxygenAtom1);
  group.add(oxygenAtom2);
  group.add(oxygenAtom3);

  // Create bonds
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0x996633, // Rusty brown color for bonds
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
      0.06,
      0.06,
      direction.length(),
      8,
    );
    const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
    bondMesh.applyMatrix4(orientation);
    bondMesh.position.copy(pos1).add(direction.multiplyScalar(0.5));
    return bondMesh;
  };

  // Create Fe-O bonds
  const bond1 = createBond(ironAtom1.position, oxygenAtom1.position);
  const bond2 = createBond(ironAtom1.position, oxygenAtom2.position);
  const bond3 = createBond(ironAtom2.position, oxygenAtom1.position);
  const bond4 = createBond(ironAtom2.position, oxygenAtom3.position);
  const bond5 = createBond(oxygenAtom2.position, oxygenAtom3.position);

  group.add(bond1);
  group.add(bond2);
  group.add(bond3);
  group.add(bond4);
  group.add(bond5);

  // Add rust particles to simulate the corrosion process
  const rustParticleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const rustParticleMaterial = new THREE.MeshBasicMaterial({
    color: 0xcc6633,
    transparent: true,
    opacity: 0.7,
  });

  for (let i = 0; i < 20; i++) {
    const particle = new THREE.Mesh(rustParticleGeometry, rustParticleMaterial);
    const angle = (i / 20) * Math.PI * 2;
    const radius = 2.5 + Math.random() * 0.5;
    const height = (Math.random() - 0.5) * 3;

    particle.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    group.add(particle);

    // Animate rust particles falling like rust flakes
    const animateRust = () => {
      particle.position.y -= 0.02;
      particle.rotation.x += 0.05;
      particle.rotation.z += 0.03;
      particle.material.opacity *= 0.995;

      // Add some drift
      particle.position.x += (Math.random() - 0.5) * 0.01;
      particle.position.z += (Math.random() - 0.5) * 0.01;

      if (particle.material.opacity > 0.1 && particle.position.y > -5) {
        requestAnimationFrame(animateRust);
      }
    };
    setTimeout(animateRust, i * 150);
  }

  // Add oxidation cloud effect
  const oxidationGeometry = new THREE.SphereGeometry(3, 16, 16);
  const oxidationMaterial = new THREE.MeshBasicMaterial({
    color: 0x884422,
    transparent: true,
    opacity: 0.05,
  });
  const oxidationCloud = new THREE.Mesh(oxidationGeometry, oxidationMaterial);
  group.add(oxidationCloud);

  // Add corrosion effect around iron atoms
  for (let i = 0; i < 2; i++) {
    const ironAtom = i === 0 ? ironAtom1 : ironAtom2;
    const corrosionGeometry = new THREE.SphereGeometry(ironData.radius * 1.3, 16, 16);
    const corrosionMaterial = new THREE.MeshBasicMaterial({
      color: 0xaa4422,
      transparent: true,
      opacity: 0.2,
    });
    const corrosion = new THREE.Mesh(corrosionGeometry, corrosionMaterial);
    corrosion.position.copy(ironAtom.position);
    group.add(corrosion);

    // Animate corrosion growth
    let corrosionScale = 1;
    let growthDirection = 1;
    const animateCorrosion = () => {
      corrosionScale += growthDirection * 0.005;
      if (corrosionScale > 1.3) growthDirection = -1;
      if (corrosionScale < 0.9) growthDirection = 1;

      corrosion.scale.set(corrosionScale, corrosionScale, corrosionScale);
      corrosion.rotation.y += 0.01;
      requestAnimationFrame(animateCorrosion);
    };
    animateCorrosion();
  }

  // Animate the main oxidation cloud
  let cloudOpacity = 0.05;
  let cloudIncreasing = true;
  const animateCloud = () => {
    if (cloudIncreasing) {
      cloudOpacity += 0.001;
      if (cloudOpacity >= 0.15) cloudIncreasing = false;
    } else {
      cloudOpacity -= 0.001;
      if (cloudOpacity <= 0.02) cloudIncreasing = true;
    }
    oxidationCloud.material.opacity = cloudOpacity;
    oxidationCloud.rotation.y += 0.005;
    oxidationCloud.rotation.x += 0.002;
    requestAnimationFrame(animateCloud);
  };
  animateCloud();

  // Change iron atom colors over time to simulate rusting
  let rustProgress = 0;
  const rustIron = () => {
    rustProgress += 0.002;
    const rustColor = new THREE.Color().lerpColors(
      new THREE.Color(ironData.color),
      new THREE.Color(0x996633),
      Math.min(rustProgress, 1)
    );
    ironAtom1.material.color.copy(rustColor);
    ironAtom2.material.color.copy(rustColor);

    if (rustProgress < 1) {
      requestAnimationFrame(rustIron);
    }
  };
  setTimeout(rustIron, 1000);
};
