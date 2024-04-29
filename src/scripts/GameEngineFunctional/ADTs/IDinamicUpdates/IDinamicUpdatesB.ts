import type { IDinamicUpdate, IDinamicUpdateFields } from "../IDinamicUpdate/IDinamicUpdate";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdateB";
import type { IDinamicUpdates } from "./IDinamicUpdates";

export class IDinamicUpdatesB {
	private static traverce =
		(onEach: (obj: IDinamicUpdate) => void) =>
		<G extends IDinamicUpdates>(collection: G): G => {
			collection.participants.forEach((x) => onEach(x));
			return collection;
		};

	static new = (dinamicUpdateFields: IDinamicUpdateFields) => {
		// also getting inserted in to this
		const selfUpdateability = IDinamicUpdateB.new(dinamicUpdateFields);
		const collector: IDinamicUpdates = {
			participants: [],
			...IDinamicUpdateB.new({
				onStart(time) {
					selfUpdateability.onStart(time);
					IDinamicUpdatesB.traverce((ch) => ch.onStart(time))(collector);
				},
				onFrameUpdateOrder: selfUpdateability.onFrameUpdateOrder,
				onFrameUpdate(time) {
					selfUpdateability.onFrameUpdate(time);
					IDinamicUpdatesB.traverce((ch) => ch.onFrameUpdate(time))(collector);
				},
				onDelete(time) {
					IDinamicUpdatesB.traverce((ch) => ch.onDelete(time))(collector);
					selfUpdateability.onDelete(time);
				},
			}),
		};
		return collector;
	};
}
