import { MATHJS } from "@/scripts/FrameworksExport";
import type { ITimeMoment } from "./ITimeMoment";

/**
 *
 */
export class ITimeMomentH {
	static readonly calculateDeltaTime =
		(previous: number) =>
		(current: number): number =>
			current - previous;
}
