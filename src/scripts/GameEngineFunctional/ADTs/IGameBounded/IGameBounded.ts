import type { IGame } from "../IDinamicUpdate/IDinamicUpdates/IGame/IGame";

/**
 * knows about its own game
 */
export interface IGameBounded {
	parentGame: IGame;
}
