import type { IParented } from "../IParented/IParented";
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

	static newInsertedAndParented =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate>(updateability: B): B & IParented<A> => {
			return {
				...IDinamicUpdatesH.insert(collection)(updateability),
				parent: collection,
			};
		};
	static newRemovedAndUnParented =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate & IParented<IDinamicUpdates>>(
			updateability: B
		): Omit<B, keyof IParented<IDinamicUpdates>> => {
			return {
				...IDinamicUpdatesH.remove(collection)(updateability),
			};
		};
}
