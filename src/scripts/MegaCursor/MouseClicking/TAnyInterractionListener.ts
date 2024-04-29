import { GE } from "@/scripts/GameEngine";
import type { TAnyInterraction } from "./TAnyInterraction";
import asi from "@/scripts/asi/asi";
import ETAnyInterractionOccured from "./Events/ETAnyInterractionOccured";
import { pipe } from "fp-ts/lib/function";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import type { IDinamicUpdates } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";

// /**
//  * @deprecated use TAnyInterractionListenerB.new
//  */
// export default class TAnyInterractionListener extends GE.ADynamicObject {
// 	private _listener(e: TAnyInterraction) {
// 		asi.mediator.publish(new ETAnyInterractionOccured(e));
// 	}

// 	public constructor() {
// 		super();
// 		this.onFrameUpdateOrder = GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE;
// 	}

// 	public override onStart(): void {
// 		document.addEventListener("click", this._listener);
// 		document.addEventListener("keydown", this._listener);
// 		window.addEventListener("touchend", this._listener);
// 	}

// 	public override onDelete(): void {
// 		document.removeEventListener("click", this._listener);
// 		document.removeEventListener("keydown", this._listener);
// 		window.removeEventListener("touchend", this._listener);
// 	}
// }

export class TAnyInterractionListenerB {
	private static _listener = (e: TAnyInterraction) => asi.mediator.publish(new ETAnyInterractionOccured(e));
	static new = (game: IDinamicUpdates) => {
		return pipe(
			{
				onStart(time) {
					document.addEventListener("click", TAnyInterractionListenerB._listener);
					document.addEventListener("keydown", TAnyInterractionListenerB._listener);
					window.addEventListener("touchend", TAnyInterractionListenerB._listener);
					// console.error("TAnyInterractionListenerB was started"); // yay it works
				},
				onDelete(time) {
					document.removeEventListener("click", TAnyInterractionListenerB._listener);
					document.removeEventListener("keydown", TAnyInterractionListenerB._listener);
					window.removeEventListener("touchend", TAnyInterractionListenerB._listener);
				},
			},
			IDinamicUpdateB.new,
			IDinamicObjectB.new,
			IDinamicUpdatesH.newInsertedAndParented(game),
			IDB.new
		);
	};
}
