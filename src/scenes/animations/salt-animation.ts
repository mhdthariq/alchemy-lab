import * as THREE from "three";
import { elements } from "@/lib/data";

export const createSaltAnimation = (group: THREE.Group) => {
  // Get element data for Sodium and Chlorine
  const sodiumData = elements["Na"];
  const chlorineData = elements["Cl"];

  // Create Sodium atom
  const sodiumGeometry = new THREE.SphereGeometry(sodiumData.radius, 32, 32);
  const sodiumMaterial = new THREE.MeshStandardMaterial({
    color: sodiumData.color,
    metalness: 0.7,
    roughness: 0.3,
  });
  const sodiumAtom = new THREE.Mesh(sodiumGeometry, sodiumMaterial);
  // Make position to the left
  sodiumAtom.position.x = -1.2;
  group.add(sodiumAtom);

  // Create Chlorine atom
  const chlorineGeometry = new THREE.SphereGeometry(
    chlorineData.radius,
    32,
    32,
  );
  const chlorineMaterial = new THREE.MeshStandardMaterial({
    color: chlorineData.color,
    metalness: 0.3,
    roughness: 0.5,
  });
  const chlorineAtom = new THREE.Mesh(chlorineGeometry, chlorineMaterial);
  // Make position to the right
  chlorineAtom.position.x = 1.2;
  group.add(chlorineAtom);

  // Create the ionic bond between them
  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.8,
  });
  const direction = new THREE.Vector3().subVectors(
    chlorineAtom.position,
    sodiumAtom.position,
  );
  const orientation = new THREE.Matrix4();
  orientation.lookAt(
    sodiumAtom.position,
    chlorineAtom.position,
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
    .copy(sodiumAtom.position)
    .add(direction.multiplyScalar(0.5));

  group.add(bondMesh);
};
