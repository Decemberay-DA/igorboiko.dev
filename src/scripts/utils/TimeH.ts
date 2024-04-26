import { GE } from "../GameEngine";
import { math } from "./math";

export class TimeH {
	public static calculateRemainingFactor(startTime: number, endTime: number): number {
		const duration = endTime - startTime;
		const remainsms = endTime - GE.GameTime.realTimeSinceStartup;
		const remains0to1 = (duration / 1) * remainsms;
		const factor = 1 - remains0to1;

		return math.clamp(factor);
	}
}
