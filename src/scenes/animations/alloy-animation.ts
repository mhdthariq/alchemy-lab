import * as THREE from "three";
import { elements } from "@/lib/data";

export const createAlloyAnimation = (group: THREE.Group) => {
  // Get element data for Gold and Silver
  const goldData = elements["Au"];
  const silverData = elements["Ag"];

  // Create multiple gold atoms
  const goldGeometry = new THREE.SphereGeometry(goldData.radius, 32, 32);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: goldData.color,
    metalness: 0.8,
    roughness: 0.2,
  });

  const goldAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 8; i++) {
    const goldAtom = new THREE.Mesh(goldGeometry, goldMaterial);
    goldAtoms.push(goldAtom);
    group.add(goldAtom);
  }

  // Create multiple silver atoms
  const silverGeometry = new THREE.SphereGeometry(silverData.radius, 32, 32);
  const silverMaterial = new THREE.MeshStandardMaterial({
    color: silverData.color,
    metalness: 0.8,
    roughness: 0.2,
  });

  const silverAtoms: THREE.Mesh[] = [];
  for (let i = 0; i < 8; i++) {
    const silverAtom = new THREE.Mesh(silverGeometry, silverMaterial);
    silverAtoms.push(silverAtom);
    group.add(silverAtom);
  }

  // Initially position atoms in two separate groups
  goldAtoms.forEach((atom, i) => {
    const angle = (i / goldAtoms.length) * Math.PI * 2;
    const radius = 1.5;
    atom.position.set(
      Math.cos(angle) * radius - 2,
      (Math.random() - 0.5) * 0.5,
      Math.sin(angle) * radius,
    );
  });

  silverAtoms.forEach((atom, i) => {
    const angle = (i / silverAtoms.length) * Math.PI * 2;
    const radius = 1.5;
    atom.position.set(
      Math.cos(angle) * radius + 2,
      (Math.random() - 0.5) * 0.5,
      Math.sin(angle) * radius,
    );
  });

  // Create metallic bonds between atoms (represented as thin connections)
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.6,
    roughness: 0.4,
    transparent: true,
    opacity: 0.3,
  });

  const bonds: THREE.Mesh[] = [];
  const createBond = (pos1: THREE.Vector3, pos2: THREE.Vector3) => {
    const direction = new THREE.Vector3().subVectors(pos2, pos1);
    const orientation = new THREE.Matrix4();
    orientation.lookAt(pos1, pos2, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

    const bondGeometry = new THREE.CylinderGeometry(
      0.02,
      0.02,
      direction.length(),
      8,
    );
    const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
    bondMesh.applyMatrix4(orientation);
    bondMesh.position.copy(pos1).add(direction.multiplyScalar(0.5));
    return bondMesh;
  };

  // Add initial bonds within each metal group
  goldAtoms.forEach((atom1, i) => {
    goldAtoms.forEach((atom2, j) => {
      if (i < j && atom1.position.distanceTo(atom2.position) < 2.5) {
        const bond = createBond(atom1.position, atom2.position);
        bonds.push(bond);
        group.add(bond);
      }
    });
  });

  silverAtoms.forEach((atom1, i) => {
    silverAtoms.forEach((atom2, j) => {
      if (i < j && atom1.position.distanceTo(atom2.position) < 2.5) {
        const bond = createBond(atom1.position, atom2.position);
        bonds.push(bond);
        group.add(bond);
      }
    });
  });

  // Add heat effect particles
  const heatParticleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const heatParticleMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.6,
  });

  for (let i = 0; i < 15; i++) {
    const particle = new THREE.Mesh(heatParticleGeometry, heatParticleMaterial);
    const angle = (i / 15) * Math.PI * 2;
    const radius = 3 + Math.random() * 1;
    particle.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 4,
      Math.sin(angle) * radius,
    );
    group.add(particle);

    // Animate heat particles rising
    const animateHeat = () => {
      particle.position.y += 0.03;
      particle.material.opacity *= 0.995;
      particle.scale.multiplyScalar(1.005);

      // Add some random movement
      particle.position.x += (Math.random() - 0.5) * 0.02;
      particle.position.z += (Math.random() - 0.5) * 0.02;

      if (particle.material.opacity > 0.1 && particle.position.y < 6) {
        requestAnimationFrame(animateHeat);
      }
    };
    setTimeout(animateHeat, i * 200);
  }

  // Add glowing forge effect
  const forgeGlowGeometry = new THREE.SphereGeometry(4, 32, 32);
  const forgeGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.08,
  });
  const forgeGlow = new THREE.Mesh(forgeGlowGeometry, forgeGlowMaterial);
  group.add(forgeGlow);

  // Animate the mixing process
  let mixingProgress = 0;
  const allAtoms = [...goldAtoms, ...silverAtoms];

  // Store target positions for the mixed alloy
  const targetPositions: THREE.Vector3[] = [];
  allAtoms.forEach((atom, i) => {
    const phi = Math.acos(-1 + (2 * i) / allAtoms.length);
    const theta = Math.sqrt(allAtoms.length * Math.PI) * phi;
    const radius = 2;

    targetPositions.push(
      new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
      ),
    );
  });

  const animateMixing = () => {
    mixingProgress += 0.003;

    allAtoms.forEach((atom, i) => {
      const startPos = new THREE.Vector3().copy(
        atom.userData.startPos || atom.position,
      );
      const targetPos = targetPositions[i];

      if (!atom.userData.startPos) {
        atom.userData.startPos = atom.position.clone();
      }

      // Smoothly interpolate between start and target positions
      atom.position.lerpVectors(
        startPos,
        targetPos,
        Math.min(mixingProgress, 1),
      );

      // Add some random vibration to simulate thermal motion
      atom.position.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
        ),
      );
    });

    // Update bonds during mixing
    if (mixingProgress > 0.3) {
      // Remove old bonds
      bonds.forEach((bond) => {
        group.remove(bond);
        bond.geometry.dispose();
        if (Array.isArray(bond.material)) {
          bond.material.forEach((material) => material.dispose());
        } else {
          bond.material.dispose();
        }
      });
      bonds.length = 0;

      // Create new inter-metallic bonds
      allAtoms.forEach((atom1, i) => {
        allAtoms.forEach((atom2, j) => {
          if (i < j && atom1.position.distanceTo(atom2.position) < 1.8) {
            const bond = createBond(atom1.position, atom2.position);
            bonds.push(bond);
            group.add(bond);
          }
        });
      });
    }

    if (mixingProgress < 1.2) {
      requestAnimationFrame(animateMixing);
    }
  };

  // Start mixing after a delay
  setTimeout(animateMixing, 1000);

  // Animate the forge glow
  let glowIntensity = 0.08;
  let glowIncreasing = true;
  const animateForgeGlow = () => {
    if (glowIncreasing) {
      glowIntensity += 0.002;
      if (glowIntensity >= 0.2) glowIncreasing = false;
    } else {
      glowIntensity -= 0.002;
      if (glowIntensity <= 0.05) glowIncreasing = true;
    }
    forgeGlow.material.opacity = glowIntensity;
    forgeGlow.rotation.y += 0.01;
    requestAnimationFrame(animateForgeGlow);
  };
  animateForgeGlow();

  // Add sparks effect during mixing
  const sparkGeometry = new THREE.SphereGeometry(0.02, 6, 6);
  const sparkMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 1,
  });

  const createSpark = () => {
    const spark = new THREE.Mesh(sparkGeometry, sparkMaterial.clone());
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 2;

    spark.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 2,
      Math.sin(angle) * radius,
    );

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      Math.random() * 0.3,
      (Math.random() - 0.5) * 0.2,
    );

    group.add(spark);

    const animateSpark = () => {
      spark.position.add(velocity);
      velocity.y -= 0.01; // Gravity
      spark.material.opacity *= 0.95;
      spark.scale.multiplyScalar(0.98);

      if (spark.material.opacity < 0.1) {
        group.remove(spark);
        spark.geometry.dispose();
        if (Array.isArray(spark.material)) {
          spark.material.forEach((material) => material.dispose());
        } else {
          spark.material.dispose();
        }
      } else {
        requestAnimationFrame(animateSpark);
      }
    };
    animateSpark();
  };

  // Create sparks periodically during mixing
  const sparkInterval = setInterval(() => {
    if (mixingProgress > 0.2 && mixingProgress < 1) {
      createSpark();
    } else if (mixingProgress >= 1) {
      clearInterval(sparkInterval);
    }
  }, 300);
};
