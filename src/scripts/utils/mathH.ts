import { pipe } from "fp-ts/lib/function";
import SmoothLerper from "../CameraManagiment/Lerper";

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

	static lerp(start: number, end: number, t: number): number {
		return SmoothLerper.instance.Number(start, end, t);
	}
	static lerpc =
		(start: number) =>
		(end: number) =>
		(t: number): number =>
			mathH.lerp(start, end, t);

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
}
