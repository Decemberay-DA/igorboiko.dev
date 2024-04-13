import * as THREE from "three";
import { GE } from "../GameEngine";
import { Transforms } from "./ParamsControllers/Transforms";
import { ModifierStack } from "../utils/IModifierStack";
import { TransformsTweenToerModifier } from "./Modifiers/TransformsTweenToerModifier";
import { TransformsSmoother } from "./Modifiers/TransformsSmoother";

/**
 * Controlls camera crane omg
 * and its tweening
 */
export class CameraCrain extends GE.ADynamicObject {
	private crane: THREE.Object3D;

	private readonly _modifierStack = new ModifierStack<Transforms>();
	private tweener: TransformsTweenToerModifier;
	private smoother: TransformsSmoother;

	public static readonly __MAIN_CAMERA_CRANE__: string = "__MAIN_CAMERA_CRANE__";

	public constructor(crane: THREE.Object3D) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.crane = crane;
		this.tweener = new TransformsTweenToerModifier();
		this.smoother = new TransformsSmoother(0.1);

		this._modifierStack.modifiers.push(this.tweener);
		// this._modifierStack.modifiers.push(this.smoother);
	}

	public tweenTo(translateTo: THREE.Object3D, tweenTime: number = 3) {
		this.tweener.tweenTo(translateTo, tweenTime);
	}

	public override onFrameUpdate(): void {
		const inTransforms = new Transforms(this.crane);
		const endTransforms = this._modifierStack.apply(inTransforms);

		endTransforms.applyParamsTo(this.crane);
		this.crane.updateMatrix();
	}
}
