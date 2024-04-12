import * as THREE from "three";
import { Lerper } from "../Lerper";
import type { IObjectParametersController } from "./IObjectParametersController";

export interface ITransforms {
	position: THREE.Vector3;
	quaternion: THREE.Quaternion;
	scale: THREE.Vector3;
}
export class IITransforms {
	public static fromObject3D(object: THREE.Object3D): ITransforms {
		const result: ITransforms = {
			position: object.position,
			quaternion: object.quaternion,
			scale: object.scale,
		};
		return result;
	}
}
export interface ITransformsParams {
	position?: THREE.Vector3;
	quaternion?: THREE.Quaternion;
	scale?: THREE.Vector3;
}
/**
 * Dataclass custom transform descriptions
 */
export class Transforms implements ITransforms, IObjectParametersController<ITransforms, THREE.Object3D> {
	public position: THREE.Vector3;
	public quaternion: THREE.Quaternion;
	public scale: THREE.Vector3;

	public constructor(refObject: THREE.Object3D);
	public constructor(params: ITransformsParams);
	public constructor(arg: THREE.Object3D | ITransformsParams) {
		if (arg instanceof THREE.Object3D) {
			this.position = arg.position.clone();
			this.quaternion = arg.quaternion.clone();
			this.scale = arg.scale.clone();
		} else {
			this.position = arg.position ?? new THREE.Vector3(0, 0, 0);
			this.quaternion = arg.quaternion ?? new THREE.Quaternion();
			this.scale = arg.scale ?? new THREE.Vector3(1, 1, 1);
		}
	}

	public lerpBetween(start: ITransforms, end: ITransforms, factor: number): Transforms {
		const result: ITransforms = {
			position: Lerper.lerpVector3(start.position, end.position, factor),
			quaternion: Lerper.lerpQuaternion(start.quaternion, end.quaternion, factor),
			scale: Lerper.lerpVector3(start.scale, end.scale, factor),
		};
		return new Transforms(result);
	}
	public applyParamsTo(object: THREE.Object3D) {
		object.position.copy(this.position);
		object.quaternion.copy(this.quaternion);
		object.scale.copy(this.scale);

		object.updateMatrixWorld();
	}
}
