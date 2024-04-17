import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

export class ObjectFinder {
	public static ByUserData(
		scene: THREE.Object3D,
		propertyName: string,
		propertyValue: string
	): THREE.Object3D[] {
		const matchingObjects: THREE.Object3D[] = [];

		scene.traverse((child) => {
			console.warn(child.userData);
			console.warn(
				"property: " +
					propertyName +
					" searchedValue: " +
					propertyValue +
					" realValue: " +
					child.userData[propertyName] +
					" result: " +
					(child.userData[propertyName] === propertyValue)
			);
			if (child.userData && child.userData[propertyName] === propertyValue) {
				matchingObjects.push(child);
			}
		});
		console.warn(
			"ObjectFinder: found " +
				matchingObjects.length +
				" objects of property: " +
				propertyName +
				" with searchedValue: " +
				propertyValue
		);

		return matchingObjects;
	}
	public static ByUserDataGLTF(
		gltfScene: GLTF,
		propertyName: string,
		propertyValue: string
	): THREE.Object3D[] {
		const matchingObjects: THREE.Object3D[] = [];

		gltfScene.scene.traverse((child) => {
			if (child as GLTFAsset) {
				const gltfChild = child as GLTFAsset;
				gltfChild.extras[propertyName] === propertyValue;
				matchingObjects.push(child);
			}
		});

		return matchingObjects;
	}
	public static getAllMeshesFromScene(scene: THREE.Scene): THREE.Mesh[] {
		const meshes: THREE.Mesh[] = [];

		scene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				meshes.push(object);
			}
		});

		return meshes;
	}
}

export interface GLTFAsset {
	copyright?: string | undefined;
	generator?: string | undefined;
	version?: string | undefined;
	minVersion?: string | undefined;
	extensions?: any;
	extras?: any;
}
