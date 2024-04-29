import { flow, pipe } from "fp-ts/lib/function";
import type { IDinamicUpdate, IDinamicUpdateFields } from "../IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdateB";
import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import type { IDinamicUpdates } from "./IDinamicUpdates";

export class IDinamicUpdatesB {
	private static _traverce =
		(onEach: (obj: IDinamicUpdate) => void) =>
		<G extends IDinamicUpdates>(collector: G): G => {
			collector.participants.forEach((x) => onEach(x));
			return collector;
		};

	private static _updateThismf = (time: ITimeMoment) => (mf: IDinamicUpdate) => {
		if (!mf._isStarted) {
			mf.onStart(time);
			mf._isStarted = true;
		}
		mf.onFrameUpdate(time);
	};

	static new = (dinamicUpdateFields: IDinamicUpdateFields) => {
		// also getting inserted in to this
		const selfUpdateability = IDinamicUpdateB.new(dinamicUpdateFields);
		const collector: IDinamicUpdates = {
			participants: [],
			...IDinamicUpdateB.new({
				onStart(time) {
					selfUpdateability.onStart(time);
					IDinamicUpdatesB._traverce(flow(IDinamicUpdatesB._updateThismf(time)))(collector);
				},
				onFrameUpdateOrder: selfUpdateability.onFrameUpdateOrder,
				onFrameUpdate(time) {
					selfUpdateability.onFrameUpdate(time);
					IDinamicUpdatesB._traverce(flow(IDinamicUpdatesB._updateThismf(time)))(collector);
				},
				onDelete(time) {
					IDinamicUpdatesB._traverce((ch) => ch.onDelete(time))(collector);
					selfUpdateability.onDelete(time);
				},
			}),
		};
		return collector;
	};
}
