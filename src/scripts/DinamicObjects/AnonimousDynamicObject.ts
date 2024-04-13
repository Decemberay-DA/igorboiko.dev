import { GE } from "../GameEngine/index";

export interface AnonimousDynamicObjectParams {
	readonly onStart?: () => void;
	readonly onFrameUpdate?: () => void;
	readonly onDelete?: () => void;
	readonly onFrameUpdatePriority?: number;
}

export class AnonimousDynamicObject extends GE.ADynamicObject {
	public readonly params: AnonimousDynamicObjectParams;

	constructor(params: AnonimousDynamicObjectParams) {
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
