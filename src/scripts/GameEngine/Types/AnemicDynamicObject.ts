import { GE } from "..";

/**
 * @deprecated use somwthing from GameEngineFunctional
 */
interface IAnemicDynamicObject {
	onStart?: () => void;
	onFrameUpdate?: () => void;
	onDelete?: () => void;
	onFrameUpdateOrder?: number;
}

/**
 * @deprecated use ADT mixing from functional game
 */
export class AnemicDynamicObject extends GE.ADynamicObject {
	public readonly params: IAnemicDynamicObject;

	public constructor(params: IAnemicDynamicObject) {
		super();
		this.params = params;
		this.onFrameUpdateOrder = params.onFrameUpdateOrder ?? GE.OnFrameUpdateOrders.MID_FRAME_UPDATE;
	}

	public override onStart() {
		super.onStart();
		this.params.onStart?.();
	}
	public override onFrameUpdate() {
		super.onFrameUpdate();
		this.params.onFrameUpdate?.();
	}
	public override onDelete() {
		super.onDelete();
		this.params.onDelete?.();
	}
}
