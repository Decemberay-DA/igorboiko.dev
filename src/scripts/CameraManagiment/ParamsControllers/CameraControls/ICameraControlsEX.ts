import * as THREE from "three";
import type ICameraControls from "./ICameraControls";

export default class ICameraControlsEX {
	public static newFromCamera(camera: THREE.PerspectiveCamera): ICameraControls {
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
