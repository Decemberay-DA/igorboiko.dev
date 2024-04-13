import { Transforms } from "../ParamsControllers/Transforms";
import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";

export class TransformsSmoother implements IModifier<Transforms> {
	private _smoothedTransforms: Transforms = new Transforms({});
	public smoothness = 0.2;

	public constructor(smoothness = 0.2) {
		this.smoothness = smoothness;
	}

	public apply(object: Transforms): Transforms {
		const startT = this._smoothedTransforms;
		const endT = object;

		const smoothedTransforms = SmoothLerper.instance.Transforms(startT, endT, this.smoothness);

		return smoothedTransforms;
	}
}
