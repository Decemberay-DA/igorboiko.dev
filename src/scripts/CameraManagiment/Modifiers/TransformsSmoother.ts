import Transforms from "../ParamsControllers/Transforms/Transforms";
import SmoothLerper from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";
import ITransformsEX from "../ParamsControllers/Transforms/ITransformsEX";

export class TransformsSmoother implements IModifier<Transforms> {
	private _smoothedTransforms: Transforms;
	public smoothness: number;

	public constructor(smoothness = 0.5, initialTransforms?: Transforms) {
		this.smoothness = smoothness;
		this._smoothedTransforms = initialTransforms ?? new Transforms(ITransformsEX.newIdentity());
	}

	public apply(object: Transforms): Transforms {
		const startT = new Transforms(this._smoothedTransforms);
		const endT = object;

		this._smoothedTransforms = SmoothLerper.instance.Transforms(startT, endT, this.smoothness);

		return this._smoothedTransforms;
	}
}
