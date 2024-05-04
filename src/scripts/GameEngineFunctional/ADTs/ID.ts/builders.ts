import { uuid } from "../UUID";
import type { ID } from "./types";

/**
 * @returns new id object with referened self data
 */
export const newFromSelf = <A>(self: A): ID<A> => ({
	id: uuid.newRandom(),
	self: self,
});

/**
 * @returns new id object with cloned self data
 */
export const newClone = <A>(self: A): ID<A> => ({
	id: uuid.newRandom(),
	self: { ...self },
});

/**
 * @returns same id object with cloned self data from another object
 */
export const newCloneSelfFrom =
	<A>(id: ID<A>) =>
	(self: A): ID<A> => ({
		...id,
		self: { ...self },
	});
