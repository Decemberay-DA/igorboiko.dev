import { IUUIDB } from "../IUUID/IUUIDB";
import type { ID } from "./ID";

export class IDB {
	/**
	 * @returns new id object with referened self data
	 */
	static readonly newFromSelf = <A>(self: A): ID<A> => ({
		id: IUUIDB.newRandom(),
		self: self,
	});

	/**
	 * @returns new id object with cloned self data
	 */
	static readonly newClone = <A>(self: A): ID<A> => ({
		id: IUUIDB.newRandom(),
		self: { ...self },
	});

	/**
	 * @returns same id object with cloned self data from another object
	 */
	static readonly newCloneSelfFrom =
		<A>(id: ID<A>) =>
		(self: A): ID<A> => ({
			...id,
			self: { ...self },
		});
}
