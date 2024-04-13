import { Coroutine, GE } from "../../GameEngine";
import { Transforms, type ITransforms } from "../ParamsControllers/Transforms";
import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";

export class TransformsTweenToerModifier implements IModifier<Transforms> {
	private _tweenedTransforms: Transforms = new Transforms({});

	public apply(object: Transforms): Transforms {
		return this._tweenedTransforms;
	}

	public tweenTo(translateTo: ITransforms, tweenTime: number = 1) {
		const startT = new Transforms(this._tweenedTransforms);
		const endT = new Transforms(translateTo);

		const startTime = GE.GameTime.realTimeSinceStartup;
		let factor = 0;
		const transformsCoroutine = new GE.Coroutine({
			stopOn: () => factor >= 1,
			onUpdate: () => {
				factor = Coroutine.calculateRemainingFactor(startTime, tweenTime);
				this._tweenedTransforms = SmoothLerper.instance.Transforms(startT, endT, factor);
			},
			onDelete: () => {
				this._tweenedTransforms = endT;
			},
		});
		transformsCoroutine.launch();
	}
}
