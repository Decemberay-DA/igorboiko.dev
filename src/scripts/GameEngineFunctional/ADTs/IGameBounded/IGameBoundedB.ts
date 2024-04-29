import type { IGame } from "../IDinamicUpdate/IDinamicUpdates/IGame/IGame";
import type { IParented } from "./IGameBounded";

export class IGameBoundedB {
	static readonly new = (game: IGame): IParented => ({
		parentExecutor: game,
	});
}
