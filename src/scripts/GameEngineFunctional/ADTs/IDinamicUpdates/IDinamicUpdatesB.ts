import { GE } from "@/scripts/GameEngine";
import { type ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { IDinamicUpdates, IDinamicUpdatesFields } from "./IDinamicUpdates";

/**
 *
 */
export class IDinamicUpdatesB {
	/**
	 * creates IDinamicUpdates from optional params
	 * @see IDinamicUpdates
	 */
	static readonly new = ({
		onStart = (time: ITimeMoment) => {},
		onFrameUpdatePriority = GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE,
		onFrameUpdate = (time: ITimeMoment) => {},
		onDelete = (time: ITimeMoment) => {},
	}: IDinamicUpdatesFields): IDinamicUpdates => ({
		onStart: onStart,
		onFrameUpdatePriority: onFrameUpdatePriority,
		onFrameUpdate: onFrameUpdate,
		onDelete: onDelete,
	});
}
