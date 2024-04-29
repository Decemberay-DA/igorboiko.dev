import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";

export interface IDinamicUpdateFields {
	onFrameUpdateOrder?: number;
	onStart?: (time: ITimeMoment) => void;
	onFrameUpdate?: (time: ITimeMoment) => void;
	onDelete?: (time: ITimeMoment) => void;
}

export interface IDinamicUpdate {
	readonly onFrameUpdateOrder: number;
	_isStarted: boolean;
	readonly onStart: (time: ITimeMoment) => void;
	readonly onFrameUpdate: (time: ITimeMoment) => void;
	_isDeleted: boolean;
	readonly onDelete: (time: ITimeMoment) => void;
}
