import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";
import { CameraControls } from "../ParamsControllers/CameraControlls";

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
