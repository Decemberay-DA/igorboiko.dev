import * as THREE from "three";
import { Coroutine, GE } from "../GameEngine";
import { Transforms, type ITransforms } from "./ParamsControllers/Transforms";
import { SmoothLerper } from "./Lerper";
import type { IModifierStack } from "../utils/IModifierStack";
import { ModifierStack } from "../utils/IModifierStack";

/**
 * Controlls camera crane omg
 * and its tweening
 */
export class CameraCrain extends GE.ADynamicObject {
	private crane: THREE.Object3D;
	private transforms: Transforms;

	private readonly _modifierStack = new ModifierStack<THREE.Object3D>();

	public static readonly __MAIN_CAMERA_CRANE__: string = "__MAIN_CAMERA_CRANE__";

	public constructor(crane: THREE.Object3D) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.crane = crane;
		this.transforms = new Transforms(crane);

		this.setToCrane();
	}

	public tweenTo(translateTo: ITransforms, tweenTime: number = 3) {
		const startT = new Transforms(this.crane);
		const endT = new Transforms(translateTo);

		const startTime = GE.GameTime.realTimeSinceStartup;
		let factor = 0;
		const transformsCoroutine = new GE.Coroutine({
			stopOn: () => factor >= 1,
			onUpdate: () => {
				factor = Coroutine.calculateRemainingFactor(startTime, tweenTime);
				this.transforms = SmoothLerper.instance.Transforms(startT, endT, factor);
			},
			onDelete: () => {
				this.transforms = endT;
			},
		});
		transformsCoroutine.launch();
	}

	public setToCrane(transforms: Transforms = this.transforms) {
		const startT = new Transforms(this.crane);
		const endT = new Transforms(transforms);

		const smoothedTransforms = SmoothLerper.instance.Transforms(startT, endT, 0.2);

		smoothedTransforms.applyParamsTo(this.crane);
		this.crane.updateMatrix();
	}
	public override onFrameUpdate(): void {
		this.setToCrane();
	}
}
