import { GE } from "..";
import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";

/**
 * converts obsolete stuff of object oriented engine to functional engine
 */
export class BridgeH {
	static readonly getCurrentITimeMomentFrom_GEGameTime = (): ITimeMoment => {
		return {
			sinceStart: GE.GameTime___.sinceStart,
			delta: GE.GameTime___.delta,
			frame: GE.GameTime___.frame,
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
