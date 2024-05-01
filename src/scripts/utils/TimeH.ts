import { pipe } from "fp-ts/lib/function";
import { mathH } from "./mathH";
import asi from "../asi/asi";

export type TTimeEncoding = "MS" | "SEC" | "MIN" | "HOUR" | "DAY";

export class TimeH {
	private static readonly _intermadiateTime: TTimeEncoding = "SEC";
	private static readonly X_To_Intermadiate =
		(from: TTimeEncoding) =>
		(value: number): number => {
			switch (from) {
				case "MS":
					return value / 1000;
				case "SEC":
					return value;
				case "MIN":
					return value * 60;
				case "HOUR":
					return value * 3600;
				case "DAY":
					return value * 86400;
			}
		};
	private static readonly Intermadiate_To_X =
		(to: TTimeEncoding) =>
		(value: number): number => {
			switch (to) {
				case "MS":
					return value * 1000;
				case "SEC":
					return value;
				case "MIN":
					return value / 60;
				case "HOUR":
					return value / 3600;
				case "DAY":
					return value / 86400;
			}
		};

	static readonly convert =
		(from: TTimeEncoding) =>
		(to: TTimeEncoding) =>
		(value: number): number =>
			pipe(
				value, //
				TimeH.X_To_Intermadiate(from),
				TimeH.Intermadiate_To_X(to)
			);

	public static calculateRemainingFactor(startTime: number, endTime: number): number {
		const duration = endTime - startTime;
		const remainsms = endTime - asi.game.rootTime.sinceStart;
		const remains0to1 = (duration / 1) * remainsms;
		const factor = 1 - remains0to1;

		return mathH.clamp(factor);
	}
}
