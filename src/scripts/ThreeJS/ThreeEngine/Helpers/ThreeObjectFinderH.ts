import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import type { TGLTFAsset } from "../../GLTFPipline/TGLTFAsset";
import { array, option } from "fp-ts";

export class ThreeObjectFinderH {
	public static byUserData(
		scene: THREE.Object3D,
		propertyName: string,
		propertyValue: string
	): THREE.Object3D[] {
		const matchingObjects: THREE.Object3D[] = [];

		scene.traverse((child) => {
			if (child.userData && child.userData[propertyName] === propertyValue) {
				matchingObjects.push(child);
			}
		});

		return matchingObjects;
	}

	public static byUserDataGLTF(
		scene: THREE.Object3D,
		// gltfScene: GLTF,
		propertyName: string,
		propertyValue: string
	): THREE.Object3D[] {
		const matchingObjects: THREE.Object3D[] = [];

		scene.traverse((child) => {
			if (child as TGLTFAsset) {
				const gltfChild = child as TGLTFAsset;
				gltfChild.extras[propertyName] === propertyValue;
				matchingObjects.push(child);
			}
		});

		return matchingObjects;
	}

	public static getAllMeshesFromScene(scene: THREE.Scene): THREE.Mesh[] {
		return pipe(
			scene.children,
			array.filterMap(
				(object): O.Option<THREE.Mesh> => (object instanceof THREE.Mesh ? O.some(object) : O.none)
			)
		);
	}
}
