import type { ID } from "./ID";
import { UUIDB } from "./UUID";

/**
 *
 */
export class IDB {
	/**
	 * @returns new id object with referened self data
	 */
	static new = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: self,
	});
	/**
	 * @returns new id object with cloned self data
	 */
	static newClone = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: { ...self },
	});
	/**
	 * @returns same id object with cloned self data from another object
	 */
	static cloneSelfFrom =
		<A>(id: ID<A>) =>
		(self: A): ID<A> => ({
			...id,
			self: { ...self },
		});
}
