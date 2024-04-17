/**
 *
 */
export class math {
	public static clamp(val: number, min = 0, max = 1): number {
		return Math.max(min, Math.min(max, val));
	}

	public static remapRange(
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