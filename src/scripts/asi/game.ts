import { pipe } from "fp-ts/lib/function";
import { oopGameB } from "../GameEngine/index.ts";
import { ITopLevelGameB } from "../GameEngineFunctional/Types/ITopLevelGameB.ts";
import { IDinamicObjectH } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectH.ts";
import { ITimeMomentB } from "../GameEngineFunctional/ADTs/ITimeMoment/ITimeMomentB.ts";
import { LazyH } from "../utils/Lazy.ts";

/**
 *
 */
export class game {
	/**
	 * functional
	 */
	public get root() {
		return this._li_root.value;
	}
	private readonly _li_root = LazyH.new(() => ITopLevelGameB.newRootGame());

	/**
	 * depricated-like oop that just works and i dont want to rewrite it
	 * @deprecated use root
	 */
	public get oopgame() {
		return this._li_oopgame.value;
	}
	private readonly _li_oopgame = LazyH.new(() =>
		pipe(
			oopGameB.new(), //yo
			IDinamicObjectH.start(ITimeMomentB.newPerformanceNow())
		)
	);
}
