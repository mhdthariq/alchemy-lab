import * as THREE from "three";
import { elements } from "@/lib/data";

export const createWaterAnimation = (group: THREE.Group) => {
  // Get element data for Oxygen and Hydrogen
  const oxygenData = elements["O"];
  const hydrogenData = elements["H"];

  // Create the central Oxygen atom
  const oxygenGeometry = new THREE.SphereGeometry(oxygenData.radius, 32, 32);
  const oxygenMaterial = new THREE.MeshStandardMaterial({
    color: oxygenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const oxygenAtom = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
  group.add(oxygenAtom);

  // Create the two Hydrogen atoms
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

  // Position Hydrogen atoms based on the ~104.5 degree bond angle of water
  const angle = 104.5 * (Math.PI / 180); // Convert degrees to radians
  const distance = 1.5; // A visual distance, not scientifically accurate

  hydrogenAtom1.position.set(
    distance * Math.cos(angle / 2),
    distance * Math.sin(angle / 2),
    0,
  );
  hydrogenAtom2.position.set(
    distance * Math.cos(-angle / 2),
    distance * Math.sin(-angle / 2),
    0,
  );

  group.add(hydrogenAtom1);
  group.add(hydrogenAtom2);

  // Create "bonds" using thin cylinders to connect the atoms
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

  const bond1 = createBond(oxygenAtom.position, hydrogenAtom1.position);
  const bond2 = createBond(oxygenAtom.position, hydrogenAtom2.position);

  group.add(bond1);
  group.add(bond2);
};
