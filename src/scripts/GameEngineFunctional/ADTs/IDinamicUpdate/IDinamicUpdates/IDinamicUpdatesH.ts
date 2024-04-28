import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IDinamicUpdates } from "./IDinamicUpdates";

export class IDinamicUpdatesH {
	/**
	 * adds in collection new functions to sorted position
	 */
	static insertAndSort =
		(updateability: IDinamicUpdate) =>
		(collection: IDinamicUpdates): IDinamicUpdates => {
			const arr = { ...collection.participants };
			arr.push(updateability);
			arr.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
			return {
				...collection,
				participants: arr,
			};
		};
	static removeAndSort =
		(updateability: IDinamicUpdate) =>
		(collection: IDinamicUpdates): IDinamicUpdates => {
			const arr = { ...collection.participants };
			const index = arr.indexOf(updateability);
			if (index > -1) arr.splice(index, 1);
			return {
				...collection,
				participants: arr,
			};
		};
}
