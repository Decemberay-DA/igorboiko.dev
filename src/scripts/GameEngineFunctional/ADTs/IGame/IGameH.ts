import type { IGame } from "./IGame";
import type { IDinamicObject } from "../IDinamicObject/IDinamicObject";
import { ITimeMomentB } from "../ITimeMoment/ITimeMomentB";
import type { Endomorphism } from "fp-ts/lib/Endomorphism";

/**
 *
 */
export class IGameH {
	static readonly traverce =
		(onEach: (obj: IDinamicObject) => void) =>
		<G extends IGame>(game: G): G => {
			game.participants.forEach((x) => onEach(x));
			return game;
		};

	static readonly concat = (x: IGame, y: IGame): IGame => ({
		...x,
		participants: [...x.participants, ...y.participants],
		timeMoment: ITimeMomentB.mean(x.timeMoment, y.timeMoment),
	});

	// static readonly initialStart = <G extends IGame>(game: G): G => {
	// 	const executed = pipe(
	// 		game.participants, //
	// 		array.map((x) => IDinamicObjectH.start(x)(game.currentTimeMoment))
	// 	);
	// 	return game;
	// };

	// static readonly frameUpdate = <G extends IGame>(game: G): G => {
	// 	const executed = pipe(
	// 		game.participants, //
	// 		array.map((x) => IDinamicObjectH.frameUpdate(x)(game.currentTimeMoment))
	// 	);
	// 	return game;
	// };
}
