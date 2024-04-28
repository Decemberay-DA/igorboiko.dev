import type { Semigroup } from "fp-ts/lib/Semigroup";

/**
 *
 */
export interface ITaged extends Semigroup<ITaged> {
	readonly tags: string[];
}
export class ITagedB {
	static readonly new = (tags: string[]): ITaged => ({
		tags: tags,
		concat: ITagedH.concat,
	});
}
export class ITagedH {
	static readonly concat = (x: ITaged, y: ITaged): ITaged => ITagedB.new([...x.tags, ...y.tags]);
}

/**
 *
 */
export interface IChilds<A> extends Semigroup<IChilds<A>> {
	childs: A[];
}
export class IChildsB {
	static readonly new = <A>(childs: A[]): IChilds<A> => ({
		childs: childs,
		concat: IChildsH.concat,
	});
}
export class IChildsH {
	static readonly concat = <A>(x: IChilds<A>, y: IChilds<A>): IChilds<A> =>
		IChildsB.new([...x.childs, ...y.childs]);
}

const tagged = ITagedB.new(["MixedObject"]);

const childs = [1, 2, 4, 8, 9, 5];
const cildsHierarchy = IChildsB.new(childs);

// const mixed: ITaged & IChilds<number> = {
// 	...tagged,
// 	...cildsHierarchy,
// };
