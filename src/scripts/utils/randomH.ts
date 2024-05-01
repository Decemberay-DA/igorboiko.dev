import { pipe } from "fp-ts/lib/function";
import { mathH } from "./mathH";

/**
 *
 */
export default class randomH {
	private static _randomCallCount = Number.MIN_SAFE_INTEGER;
	public static float0to1 = (seed?: number) => randomH.floatneg1to1(seed) * 0.5 + 0.5;
	public static floatneg1to1(seed?: number) {
		const seed2 =
			seed ??
			performance.now() * //
				performance.now() +
				performance.now() +
				randomH._randomCallCount;
		const hash = seed2 * 1103515245.054 + 12345.054;
		const sin = Math.sin((seed2 * hash * 4543.21564 + hash / 0x7fffffff) * (0.0004658423 * seed2));
		randomH._randomCallCount = randomH._randomCallCount + 1;
		return sin;
	}
	public floatInRange = (seed?: number, min: number = 0, max: number = 1) =>
		pipe(
			randomH.float0to1(seed), //
			mathH.remapRangec(0, 1, min, max)
		);
}
