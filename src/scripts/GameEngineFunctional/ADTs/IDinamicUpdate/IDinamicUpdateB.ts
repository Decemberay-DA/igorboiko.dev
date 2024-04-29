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
		onStart = (time: ITimeMoment) => {},
		onFrameUpdateOrder: onFrameUpdateOrder = GE.OnFrameUpdatePriorities.MID_FRAME_UPDATE,
		onFrameUpdate = (time: ITimeMoment) => {},
		onDelete = (time: ITimeMoment) => {},
	}: IDinamicUpdateFields): IDinamicUpdate => ({
		onStart: onStart,
		onFrameUpdateOrder: onFrameUpdateOrder,
		onFrameUpdate: onFrameUpdate,
		onDelete: onDelete,
	});
}
