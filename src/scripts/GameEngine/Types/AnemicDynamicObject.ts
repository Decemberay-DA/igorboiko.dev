import { GE } from "..";

export type TAnemicDynamicObjectParams = Readonly<_IAnemicDynamicObject>;
interface _IAnemicDynamicObject {
	onStart?: () => void;
	onFrameUpdate?: () => void;
	onDelete?: () => void;
	onFrameUpdatePriority?: number;
}

export class AnemicDynamicObject extends GE.ADynamicObject {
	public readonly params: TAnemicDynamicObjectParams;

	public constructor(params: TAnemicDynamicObjectParams) {
		super();

		this.params = params;

		this.__onFrameUpdatePriority =
			params.onFrameUpdatePriority ?? GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE;
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
