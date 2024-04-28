import { GE } from "..";
import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";

/**
 * converts obsolete stuff of object oriented engine to functional engine
 * @deprecated temporary used for transition to IGame category
 */
export class BridgeH {
	static readonly getCurrentITimeMomentFrom_GEGameTime = (): ITimeMoment => {
		return {
			sinceStart: GE.GameTime.realTimeSinceStartup,
			delta: GE.GameTime.deltaTime,
			frame: GE.GameTime.frame,
		};
	};
	// static readonly ADT_to_ADynamicObject = (adt: IDinamicObject): GE.ADynamicObject => {
	// 	return new GE.AnemicDynamicObject({
	// 		onStart() {
	// 			adt.onStart(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
	// 		},
	// 		onFrameUpdateOrder: adt.onFrameUpdateOrder,
	// 		onFrameUpdate() {
	// 			adt.onFrameUpdate(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
	// 		},
	// 		onDelete() {
	// 			adt.onDelete(BridgeH.getCurrentITimeMomentFrom_GEGameTime());
	// 		},
	// 	});
	// };
}
