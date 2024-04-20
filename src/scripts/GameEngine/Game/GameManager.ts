import { GE } from "..";

/**
 * comment
 */
export class GameManager {
	private static _instance: GameManager;
	private constructor() {}
	public static getInstance(): GameManager {
		if (!GameManager._instance) {
			GameManager._instance = new GameManager();
		}
		return GameManager._instance;
	}

	public start(): void {
		GE.Game.getInstance().triggerStart();
	}
}
