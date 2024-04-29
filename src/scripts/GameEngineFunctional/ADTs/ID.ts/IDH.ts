import type { ID } from "./ID";

export class IDH {
	static isIDEquals = (a: ID<any>) => (b: ID<any>) => a.id === b.id;
	static isSelfEquals = (a: ID<any>) => (b: ID<any>) => a.self === b.self;
}
