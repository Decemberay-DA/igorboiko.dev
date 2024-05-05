import type { ID } from "./ID";

export class IDH {
	static readonly isFullyEqual = (a: ID<any>) => (b: ID<any>) =>
		IDH.isIDEquals(a)(b) && IDH.isSelfEquals(a)(b);
	static readonly isIDEquals = (a: ID<any>) => (b: ID<any>) => a.id === b.id;
	static readonly isSelfEquals = (a: ID<any>) => (b: ID<any>) => a.self === b.self;
}
