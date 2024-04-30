import { pipe } from "fp-ts/lib/function";
import { GE, oopGameB } from "../GameEngine/index.ts";
import { ITopLevelGameB } from "../GameEngineFunctional/Types/ITopLevelGameB.ts";
import { IDinamicObjectH } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectH.ts";
import { ITimeMomentB } from "../GameEngineFunctional/ADTs/ITimeMoment/ITimeMomentB.ts";

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
	 */
	public readonly oopgame = pipe(
		oopGameB.new(), //yo
		IDinamicObjectH.start(ITimeMomentB.newPerformanceNow())
	);
}
