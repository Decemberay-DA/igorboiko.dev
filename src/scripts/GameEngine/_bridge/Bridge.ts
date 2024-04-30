import asi from "@/scripts/asi/asi";
import { GE } from "..";
import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";

/**
 * converts obsolete stuff of object oriented engine to functional engine
 */
export class BridgeH {
	static readonly getCurrentITimeMomentFrom_GEGameTime = (): ITimeMoment => {
		return {
			sinceStart: asi.game.oopgame.rootTime.sinceStart,
			delta: asi.game.oopgame.rootTime.delta,
			frame: asi.game.oopgame.rootTime.frame,
		};
	};
}
