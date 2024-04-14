import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";
import { CameraControls } from "../ParamsControllers/CameraControlls";
import type { TMemento } from "../ParamsControllers/IObjectsGroupeParametersController";
import type { TDataRecord } from "../ParamsControllers/TDataRecord";

export class CameraControlsSmoother implements IModifier<CameraControls> {
	private _smoothedCameraControls: CameraControls = new CameraControls({});
	public smoothness: number;

	public constructor(smoothness = 0.5) {
		this.smoothness = smoothness;
	}

	public apply(object: CameraControls): CameraControls {
		const startT = this._smoothedCameraControls.clone();
		const endT = object;

		this._smoothedCameraControls = SmoothLerper.instance.CameraControls(startT, endT, this.smoothness);

		return this._smoothedCameraControls;
	}
}

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
