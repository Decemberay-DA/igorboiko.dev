import { pipe } from "fp-ts/lib/function";
import { ITopLevelGameB } from "../GameEngineFunctional/Types/ITopLevelGameB.ts";
import { IDinamicObjectH } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectH.ts";
import { ITimeMomentB } from "../GameEngineFunctional/ADTs/ITimeMoment/ITimeMomentB.ts";
import { GE } from "@/scripts/GameEngine";

/**
 *
 */
export class game {
	/**
	 * functional
	 */
	public readonly root = ITopLevelGameB.newRootGame();

	/**
	 * depricated-like oop that just works and i dont want to rewrite it
	 * @deprecated use root
	 */
	// public readonly oopgame2 = pipe(
	// 	GE.oopGameB.new(), //yo
	// 	IDinamicObjectH.start(ITimeMomentB.newPerformanceNow())
	// );
	public get oopgame() {
		return this.root;
	}
}
