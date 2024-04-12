import { GE } from "../GameEngine";

/**
 * seqrches its data on very start by itself
 */
export abstract class ASeflSeqrchedEnumeration extends GE.ADynamicObject {
	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE;
	}
}
