import { Transforms } from "../ParamsControllers/Transforms";
import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";

export class TransformsSmoother implements IModifier<Transforms> {
	private _smoothedTransforms: Transforms = new Transforms({});
	public smoothness: number;

	public constructor(smoothness = 0.5, initialTransforms?: Transforms) {
		this.smoothness = smoothness;
		this._smoothedTransforms = initialTransforms ?? new Transforms({});
	}

	public apply(object: Transforms): Transforms {
		const startT = new Transforms(this._smoothedTransforms);
		const endT = object;

		this._smoothedTransforms = SmoothLerper.instance.Transforms(startT, endT, this.smoothness);

		return this._smoothedTransforms;
	}
}
