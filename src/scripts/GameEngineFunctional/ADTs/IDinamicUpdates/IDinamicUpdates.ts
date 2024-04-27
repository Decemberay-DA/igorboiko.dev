import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";

export interface IDinamicUpdatesFields {
	onFrameUpdatePriority?: number;
	onStart?: (time: ITimeMoment) => void;
	onFrameUpdate?: (time: ITimeMoment) => void;
	onDelete?: (time: ITimeMoment) => void;
}

export interface IDinamicUpdates {
	onFrameUpdatePriority: number;
	onStart: (time: ITimeMoment) => void;
	onFrameUpdate: (time: ITimeMoment) => void;
	onDelete: (time: ITimeMoment) => void;
}
