import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import { CameraControls as CameraControls, IICameraControls } from "./ParamsControllers/CameraControlls";
import { Transforms, IITransforms } from "./ParamsControllers/Transforms";
import { asi } from "../asi/asi";
import { SmoothLerper as Lerper, SmoothLerper } from "./Lerper";
import { type IModifier, type IModifierStack, ModifierStack } from "../utils/IModifierStack";



/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	public readonly camera: THREE.PerspectiveCamera;
	public readonly modifierStack: IModifierStack<THREE.PerspectiveCamera> = new ModifierStack();

	private transforms: Transforms;
	private cameraControlls: CameraControls;

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

	public tweenTo(translateTo: THREE.PerspectiveCamera, tweenTime: number = 3) {
		const startT = new Transforms(this.camera);
		const endT = new Transforms(translateTo);

		const startCP = new CameraControls(this.camera);
		const endCP = new CameraControls(translateTo);

		const startTime = GE.GameTime.realTimeSinceStartup;
		let factor = 0;
		const transformsCoroutine = new GE.Coroutine({
			stopOn: () => factor >= 1,
			onUpdate: () => {
				factor = GE.Coroutine.calculateRemainingFactor(startTime, tweenTime);
				this.transforms = SmoothLerper.instance.Transforms(startT, endT, factor);
				this.cameraControlls = SmoothLerper.instance.CameraControls(startCP, endCP, factor);
			},
			onDelete: () => {
				this.transforms = endT;
				this.cameraControlls = endCP;
			},
		});
		transformsCoroutine.launch();
	}

	public setToCamera(
		transforms: Transforms = this.transforms,
		cameraControlls: CameraControls = this.cameraControlls
	) {
		const startT = new Transforms(this.camera);
		const endT = new Transforms(transforms);

		const startCP = new CameraControls(this.camera);
		const endCP = new CameraControls(cameraControlls);

		const smoothedTransforms = SmoothLerper.instance.Transforms(startT, endT, 0.07);
		const smoothedCameraControls = SmoothLerper.instance.CameraControls(startCP, endCP, 0.01);

		smoothedTransforms.applyParamsTo(this.camera);
		smoothedCameraControls.applyParamsTo(this.camera);
		this.camera.updateProjectionMatrix();
	}

	// update camera every frame
	public override onFrameUpdate(): void {
		this.modifierStack.apply(this.camera);
		this.setToCamera();
	}
}
