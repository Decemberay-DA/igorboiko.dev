import * as THREE from "three";

import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { array, option } from "fp-ts";
import { includes } from "fp-ts/lib/string";

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

	static byUserDatac =
		(propertyName: string) =>
		(propertyValue: string) =>
		(scene: THREE.Object3D): THREE.Object3D[] => {
			const matchingObjects: THREE.Object3D[] = [];

			scene.traverse((child) => {
				if (child.userData && child.userData[propertyName] === propertyValue) {
					matchingObjects.push(child);
				}
			});

			return matchingObjects;
		};
	static byIncludedName =
		(name: string) =>
		(scene: THREE.Object3D): THREE.Object3D[] => {
			const matchingObjects: THREE.Object3D[] = [];

			scene.traverse((child) => {
				if (child && child.name.includes(name)) {
					matchingObjects.push(child);
				}
			});

			return matchingObjects;
		};

	public static getAllMeshesFromScene(scene: THREE.Scene): THREE.Mesh[] {
		return pipe(
			scene.children,
			array.filterMap(
				(object): O.Option<THREE.Mesh> => (object instanceof THREE.Mesh ? O.some(object) : O.none)
			)
		);
	}
}
