import type { IModifier } from "../../utils/IModifierStack";
import type { Transforms } from "../ParamsControllers/Transforms";

/**
 * make object lean towards cursor
 */
export class TransformsCursorLeaner implements IModifier<Transforms> {
	public apply(object: Transforms): Transforms {
		return object;
	}
}
