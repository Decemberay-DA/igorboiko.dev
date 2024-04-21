import * as THREE from "three";
import type { TDataRecord } from "../TDataRecord";
import type { ICameraControls } from "./ICameraControls";

/**
 * state of camera lense things
 */
export class CameraControls implements ICameraControls, TDataRecord<THREE.PerspectiveCamera, CameraControls> {
	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;
	public zoom: number;

	public constructor(params: ICameraControls) {
		this.fov = params.fov;
		this.aspect = params.aspect;
		this.near = params.near;
		this.far = params.far;
		this.zoom = params.zoom;
	}

	public applyParamsTo(camera: THREE.PerspectiveCamera): void {
		camera.fov = this.fov;
		camera.aspect = this.aspect;
		camera.near = this.near;
		camera.far = this.far;
		camera.zoom = this.zoom;

		camera.updateProjectionMatrix();
	}
	public clone(): CameraControls {
		return new CameraControls(this);
	}
}
