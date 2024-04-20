import { GE } from "@/scripts/GameEngine";
import type { IEnumerable } from "@/scripts/utils/IEnumerable";
import type { MData } from "@/scripts/utils/markers";

/**
 * Applys stored memento to object
 */
export interface IApplyParamsTo<T> {
	applyParamsTo(object: T): void;
}

/**
 * defines a groupe (state) of object
 */
export type TMemento<T> = IApplyParamsTo<T> & MData;

/**
 * a groupe of states for this object idk
 */
export type IObjectState<T> = IApplyParamsTo<T>;

export class ObjectParamsController<T>
	extends GE.ADynamicObject
	implements IObjectState<T>, IEnumerable<IApplyParamsTo<T>>
{
	public readonly object: T;
	public readonly paramses: Array<IApplyParamsTo<T>>;

	public constructor(controlledObject: T, params: Array<IApplyParamsTo<T>>) {
		super();

		this.object = controlledObject;
		this.paramses = params;
	}

	public applyParamsTo(object: T): void {
		for (let i = 0; i < this.paramses.length; i++) {
			const controller = this.paramses[i];
			controller.applyParamsTo(this.object);
		}
	}
	public getEnumerator(): IApplyParamsTo<T>[] {
		return this.paramses;
	}
}
