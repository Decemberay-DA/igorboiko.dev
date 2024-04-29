import { option } from "fp-ts";
import type { IParented } from "./IParented";

export class IParentedB {
	static readonly newParented =
		<A>(parent: A) =>
		<B>(obj: B): B & IParented<A> => ({
			...obj,
			parent: option.some(parent),
		});
	static readonly newEmptyParent = <B, A>(obj: B): B & IParented<A> => ({
		...obj,
		parent: option.none,
	});
}
