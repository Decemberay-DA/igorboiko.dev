import { ITopLevelGameB } from "../GameEngineFunctional/Types/ITopLevelGameB.ts";

/**
 *
 */
export class game {
	/**
	 * functional
	 */
	public readonly root = ITopLevelGameB.newRootGame();
	public get rootTime() {
		return this.root.self.rootTime;
	}
}
