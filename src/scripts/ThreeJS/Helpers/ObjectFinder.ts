import * as THREE from "three";

export default class ObjectFinder {
	public static ByUserData(
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
}
