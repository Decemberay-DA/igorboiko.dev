import * as THREE from "three";
import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import { Transforms, IITransforms } from "./ParamsControllers/Transforms";

/**
 * Controlls camera crane omg
 * and its tweening
 */
export class CameraCrain extends GE.ADynamicObject {
	private crane: THREE.Object3D;
	private transforms: Transforms;

	public static readonly __MAIN_CAMERA_CRANE__: string = "__MAIN_CAMERA_CRANE__";

	public constructor(crane: THREE.Object3D) {
		super();

		this.crane = crane;
		this.transforms = new Transforms(crane);

		this.setToCrane();
	}

	public tweenTo(translateTo: THREE.Object3D) {
		const startTransforms = IITransforms.fromObject3D(this.crane);
		const endTransforms = IITransforms.fromObject3D(translateTo);

		let factor = { x: 0 };
		const endFactor = { x: 1 };
		const interpolationTween = new TWEEN.Tween(factor) //
			.to(endFactor, 2049) //
			.interpolation(TWEEN.Interpolation.Bezier) //
			.onUpdate(() => {
				this.transforms = this.transforms.lerpBetween(startTransforms, endTransforms, factor.x);
				this.setToCrane();
			});
		interpolationTween.start();

		// why it works only here
		function animate(time: number) {
			requestAnimationFrame(animate);
			TWEEN.update(time);
		}
		animate(0);
	}

	private setToCrane() {
		this.transforms.applyParamsTo(this.crane);
		this.crane.updateMatrix();
	}
	// update camera every frame
	public override onFrameUpdate(): void {
		this.setToCrane();
	}
}
