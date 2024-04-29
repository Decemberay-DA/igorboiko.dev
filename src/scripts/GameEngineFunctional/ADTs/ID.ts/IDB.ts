import type { ID } from "./ID";
import { UUIDB } from "./UUID";

/**
 *
 */
export class IDB {
	static new = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: self,
	});
	static clone = <A>(self: A): ID<A> => ({
		id: UUIDB.random(),
		self: { ...self },
	});
	static cloneSelfFrom =
		<A>(id: ID<A>) =>
		(self: A): ID<A> => ({
			...id,
			self: { ...self },
		});
}

const dodeA = IDB.new({
	name: "MR ghksdorf",
	age: 0.765489,
});
const dodeB = IDB.clone(dodeA);
