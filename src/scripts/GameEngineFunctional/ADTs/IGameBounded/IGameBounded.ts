import type { IGame } from "../IGame/IGame";

/**
 * knows about its own game
 */
export interface IGameBounded {
	parentGame: IGame;
}
