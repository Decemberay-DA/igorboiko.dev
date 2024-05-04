import { pipe } from "fp-ts/lib/function";
import { LerpH } from "../CameraManagiment/Lerper";
import { ArgH } from "./ArgH";

/**
 *
 */
export class mathH {
	static clamp(val: number, min = 0, max = 1): number {
		return pipe(
			val,
			(x) => Math.max(x, min),
			(x) => Math.min(x, max)
		);
	}
	static clampc =
		(min = 0) =>
		(max = 1) =>
		(val: number): number =>
			mathH.clamp(val, min, max);

	static lerp = LerpH.Number;
	static lerpc = ArgH.curry3(mathH.lerp);

	static remapRange(
		value: number,
		fromMin: number = 0,
		fromMax: number = 1,
		toMin: number = 0,
		toMax: number = 1
	): number {
		const ratio = (value - fromMin) / (fromMax - fromMin);
		return toMin + ratio * (toMax - toMin);
	}
	static remapRangec =
		(fromMin: number = 0, fromMax: number = 1, toMin: number = 0, toMax: number = 1) =>
		(value: number): number =>
			mathH.remapRange(value, fromMin, fromMax, toMin, toMax);
}
