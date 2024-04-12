import { Transforms, type ITransformsParams } from "../CameraManagiment/ParamsControllers/Transforms";
import { GE } from "../GameEngine";

/**
 * smothly copyes transforms of another object
 * used to smoothe camera movement
 */
export class TransformsFollower extends GE.ADynamicObject {
	public readonly target: Transforms;
	private _transforms: Transforms;
	public get transforms(): Transforms {
		return this._transforms;
	}
	public smoothness: number;

	public constructor(target: Transforms, smoothness: number) {
		super();
		this.target = target;
		this._transforms = new Transforms(target);
		this.smoothness = smoothness;
	}

	// TODO add smppthness
	public onFrameUpdate(): void {
		this._transforms = this.target;
	}
}
