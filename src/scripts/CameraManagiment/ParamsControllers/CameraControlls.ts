import * as THREE from "three";
import { Lerper } from "../Lerper";
import type { IObjectParametersController } from "./IObjectParametersController";

export interface ICameraControllsParams {
	// THREE.PerspectiveCamera
	fov?: number;
	aspect?: number;
	near?: number;
	far?: number;
	zoom?: number;
	// focus: number;

	// THREE.Camera

	// matrixWorldInverse: THREE.Matrix4;
	// projectionMatrix: THREE.Matrix4;

	// projectionMatrixInverse: THREE.Matrix4;
	// coordinateSystem: THREE.CoordinateSystem;
}
export interface ICameraControls {
	fov: number;
	aspect: number;
	near: number;
	far: number;
	zoom: number;
}
export class IICameraControls {
	public static fromCamera(camera: THREE.PerspectiveCamera): ICameraControllsParams {
		const result: ICameraControls = {
			fov: camera.fov,
			aspect: camera.aspect,
			near: camera.near,
			far: camera.far,
			zoom: camera.zoom,
		};
		return result;
	}
}
export class CameraControlls
	implements ICameraControls, IObjectParametersController<ICameraControls, THREE.PerspectiveCamera>
{
	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;
	public zoom: number;

	public constructor(camera: THREE.PerspectiveCamera);
	public constructor(params: ICameraControllsParams);
	public constructor(arg: THREE.PerspectiveCamera | ICameraControllsParams) {
		if (arg instanceof THREE.PerspectiveCamera) {
			this.fov = arg.fov;
			this.aspect = arg.aspect;
			this.near = arg.near;
			this.far = arg.far;
			this.zoom = arg.zoom;
		} else {
			this.fov = arg.fov ?? 40;
			this.aspect = arg.aspect ?? 40;
			this.near = arg.near ?? 40;
			this.far = arg.far ?? 40;
			this.zoom = arg.zoom ?? 40;
		}
	}
	public lerpBetween(start: ICameraControls, end: ICameraControls, factor: number): ICameraControls {
		const result: ICameraControls = {
			fov: Lerper.lerpNumber(start.fov, end.fov, factor),
			aspect: Lerper.lerpNumber(start.aspect, end.aspect, factor),
			near: Lerper.lerpNumber(start.near, end.near, factor),
			far: Lerper.lerpNumber(start.far, end.far, factor),
			zoom: Lerper.lerpNumber(start.zoom, end.zoom, factor),
		};
		return result;
	}
	public applyParamsTo(camera: THREE.PerspectiveCamera): void {
		camera.fov = this.fov;
		camera.aspect = this.aspect;
		camera.near = this.near;
		camera.far = this.far;
		camera.zoom = this.zoom;

		camera.updateProjectionMatrix();
	}
}
