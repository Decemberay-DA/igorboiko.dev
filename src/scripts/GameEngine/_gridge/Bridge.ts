import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import type { GE } from "..";
import type { IEnableable } from "@/scripts/GameEngineFunctional/ADTs/IEnableable/IEnableable";

/**
 * converts obsolete stuff of object oriented engine to functional engine
 */
export class BridgeH {
	static readonly ADinamicObject_to_ADTs = <D extends GE.ADynamicObject>(
		object: D
	): IDinamicUpdate & IEnableable => {
		return object;
	};
}
