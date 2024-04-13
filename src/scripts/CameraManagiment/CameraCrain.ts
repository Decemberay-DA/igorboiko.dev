import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import { Transforms, type ITransforms } from "./ParamsControllers/Transforms";
import { SmoothLerper } from "./Lerper";

/**
 * Controlls camera crane omg
 * and its tweening
 */
export class CameraCrain extends GE.ADynamicObject {
	private crane: THREE.Object3D;
	private transforms: Transforms;
	private _lerper = new SmoothLerper();

	public static readonly __MAIN_CAMERA_CRANE__: string = "__MAIN_CAMERA_CRANE__";

	public constructor(crane: THREE.Object3D) {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;

		this.crane = crane;
		this.transforms = new Transforms(crane);

		this.setToCrane();
	}

	public tweenTo(
		translateTo: ITransforms,
		teweenTime: number = 3000,
		interpolation: (v: number[], k: number) => number = TWEEN.Interpolation.Bezier
	) {
		const start = new Transforms(this.crane);
		const end = new Transforms(translateTo);

		let f1 = { x: 0 };
		let f2 = { x: 1 };
		const transformsTween = new TWEEN.Tween(f1) //
			.to(f2, teweenTime) //
			.interpolation(interpolation) //
			.onUpdate(() => {
				this.transforms = this._lerper.Transforms(start, end, f1.x);
			});
		transformsTween.start();

		// why it works only here
		function animate(time: number) {
			requestAnimationFrame(animate);
			TWEEN.update(time);
		}
		animate(performance.now());
	}

	public setToCrane(transforms: Transforms = this.transforms) {
		transforms.applyParamsTo(this.crane);
		this.crane.updateMatrix();
	}
	public override onFrameUpdate(): void {
		this.setToCrane();
	}
}
