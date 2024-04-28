import type { IGame } from "./IGame";
import type { IDinamicObject } from "../../../IDinamicObject/IDinamicObject";
import { ITimeMomentB } from "../../../ITimeMoment/ITimeMomentB";

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

	static readonly register =
		(obj: IDinamicObject) =>
		async (game: IGame): Promise<IGame> => {
			game.participants.push(obj);
			game.participants.sort((a, b) => a.onFrameUpdateOrder - b.onFrameUpdateOrder);
			return game;
		};

	static readonly unRegister =
		(obj: IDinamicObject) =>
		async (game: IGame): Promise<IGame> => {
			const index = game.participants.indexOf(obj);
			if (index > -1) {
				game.participants.splice(index, 1);
			}
			return game;
		};
}
