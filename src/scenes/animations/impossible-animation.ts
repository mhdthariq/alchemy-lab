import * as THREE from "three";

export const createImpossibleAnimation = (group: THREE.Group) => {
  // Create a visual representation of an impossible reaction
  // This will show two atoms trying to react but failing

  // Create two atoms that represent the unreactive elements
  const atom1Geometry = new THREE.SphereGeometry(0.8, 32, 32);
  const atom1Material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0x002244,
  });
  const atom1 = new THREE.Mesh(atom1Geometry, atom1Material);
  atom1.position.set(-2, 0, 0);
  group.add(atom1);

  const atom2Geometry = new THREE.SphereGeometry(0.8, 32, 32);
  const atom2Material = new THREE.MeshStandardMaterial({
    color: 0xff6666,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0x442200,
  });
  const atom2 = new THREE.Mesh(atom2Geometry, atom2Material);
  atom2.position.set(2, 0, 0);
  group.add(atom2);

  // Create electron shells to show complete outer shells (noble gas configuration)
  const shellGeometry = new THREE.RingGeometry(1.2, 1.3, 32);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: 0x88ffff,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });

  const shell1 = new THREE.Mesh(shellGeometry, shellMaterial);
  shell1.position.copy(atom1.position);
  shell1.rotation.x = Math.PI / 4;
  group.add(shell1);

  const shell2 = new THREE.Mesh(shellGeometry, shellMaterial.clone());
  shell2.material.color.setHex(0xff8888);
  shell2.position.copy(atom2.position);
  shell2.rotation.x = Math.PI / 4;
  group.add(shell2);

  // Create "X" symbols to show the reaction cannot occur
  const createX = (position: THREE.Vector3, color: number) => {
    const xGroup = new THREE.Group();

    const lineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8);
    const lineMaterial = new THREE.MeshBasicMaterial({ color });

    const line1 = new THREE.Mesh(lineGeometry, lineMaterial);
    line1.rotation.z = Math.PI / 4;

    const line2 = new THREE.Mesh(lineGeometry, lineMaterial);
    line2.rotation.z = -Math.PI / 4;

    xGroup.add(line1);
    xGroup.add(line2);
    xGroup.position.copy(position);
    xGroup.position.y += 1.5;

    return xGroup;
  };

  const x1 = createX(atom1.position, 0xff0000);
  const x2 = createX(atom2.position, 0xff0000);
  group.add(x1);
  group.add(x2);

  // Create repulsion force visualization
  const repulsionGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const repulsionMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4444,
    transparent: true,
    opacity: 0.6,
  });

  for (let i = 0; i < 8; i++) {
    const repulsionParticle = new THREE.Mesh(repulsionGeometry, repulsionMaterial);
    const angle = (i / 8) * Math.PI * 2;
    repulsionParticle.position.set(
      Math.cos(angle) * 0.5,
      0,
      Math.sin(angle) * 0.5
    );
    group.add(repulsionParticle);

    // Animate repulsion particles moving outward
    const animateRepulsion = () => {
      const distance = Math.sqrt(
        repulsionParticle.position.x ** 2 +
        repulsionParticle.position.z ** 2
      );

      if (distance < 3) {
        repulsionParticle.position.x *= 1.02;
        repulsionParticle.position.z *= 1.02;
        repulsionParticle.material.opacity *= 0.98;
        requestAnimationFrame(animateRepulsion);
      }
    };
    setTimeout(animateRepulsion, i * 100);
  }

  // Create "NO REACTION" text effect using particles
  const textParticleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const textParticleMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.8,
  });

  // Create particles that spell out "NO" above the atoms
  const noPositions = [
    // N
    [-0.8, 2.5, 0], [-0.8, 2.3, 0], [-0.8, 2.1, 0], [-0.8, 1.9, 0],
    [-0.6, 2.5, 0], [-0.4, 2.3, 0], [-0.2, 2.1, 0], [0, 1.9, 0],
    [0, 2.1, 0], [0, 2.3, 0], [0, 2.5, 0],
    // O
    [0.4, 2.5, 0], [0.6, 2.5, 0], [0.8, 2.3, 0], [0.8, 2.1, 0],
    [0.6, 1.9, 0], [0.4, 1.9, 0], [0.2, 2.1, 0], [0.2, 2.3, 0],
  ];

  noPositions.forEach((pos, i) => {
    const particle = new THREE.Mesh(textParticleGeometry, textParticleMaterial);
    particle.position.set(pos[0], pos[1], pos[2]);
    group.add(particle);

    // Animate text particles to fade and fall
    const animateText = () => {
      particle.position.y -= 0.01;
      particle.material.opacity *= 0.995;
      if (particle.material.opacity > 0.1) {
        requestAnimationFrame(animateText);
      }
    };
    setTimeout(animateText, i * 50);
  });

  // Animate the electron shells rotating
  const animateShells = () => {
    shell1.rotation.y += 0.02;
    shell1.rotation.z += 0.01;
    shell2.rotation.y -= 0.02;
    shell2.rotation.z -= 0.01;
    requestAnimationFrame(animateShells);
  };
  animateShells();

  // Animate the X symbols pulsing
  const animateX = () => {
    const scale = 1 + 0.3 * Math.sin(Date.now() * 0.01);
    x1.scale.set(scale, scale, scale);
    x2.scale.set(scale, scale, scale);
    requestAnimationFrame(animateX);
  };
  animateX();

  // Add barrier effect between atoms
  const barrierGeometry = new THREE.PlaneGeometry(0.5, 2);
  const barrierMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
  barrier.position.set(0, 0, 0);
  barrier.rotation.y = Math.PI / 2;
  group.add(barrier);

  // Animate barrier flickering
  let barrierOpacity = 0.3;
  let increasing = true;
  const animateBarrier = () => {
    if (increasing) {
      barrierOpacity += 0.01;
      if (barrierOpacity >= 0.6) increasing = false;
    } else {
      barrierOpacity -= 0.01;
      if (barrierOpacity <= 0.1) increasing = true;
    }
    barrier.material.opacity = barrierOpacity;
    requestAnimationFrame(animateBarrier);
  };
  animateBarrier();
};
