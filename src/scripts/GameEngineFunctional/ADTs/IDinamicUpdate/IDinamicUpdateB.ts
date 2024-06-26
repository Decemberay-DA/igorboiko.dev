import { type ITimeMoment } from "../ITimeMoment/ITimeMoment";
import type { IDinamicUpdate, IDinamicUpdateFields } from "./IDinamicUpdate";
import { pipe } from "fp-ts/lib/function";
import { MATHJS } from "@/scripts/FrameworksExport";
import { MixinB } from "../Utils/MixinB";
import { OnFrameUpdateOrders } from "./OnFrameUpdateOrders";

/**
 *
 */
export class IDinamicUpdateB {
	/**
	 * creates IDinamicUpdates from optional params
	 */
	static readonly new = ({
		onFrameUpdateOrder: onFrameUpdateOrder = OnFrameUpdateOrders.MID_FRAME_UPDATE,
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
	static readonly empty = (): IDinamicUpdate => ({
		onFrameUpdateOrder: OnFrameUpdateOrders.MID_FRAME_UPDATE,
		_isStarted: false,
		onStart: (time: ITimeMoment) => {},
		onFrameUpdate: (time: ITimeMoment) => {},
		_isDeleted: false,
		onDelete: (time: ITimeMoment) => {},
	});

	static readonly concat =
		<A extends IDinamicUpdate>(a: A) =>
		<B extends IDinamicUpdate>(b: B): A & B & IDinamicUpdate =>
			pipe(
				a,
				MixinB.newWith(b),
				IDinamicUpdateB.mixedIn({
					onStart(time) {
						a.onStart(time);
						b.onStart(time);
					},
					onFrameUpdateOrder: MATHJS.max(a.onFrameUpdateOrder, b.onFrameUpdateOrder),
					onFrameUpdate(time) {
						a.onFrameUpdate(time);
						b.onFrameUpdate(time);
					},
					onDelete(time) {
						a.onDelete(time);
						b.onDelete(time);
					},
				})
			);
}
