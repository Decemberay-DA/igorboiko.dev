/**
 *
 */
export class math {
	public static clamp(val: number, min = 0, max = 1): number {
		return Math.max(min, Math.min(max, val));
	}
}
