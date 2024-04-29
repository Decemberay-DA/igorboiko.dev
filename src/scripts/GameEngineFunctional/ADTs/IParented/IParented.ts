import type { IDinamicUpdates } from "../IDinamicUpdates/IDinamicUpdates";

/**
 * knows about its own game
 */
export interface IParented extends IParented2<IDinamicUpdates> {
	parent: IDinamicUpdates;
}

export interface IParented2<Parent> {
	parent: Parent;
}
