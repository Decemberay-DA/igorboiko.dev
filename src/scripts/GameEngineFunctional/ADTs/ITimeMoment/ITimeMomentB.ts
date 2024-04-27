import { MATHJS } from "@/scripts/FrameworksExport";
import type { ITimeMoment } from "./ITimeMoment";
import { pipe } from "fp-ts/lib/function";
import { array } from "fp-ts";

/**
 *
 */
export class ITimeMomentB {
	static readonly new = (currentTime: number): ITimeMoment => ({
		sinceStart: currentTime,
		delta: 0,
		frame: -1,
	});
	static readonly current =
		(previousMoment: ITimeMoment) =>
		(currentTime: number): ITimeMoment => ({
			sinceStart: currentTime,
			delta: currentTime - previousMoment.sinceStart,
			frame: -1,
		});

	static readonly toArray = (timeMoment: ITimeMoment): number[] => {
		return [timeMoment.sinceStart, timeMoment.delta, timeMoment.frame];
	};
	static readonly fromArray = (matrix: number[]): ITimeMoment => ({
		sinceStart: matrix[0],
		delta: matrix[1],
		frame: matrix[2],
	});

	static readonly processCollection =
		(action: (data: number[][]) => number[]) =>
		(...moments: ITimeMoment[]): ITimeMoment =>
			pipe(
				moments,
				array.map((m) => ITimeMomentB.toArray(m)),
				action,
				ITimeMomentB.fromArray
			);

	static readonly max: (...moments: ITimeMoment[]) => ITimeMoment = ITimeMomentB.processCollection(
		MATHJS.max
	);
	static readonly min: (...moments: ITimeMoment[]) => ITimeMoment = ITimeMomentB.processCollection(
		MATHJS.min
	);
	static readonly mean: (...moments: ITimeMoment[]) => ITimeMoment = ITimeMomentB.processCollection(
		MATHJS.mean
	);
}
