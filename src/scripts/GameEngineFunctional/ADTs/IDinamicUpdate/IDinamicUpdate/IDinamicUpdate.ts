import type { ITimeMoment } from "../../ITimeMoment/ITimeMoment";

export interface IDinamicUpdateFields {
	onFrameUpdateOrder?: number;
	onStart?: (time: ITimeMoment) => void;
	onFrameUpdate?: (time: ITimeMoment) => void;
	onDelete?: (time: ITimeMoment) => void;
}

export interface IDinamicUpdate {
	onFrameUpdateOrder: number;
	onStart: (time: ITimeMoment) => void;
	onFrameUpdate: (time: ITimeMoment) => void;
	onDelete: (time: ITimeMoment) => void;
}
