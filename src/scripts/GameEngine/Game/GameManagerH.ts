import { GE } from "..";

/**
 * comment
 */
export class GameManagerH {
	private constructor() {}

	public static start(): void {
		GE.Game.getInstance().triggerStart();
	}
}
