import type { IDinamicUpdates } from "../IDinamicUpdate/IDinamicUpdates/IDinamicUpdates";
import type { IGame } from "../IDinamicUpdate/IDinamicUpdates/IGame/IGame";

/**
 * knows about its own game
 */
export interface IParented {
	parentExecutor: IDinamicUpdates;
}
