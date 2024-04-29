import type { IParented } from "../../IGameBounded/IGameBounded";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IDinamicUpdates } from "./IDinamicUpdates";

export class IDinamicUpdatesH {
	/**
	 * adds in collection new functions to sorted position
	 */
	static insert =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate>(updateability: B): B => {
			collection.participants.push(updateability);
			collection.participants.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
			return updateability;
		};
	static remove =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate>(updateability: B): B => {
			const index = collection.participants.indexOf(updateability);
			if (index > -1) collection.participants.splice(index, 1);
			return updateability;
		};

	static newInsertedAndBinded =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate>(updateability: B): B & IParented => {
			return {
				...IDinamicUpdatesH.insert(collection)(updateability),
				parentExecutor: collection,
			};
		};
	static newRemovedAndUnBinded =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate & IParented>(updateability: B): Omit<B, "parentExecutor"> => {
			return {
				...IDinamicUpdatesH.remove(collection)(updateability),
			};
		};
}
