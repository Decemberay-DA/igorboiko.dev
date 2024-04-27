import { GE } from "..";

/**
 * @deprecated use somwthing from GameEngineFunctional
 */
export class GameManagerH {
	private constructor() {}

	public static start(): void {
		GE.Game.getInstance().triggerStart();
	}
}
