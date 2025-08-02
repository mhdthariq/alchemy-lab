import * as THREE from "three";
import { elements } from "@/lib/data";

export const createCarbonMonoxideAnimation = (group: THREE.Group) => {
  // Get element data
  const carbonData = elements["C"];
  const oxygenData = elements["O"];

  // Create the Carbon atom
  const carbonGeometry = new THREE.SphereGeometry(carbonData.radius, 32, 32);
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: carbonData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
  carbonAtom.position.x = -0.8; // Position to the left
  group.add(carbonAtom);

  // Create the Oxygen atom
  const oxygenGeometry = new THREE.SphereGeometry(oxygenData.radius, 32, 32);
  const oxygenMaterial = new THREE.MeshStandardMaterial({
    color: oxygenData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const oxygenAtom = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
  oxygenAtom.position.x = 0.8; // Position to the right
  group.add(oxygenAtom);

  // Create the bond between them
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.8,
  });
  const direction = new THREE.Vector3().subVectors(
    oxygenAtom.position,
    carbonAtom.position,
  );
  const orientation = new THREE.Matrix4();
  orientation.lookAt(
    carbonAtom.position,
    oxygenAtom.position,
    new THREE.Object3D().up,
  );
  orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

  const bondGeometry = new THREE.CylinderGeometry(
    0.1,
    0.1,
    direction.length(),
    8,
  );
  const bondMesh = new THREE.Mesh(bondGeometry, bondMaterial);
  bondMesh.applyMatrix4(orientation);
  bondMesh.position
    .copy(carbonAtom.position)
    .add(direction.multiplyScalar(0.5));

  group.add(bondMesh);
};
