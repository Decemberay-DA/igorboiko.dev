import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import { CameraControls as CameraControls, IICameraControls } from "./ParamsControllers/CameraControlls";
import { Transforms, IITransforms } from "./ParamsControllers/Transforms";
import { asi } from "../asi/asi";
import { SmoothLerper } from "./Lerper";

/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	public readonly camera: THREE.PerspectiveCamera;

	private transforms: Transforms;
	private _lerpertransforms = new SmoothLerper();

	private cameraControlls: CameraControls;
	private _lerpercameraControlls = new SmoothLerper();

	public static readonly __MAIN_CAMERA__: string = "__MAIN_CAMERA__";

	public constructor(camera: THREE.PerspectiveCamera) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.camera = camera;
		this.transforms = new Transforms(camera);
		this.cameraControlls = new CameraControls(camera);

		// set as main camera of all scene
		asi.data.THREE_MANAGIMENTED_SCENE.setCamera(camera);

		this.setToCamera();
	}

	public tweenTo(
		translateTo: THREE.PerspectiveCamera,
		teweenTime: number = 3000,
		interpolation: (v: number[], k: number) => number = TWEEN.Interpolation.Bezier
	) {
		const startT = new Transforms(this.camera);
		const endT = new Transforms(translateTo);

		const startCP = new CameraControls(this.camera);
		const endCP = new CameraControls(translateTo);

		let f1 = { x: 0 };
		let f2 = { x: 1 };
		const rotationTween = new TWEEN.Tween(f1) //
			.to(f2, teweenTime) //
			.interpolation(interpolation) //
			.onUpdate(() => {
				this.transforms = this._lerpertransforms.Transforms(startT, endT, f1.x);
				this.cameraControlls = this._lerpercameraControlls.CameraControls(startCP, endCP, f1.x);
			});
		rotationTween.start();

		// why it works only here
		function animate(time: number) {
			requestAnimationFrame(animate);
			TWEEN.update(time);
		}
		animate(performance.now());
	}
	public setToCamera(
		transforms: Transforms = this.transforms,
		cameraControlls: CameraControls = this.cameraControlls
	) {
		transforms.applyParamsTo(this.camera);
		cameraControlls.applyParamsTo(this.camera);
		this.camera.updateProjectionMatrix();
	}

	// update camera every frame
	public override onFrameUpdate(): void {
		this.setToCamera();
	}
}
