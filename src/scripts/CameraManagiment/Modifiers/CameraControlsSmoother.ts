import { SmoothLerper } from "../Lerper";
import type { IModifier } from "../../utils/IModifierStack";
import type { CameraControls } from "../ParamsControllers/CameraControls/CameraControls";

export class CameraControlsSmoother implements IModifier<CameraControls> {
	private _smoothedCameraControls!: CameraControls;
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
