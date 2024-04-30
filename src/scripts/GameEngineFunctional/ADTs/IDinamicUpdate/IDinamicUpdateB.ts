import { GE } from "@/scripts/GameEngine";
import { type ITimeMoment } from "../ITimeMoment/ITimeMoment";
import type { IDinamicUpdate, IDinamicUpdateFields } from "./IDinamicUpdate";
import { pipe } from "fp-ts/lib/function";
import { MATHJS } from "@/scripts/FrameworksExport";
import { MixinB } from "../Utils/MixinB";

/**
 *
 */
export class IDinamicUpdateB {
	/**
	 * creates IDinamicUpdates from optional params
	 */
	static readonly new = ({
		onFrameUpdateOrder: onFrameUpdateOrder = GE.OnFrameUpdateOrders.MID_FRAME_UPDATE,
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
		onFrameUpdateOrder: GE.OnFrameUpdateOrders.MID_FRAME_UPDATE,
		_isStarted: false,
		onStart: (time: ITimeMoment) => {},
		onFrameUpdate: (time: ITimeMoment) => {},
		_isDeleted: false,
		onDelete: (time: ITimeMoment) => {},
	});

	/**
	 * mixes updates after main type
	 */
	static readonly mixedIn =
		({
			onFrameUpdateOrder: onFrameUpdateOrder = GE.OnFrameUpdateOrders.MID_FRAME_UPDATE,
			onStart = (time: ITimeMoment) => {},
			onFrameUpdate = (time: ITimeMoment) => {},
			onDelete = (time: ITimeMoment) => {},
		}: IDinamicUpdateFields) =>
		<A>(a: A): A & IDinamicUpdate => ({
			...a,
			onFrameUpdateOrder: onFrameUpdateOrder,
			_isStarted: false,
			onStart: onStart,
			onFrameUpdate: onFrameUpdate,
			_isDeleted: false,
			onDelete: onDelete,
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
