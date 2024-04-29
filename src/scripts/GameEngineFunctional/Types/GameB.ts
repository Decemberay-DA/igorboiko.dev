import { pipe } from "fp-ts/lib/function";
import type { ID } from "../ADTs/ID.ts/ID";
import { IDB } from "../ADTs/ID.ts/IDB";
import type { IDinamicObject } from "../ADTs/IDinamicObject/IDinamicObject";
import { type IRootGame, IDinamicObjectB } from "../ADTs/IDinamicObject/IDinamicObjectB";
import type { IDinamicUpdates } from "../ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicUpdatesB } from "../ADTs/IDinamicUpdates/IDinamicUpdatesB";

/**
 *
 */
export type Game = IDinamicUpdates & IDinamicObject & IRootGame;

/**
 * builds root top entities that unfortunatelly ron on the same thread
 */
export class GameB {
	static rootGame = (): ID<Game> =>
		pipe(
			{
				onStart(time) {
					console.log("Root game started");
				},
			},
			IDinamicUpdatesB.new,
			IDinamicObjectB.newRootSelfUpdating,
			IDB.new
		);
	static coroutineGame = (): ID<Game> =>
		pipe(
			{
				onStart(time) {
					console.log("Root game started");
				},
			},
			IDinamicUpdatesB.new,
			IDinamicObjectB.newRootSelfUpdating,
			IDB.new
		);
	static listenerGame = (): ID<Game> =>
		pipe(
			{
				onStart(time) {
					console.log("Root game started");
				},
			},
			IDinamicUpdatesB.new,
			IDinamicObjectB.newRootSelfUpdating,
			IDB.new
		);
}
