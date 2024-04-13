export class ModifierStack<TObj> implements IModifierStack<TObj> {
	public readonly modifiers: Array<IModifier<TObj>> = new Array<IModifier<TObj>>();

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
