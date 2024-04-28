import { GE } from "..";
/**
 * @deprecated use somwthing from GameEngineFunctional
 */
export type TAnemicDynamicObjectParams = Readonly<_IAnemicDynamicObject>;
interface _IAnemicDynamicObject {
	onStart?: () => void;
	onFrameUpdate?: () => void;
	onDelete?: () => void;
	onFrameUpdateOrder?: number;
}
/**
 * @deprecated use ADT mixing from functional
 */
export class AnemicDynamicObject extends GE.ADynamicObject {
	public readonly params: TAnemicDynamicObjectParams;

	public constructor(params: TAnemicDynamicObjectParams) {
		super();

		this.params = params;

		this.onFrameUpdateOrder = params.onFrameUpdateOrder ?? GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE;
	}

	public override onStart() {
		this.params.onStart?.();
	}
	public override onFrameUpdate() {
		this.params.onFrameUpdate?.();
	}
	public override onDelete() {
		this.params.onDelete?.();
	}
}
