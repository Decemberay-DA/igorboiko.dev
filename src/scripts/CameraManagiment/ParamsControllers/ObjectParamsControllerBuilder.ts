import type { THREE } from "@/scripts/ThreeJS/THREE";
import { ObjectParamsController, type IApplyParamsTo } from "./IObjectsGroupeParametersController";
import { CameraControls } from "./CameraControlls";
import { Transforms } from "./Transforms";

/**
 * builder
 */
export class ObjectParamsControllerBuilder {
	public static forCameraCrane(crane: THREE.Object3D) {
		const transforms = new Transforms(crane);

		const params = new Array<IApplyParamsTo<THREE.Object3D>>(transforms);

		const craneControler = new ObjectParamsController(crane, params);

		return craneControler;
	}
	public static forCamera(camera: THREE.PerspectiveCamera) {
		const transforms = new Transforms(camera);
		const lense = new CameraControls(camera); // here apply smoothing somehow

		const params = new Array<IApplyParamsTo<THREE.PerspectiveCamera>>(lense, transforms);

		const cameraControler = new ObjectParamsController(camera, params);

		return cameraControler;
	}
}
