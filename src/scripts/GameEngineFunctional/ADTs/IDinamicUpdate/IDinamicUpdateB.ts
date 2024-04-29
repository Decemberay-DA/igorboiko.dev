import { GE } from "@/scripts/GameEngine";
import { type ITimeMoment } from "../ITimeMoment/ITimeMoment";
import type { IDinamicUpdate, IDinamicUpdateFields } from "./IDinamicUpdate";

/**
 *
 */
export class IDinamicUpdateB {
	/**
	 * creates IDinamicUpdates from optional params
	 */
	static readonly new = ({
		onFrameUpdateOrder: onFrameUpdateOrder = GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE,
		onStart = (time: ITimeMoment) => {},
		onFrameUpdate = (time: ITimeMoment) => {},
		onDelete = (time: ITimeMoment) => {},
	}: IDinamicUpdateFields): IDinamicUpdate => ({
		onFrameUpdateOrder: onFrameUpdateOrder,
		_isStarted: false,
		onStart: onStart,
		onFrameUpdate: onFrameUpdate,
		_isDeleted: false,
		onDelete: onDelete,
	});
}
