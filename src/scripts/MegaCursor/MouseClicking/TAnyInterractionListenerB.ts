import type { TAnyInterraction } from "./TAnyInterraction";
import asi from "@/scripts/asi/asi";
import ETAnyInterractionOccured from "./Events/ETAnyInterractionOccured";
import { pipe } from "fp-ts/lib/function";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/builders";
import { IDinamicUpdatesH } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import type { IDinamicUpdates } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { array } from "fp-ts";
import { IListenerB } from "@/scripts/GameEngineFunctional/Types/IListenerH";

export class TAnyInterractionListenerB {
	private static readonly _listener = (e: TAnyInterraction) =>
		asi.mediator.publish(new ETAnyInterractionOccured(e));
	static readonly new = <A extends IDinamicUpdates>(game: A) => {
		return pipe(
			[
				IListenerB.newSubscribeUnsobscribeActionsFor(document)(
					"click",
					TAnyInterractionListenerB._listener as any
				),
				IListenerB.newSubscribeUnsobscribeActionsFor(document)(
					"keydown",
					TAnyInterractionListenerB._listener as any
				),
				IListenerB.newSubscribeUnsobscribeActionsFor(window)(
					"touchend",
					TAnyInterractionListenerB._listener as any
				),
			],
			array.map((a) => IDinamicUpdateB.new(a)),
			array.reduce(IDinamicUpdateB.empty(), (a, b) => IDinamicUpdateB.concat(a)(b)),
			IDinamicObjectB.new,
			IDinamicUpdatesH.newInsertedAndParented(game),
			IDB.new
		);
	};
}
