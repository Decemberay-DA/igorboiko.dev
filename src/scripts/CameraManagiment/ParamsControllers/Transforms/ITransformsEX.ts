import * as THREE from "three";
import type ITransforms from "./ITransforms";

export default class ITransformsEX {
	public static newIdentity(): ITransforms {
		const result: ITransforms = {
			position: new THREE.Vector3(),
			quaternion: new THREE.Quaternion(),
			scale: new THREE.Vector3(),
		};
		return result;
	}
	public static newFromObject3DSeparete(object: THREE.Object3D): ITransforms {
		const result: ITransforms = {
			position: object.position.clone(),
			quaternion: object.quaternion.clone(),
			scale: object.scale.clone(),
		};
		return result;
	}
	public static newFromObject3DLinked(object: THREE.Object3D): ITransforms {
		const result: ITransforms = {
			position: object.position,
			quaternion: object.quaternion,
			scale: object.scale,
		};
		return result;
	}
}
