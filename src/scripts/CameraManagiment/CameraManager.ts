import * as THREE from "three";
import { GE } from "../GameEngine";
import { CameraControls as CameraControls } from "./ParamsControllers/CameraControlls";
import { Transforms } from "./ParamsControllers/Transforms";
import { asi } from "../asi/asi";
import { ModifierStack } from "../utils/IModifierStack";
import { TransformsTweenToerModifier } from "./Modifiers/TransformsTweenToerModifier";
import { TransformsSmoother } from "./Modifiers/TransformsSmoother";
import { CameraControlsSmoother } from "./Modifiers/CameraControlsSmoother";

/**
 * Contralls smooth camera movement or something
 */
export class CameraManager extends GE.ADynamicObject {
	public readonly camera: THREE.PerspectiveCamera;

	private readonly _modifierStackCameraControls = new ModifierStack<CameraControls>();
	// private smootherCC: GenerickSmoother<CameraControls, THREE.PerspectiveCamera>;

	private readonly _modifierStackTransforms = new ModifierStack<Transforms>();
	private tweener: TransformsTweenToerModifier;
	private smoother: TransformsSmoother;

	public static readonly __MAIN_CAMERA__: string = "__MAIN_CAMERA__";

	public constructor(camera: THREE.PerspectiveCamera) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.camera = camera;

		// set as main camera of all scene
		asi.data.THREE_MANAGIMENTED_SCENE.setCamera(camera);

		const smootherCC = new CameraControlsSmoother(0.07);
		// const smootherCCgen = new GenerickSmoother<CameraControls, THREE.PerspectiveCamera>(
		// 	0.07,
		// 	new CameraControls(this.camera),
		// 	Lerper.instance.CameraControls
		// );
		this._modifierStackCameraControls.modifiers.push(smootherCC);

		this.tweener = new TransformsTweenToerModifier();
		this.smoother = new TransformsSmoother(0.07);
		this._modifierStackTransforms.modifiers.push(this.tweener);
		this._modifierStackTransforms.modifiers.push(this.smoother);
	}

	public tweenTo(translateTo: THREE.PerspectiveCamera, tweenTime: number = 3) {
		this.tweener.tweenTo(translateTo, tweenTime);
	}

	public override onFrameUpdate(): void {
		const startTransforms = new Transforms(this.camera);
		const startcameraControlls = new CameraControls(this.camera);

		const endtransforms = this._modifierStackTransforms.apply(startTransforms);
		const endcameraControlls = this._modifierStackCameraControls.apply(startcameraControlls);

		endtransforms.applyParamsTo(this.camera);
		// endcameraControlls.applyParamsTo(this.camera);

		this.camera.updateProjectionMatrix();
	}
}
