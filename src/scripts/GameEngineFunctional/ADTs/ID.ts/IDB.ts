import type { ID } from "./ID";
import { UUIDH } from "./UUID";

/**
 * 
 */
export class IDB {
	static new = <A>(self: A): ID<A> => ({
		id: UUIDH.new(),
		self: self,
	});
	static cloneSelfFrom =
		<A>(id: ID<A>) =>
		(self: A): ID<A> => ({
			...id,
			self: { ...self },
		});
}
