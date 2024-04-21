import * as THREE from "three";
import type { TDataRecord } from "../TDataRecord";
import type ITransforms from "./ITransforms";

/**
 * Object transform state
 */
export default class Transforms implements ITransforms, TDataRecord<THREE.Object3D, Transforms> {
	public position: THREE.Vector3;
	public quaternion: THREE.Quaternion;
	public scale: THREE.Vector3;

	public constructor(transforms: ITransforms) {
		this.position = transforms.position.clone();
		this.quaternion = transforms.quaternion.clone();
		this.scale = transforms.scale.clone();
	}

	public applyParamsTo(object: THREE.Object3D) {
		object.position.copy(this.position);
		object.quaternion.copy(this.quaternion);
		object.scale.copy(this.scale);

		object.updateMatrixWorld();
	}

	public clone(): Transforms {
		return new Transforms(this);
	}
}
