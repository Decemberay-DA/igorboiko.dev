import { GE } from "../GameEngine";

/**
 *
 */
export default class randomH {
	public static float0to1(seed?: number) {
		const seed2 = seed ?? GE.GameTime.realTimeSinceStartup * GE.GameTime.deltaTime + performance.now();
		const hash = seed2 * 1103515245.054 + 12345.054;
		const sin = Math.sin((seed2 * hash * 4543.21564 + hash / 0x7fffffff) * (0.0004658423 * seed2));
		const zeroToOne = sin * 0.5 + 0.5;
		return zeroToOne;
	}
}
