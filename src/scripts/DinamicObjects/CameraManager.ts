import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import type { TJ } from "../ThreeJS";

export class Lerper {
	public static lerpNumber(start: number, end: number, t: number): number {
		return start * (1 - t) + end * t;
	}
}
export interface ICameraControllsParams {
	// THREE.PerspectiveCamera
	fov?: number;
	aspect?: number;
	near?: number;
	far?: number;
	zoom: number;
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
export class CameraControlls implements ICameraControls {
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
	public lerp(start: ICameraControls, end: ICameraControls, factor: number): ICameraControls {
		const result: ICameraControls = {
			fov: Lerper.lerpNumber(start.fov, end.fov, factor),
			aspect: Lerper.lerpNumber(start.aspect, end.aspect, factor),
			near: Lerper.lerpNumber(start.near, end.near, factor),
			far: Lerper.lerpNumber(start.far, end.far, factor),
			zoom: Lerper.lerpNumber(start.zoom, end.zoom, factor),
		};
		return result;
	}
	public applyTo(camera: THREE.PerspectiveCamera): void {
		camera.fov = this.fov;
		camera.aspect = this.aspect;
		camera.near = this.near;
		camera.far = this.far;
		camera.zoom = this.zoom;

		camera.updateProjectionMatrix();
	}
}

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
export class Transforms implements ITransforms {
	public position: THREE.Vector3;
	public quaternion: THREE.Quaternion;
	public scale: THREE.Vector3;

	public constructor(object: THREE.Object3D);
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

	public static lerp(start: ITransforms, end: ITransforms, factor: number): Transforms {
		const result: ITransforms = {
			position: start.position.clone().lerp(end.position, factor),
			quaternion: start.quaternion.clone().slerp(end.quaternion, factor),
			scale: start.scale.clone().lerp(end.scale, factor),
		};
		return new Transforms(result);
	}
	public applyTo(object: THREE.Object3D) {
		object.position.copy(this.position);
		object.quaternion.copy(this.quaternion);
		object.scale.copy(this.scale);

		object.updateMatrixWorld();
	}
}

/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	private static instance: CameraManager;
	public static getInstance(): CameraManager {
		return CameraManager.instance;
	}

	public readonly camera: THREE.PerspectiveCamera;
	private transforms: Transforms;
	private cameraControlls: CameraControlls;

	public static readonly __MAIN_CAMERA__: string = "__MAIN_CAMERA__";

	public constructor(initialReference: THREE.PerspectiveCamera, threeScene: TJ.ThreeScene) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.camera = new THREE.PerspectiveCamera();
		threeScene.scene.add(this.camera);
		threeScene.setCamera(this.camera);
		this.camera.name = "|||__MAIN_CAMERA__|||";

		this.transforms = new Transforms(initialReference);
		this.cameraControlls = new CameraControlls(initialReference);

		if (!CameraManager.instance) {
			CameraManager.instance = this;
		}

		this.setToCamera();
	}

	public tweenTo(translateTo: THREE.PerspectiveCamera) {
		const startTransforms = IITransforms.fromObject3D(this.camera);
		const endTransforms = IITransforms.fromObject3D(translateTo);

		let factor = { x: 0 };
		const endFactor = { x: 1 };
		const interpolationTween = new TWEEN.Tween(factor) //
			.to(endFactor, 2049) //
			.interpolation(TWEEN.Interpolation.Bezier) //
			.onUpdate(() => {
				this.transforms = Transforms.lerp(startTransforms, endTransforms, factor.x);
				this.setToCamera();
			});
		interpolationTween.start();

		// why it works only here
		function animate(time: number) {
			requestAnimationFrame(animate);
			TWEEN.update(time);
		}
		animate(0);
	}
	private setToCamera() {
		this.transforms.applyTo(this.camera);
		this.cameraControlls.applyTo(this.camera);
		this.camera.updateProjectionMatrix();
	}

	// update camera every frame
	public override onFrameUpdate(): void {
		this.setToCamera();
	}
}
