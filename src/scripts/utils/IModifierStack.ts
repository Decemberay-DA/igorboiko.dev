import type { Apply } from "fp-ts/lib/Apply";

/**
 *
 */
export class ModifierStack<TObj> implements IModifierStack<TObj> {
	public readonly modifiers: IModifier<TObj>[] = [];

	public apply(object: TObj): TObj {
		for (const modifier of this.modifiers) {
			object = modifier.apply(object);
		}
		return object;
	}
}

export interface IModifierStack<TObj> extends IModifier<TObj> {
	modifiers: IModifier<TObj>[];
}
export interface IModifier<TObj> {
	apply(object: TObj): TObj;
}
