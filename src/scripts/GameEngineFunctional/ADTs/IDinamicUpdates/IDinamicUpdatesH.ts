import type { IParented } from "../IParented/IParented";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IDinamicUpdates } from "./IDinamicUpdates";
import { option } from "fp-ts";
import asi from "@/scripts/asi/asi";
import type { ITopLevelGame } from "../../Types/ITopLevelGameB";

/**
 *
 */
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

	/**
	 *
	 */
	static newInsertedAndParented =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate>(updateability: B): B & IParented<A> => {
			return {
				...IDinamicUpdatesH.insert(collection)(updateability),
				parent: option.some(collection),
			};
		};
	static newInsertedAndParentedToasiRootGame = <B extends IDinamicUpdate>(
		updateability: B
	): B & IParented<ITopLevelGame> =>
		IDinamicUpdatesH.newInsertedAndParented(asi.game.root.self)(updateability);

	/**
	 *
	 */
	static removeAndUnParent =
		<A extends IDinamicUpdates>(collection: A) =>
		<B extends IDinamicUpdate & IParented<A>>(updateability: B): B => {
			IDinamicUpdatesH.remove(collection)(updateability);
			updateability.parent = option.none;
			return updateability;
		};
	static tryRemoveAndUnParent =
		<A extends any>(collection: option.Option<A>) =>
		<B extends IDinamicUpdate & IParented<A>>(updateability: B): B => {
			if (option.isSome(collection)) {
				IDinamicUpdatesH.remove(collection.value as any)(updateability);
				updateability.parent = option.none;
			}
			return updateability;
		};
	static removeAndUnParentFromasiRootGame = <B extends IDinamicUpdate & IParented<ITopLevelGame>>(
		updateability: B
	): B => IDinamicUpdatesH.removeAndUnParent(asi.game.root.self)(updateability);
}
