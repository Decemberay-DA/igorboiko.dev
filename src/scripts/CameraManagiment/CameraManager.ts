import * as THREE from "three";
import { GE } from "../GameEngine";
import { CameraControls as CameraControls } from "./ParamsControllers/CameraControlls";
import { Transforms } from "./ParamsControllers/Transforms";
import { asi } from "../asi/asi";
import { ModifierStack } from "../utils/IModifierStack";
import { TransformsTweenToerModifier } from "./Modifiers/TransformsTweenToerModifier";
import { TransformsSmoother } from "./Modifiers/TransformsSmoother";
import { CameraControlsSmoother } from "./Modifiers/CameraControlsSmoother";
import { TransformsCursorLeaner } from "./Modifiers/TransformsCursorLeaner";
import { SmoothLerper } from "./Lerper";
import { math } from "../utils/Math";

/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	public readonly camera: THREE.PerspectiveCamera;

	// private readonly _modifierStackCameraControls = new ModifierStack<CameraControls>();
	// private smootherCC: GenerickSmoother<CameraControls, THREE.PerspectiveCamera>;

	// private readonly _modifiersReal = new ModifierStack<Transforms>();
	// private readonly _modifiersAdditionals = new ModifierStack<Transforms>();
	private tweener: TransformsTweenToerModifier = new TransformsTweenToerModifier();
	private _realTransforms: Transforms;
	private leaner: TransformsCursorLeaner = new TransformsCursorLeaner(1.024);
	private smoother: TransformsSmoother = new TransformsSmoother(0.07 * 2);

	public static readonly __MAIN_CAMERA__: string = "__MAIN_CAMERA__";

	public constructor(camera: THREE.PerspectiveCamera) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.camera = camera;
		this._realTransforms = new Transforms(this.camera);

		// set as main camera of all scene
		asi.data.THREE_MANAGIMENTED_SCENE.setCamera(camera);
	}

	public tweenTo(translateTo: THREE.PerspectiveCamera, tweenTime: number = 1) {
		this.tweener.tweenTo(translateTo, tweenTime);
	}

	public override onFrameUpdate(): void {
		// get tweening
		this._realTransforms = this.tweener.apply(this._realTransforms);

		// calculate leaning and smoothing
		let additionalTransforms = this._realTransforms;
		// this.leaner.influence = math.clamp(Math.sin(GE.GameTime.realTimeSinceStartup) + 0.5);
		additionalTransforms = this.leaner.apply(additionalTransforms);
		additionalTransforms = this.smoother.apply(additionalTransforms);
		additionalTransforms.applyParamsTo(this.camera);

		this.camera.updateProjectionMatrix();
	}
}
