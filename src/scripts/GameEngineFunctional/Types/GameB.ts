import { pipe } from "fp-ts/lib/function";
import type { ID } from "../ADTs/ID.ts/ID";
import { IDB } from "../ADTs/ID.ts/IDB";
import type { IDinamicObject } from "../ADTs/IDinamicObject/IDinamicObject";
import { type IRootGame, IDinamicObjectB } from "../ADTs/IDinamicObject/IDinamicObjectB";
import type { IDinamicUpdates } from "../ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicUpdatesB } from "../ADTs/IDinamicUpdates/IDinamicUpdatesB";
import type { IDinamicUpdateFields } from "../ADTs/IDinamicUpdate/IDinamicUpdate";

/**
 *
 */
export type Game = IDinamicUpdates & IDinamicObject & IRootGame;

/**
 * builds root top entities that unfortunatelly ron on the same thread
 */
export class GameB {
	static _createGame = (dinamicUpdateFields: IDinamicUpdateFields): ID<Game> =>
		pipe(
			dinamicUpdateFields, //
			IDinamicUpdatesB.new,
			IDinamicObjectB.newRootSelfUpdating,
			IDB.new
		);

	static rootGame = (): ID<Game> =>
		GameB._createGame({
			onStart(time) {
				console.log("rootGame started");
			},
		});
	static coroutineGame = (): ID<Game> =>
		GameB._createGame({
			onStart(time) {
				console.log("coroutineGame started");
			},
		});
	static listenerGame = (): ID<Game> =>
		GameB._createGame({
			onStart(time) {
				console.log("listenerGame started");
			},
		});
}
