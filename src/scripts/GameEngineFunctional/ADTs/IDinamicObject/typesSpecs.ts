import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";

export interface IRootGame {
	readonly startedAt: number;
	rootTime: ITimeMoment;
}
