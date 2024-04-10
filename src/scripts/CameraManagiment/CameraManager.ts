import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import type { TJ } from "../ThreeJS";
import { CameraControlls } from "./ParamsControllers/CameraControlls";
import { Transforms, IITransforms } from "./ParamsControllers/Transforms";
import asi from "../asi/asi";

/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	public readonly camera: THREE.PerspectiveCamera;
	private transforms: Transforms;
	private cameraControlls: CameraControlls;

	public static readonly __MAIN_CAMERA__: string = "__MAIN_CAMERA__";

	public constructor(initialReference: THREE.PerspectiveCamera) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.camera = new THREE.PerspectiveCamera();
		const threeScene = asi.data.THREE_MANAGIMENTED_SCENE;
		threeScene.scene.add(this.camera);
		threeScene.setCamera(this.camera);
		this.camera.name = CameraManager.__MAIN_CAMERA__;

		this.transforms = new Transforms(initialReference);
		this.cameraControlls = new CameraControlls(initialReference);

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
				this.transforms = this.transforms.lerpBetween(startTransforms, endTransforms, factor.x);
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
		this.transforms.applyParamsTo(this.camera);
		this.cameraControlls.applyParamsTo(this.camera);
		this.camera.updateProjectionMatrix();
	}

	// update camera every frame
	public override onFrameUpdate(): void {
		this.setToCamera();
	}
}
