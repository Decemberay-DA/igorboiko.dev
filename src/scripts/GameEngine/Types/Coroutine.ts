import type { Tween } from "@tweenjs/tween.js";
import { GE } from "..";

/**
 * wrapped TWEEN.Tween thingy
 * @deprecated use somwthing from GameEngineFunctional
 */
export class Coroutine<T extends Record<string, any>> extends GE.ADynamicObject {
	private _tween: Tween<T>;
	public get tween() {
		return this._tween;
	}

	public static newFromTween<T extends Record<string, any>>(
		tween: Tween<T>,
		onComplete: (object: T) => void = () => {}
	) {
		const coroutine = new Coroutine(tween);

		// delete this ADynamick object when tween finishes
		tween.onComplete((params) => {
			onComplete(params);
			coroutine.delete();
		});

		// autostart tween
		tween.start();

		return coroutine;
	}

	private constructor(tween: Tween<T>) {
		super();

		this._tween = tween;
	}

	public start() {
		this._tween.start();
	}

	public override onFrameUpdate(): void {
		this._tween.update(performance.now());
	}
}
