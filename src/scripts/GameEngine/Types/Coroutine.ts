import type { Tween } from "@tweenjs/tween.js";
import { GE } from "..";

/**
 * wrapped TWEEN.Tween thingy
 */
export class Coroutine<T extends Record<string, any>> extends GE.ADynamicObject {
	private _tween: Tween<T>;
	public get tween() {
		return this._tween;
	}

	public static newFromTween<T extends Record<string, any>>(tween: Tween<T>) {
		tween.start();
		const cr = new Coroutine(tween);
		return cr;
	}

	private constructor(tween: Tween<T>) {
		super();

		// delete this ADynamick object when tween finishes
		tween.onComplete((params) => this.delete());

		this._tween = tween;
	}

	public start() {
		this._tween.start();
	}

	public override onFrameUpdate(): void {
		this._tween.update(performance.now());
	}
}
