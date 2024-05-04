import type { ID } from "./ID";

	/**
	 * @returns new id object with referened self data
	 */
	export const new = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: self,
	});
	/**
	 * @returns new id object with cloned self data
	 */
	export const newClone = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: { ...self },
	});
	/**
	 * @returns same id object with cloned self data from another object
	 */
	export const cloneSelfFrom =
		<A>(id: ID<A>) =>
		(self: A): ID<A> => ({
			...id,
			self: { ...self },
		});
