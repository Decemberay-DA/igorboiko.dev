import type { IModifier } from "../../utils/IModifierStack";
import type { TDataRecord } from "../ParamsControllers/TDataRecord";

export class GenerickSmoother<TRecord extends TDataRecord<TObject, TRecord>, TObject>
	implements IModifier<TRecord>
{
	private _smoothedObject: TRecord;
	public smoothness: number;

	public readonly smoothFunction: (start: TRecord, end: TRecord, smoothness: number) => TRecord;

	public constructor(
		smoothness = 0.5,
		initialValue: TRecord,
		smoothFunction: (start: TRecord, end: TRecord, smoothness: number) => TRecord
	) {
		this.smoothness = smoothness;
		this._smoothedObject = initialValue;
		this.smoothFunction = smoothFunction;
	}

	public apply(object: TRecord): TRecord {
		const startT = this._smoothedObject.clone();
		const endT = object;

		this._smoothedObject = this.smoothFunction(startT, endT, this.smoothness);

		return this._smoothedObject;
	}
}
