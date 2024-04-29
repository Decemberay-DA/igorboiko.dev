import type { TAnyInterraction } from "./TAnyInterraction";
import asi from "@/scripts/asi/asi";
import ETAnyInterractionOccured from "./Events/ETAnyInterractionOccured";
import { pipe } from "fp-ts/lib/function";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import type { IDinamicUpdates } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";

export class TAnyInterractionListenerB {
	private static _listener = (e: TAnyInterraction) => asi.mediator.publish(new ETAnyInterractionOccured(e));
	static new = (game: IDinamicUpdates) => {
		return pipe(
			{
				onStart(time) {
					document.addEventListener("click", TAnyInterractionListenerB._listener);
					document.addEventListener("keydown", TAnyInterractionListenerB._listener);
					window.addEventListener("touchend", TAnyInterractionListenerB._listener);
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
