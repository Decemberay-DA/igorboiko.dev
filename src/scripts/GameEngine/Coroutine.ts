import { GE } from ".";
import { math } from "../utils/Math";

export type ICoroutineParams = Readonly<_ICoroutineParams>;
interface _ICoroutineParams {
	stopOn: () => boolean;
	onStart?: () => void;
	onUpdate?: () => void;
	onDelete?: () => void;
}

/**
 * executes some things untill end, then getting destrouyed.
 * analogues to TWEEN but with custom controll
 *
 * maybe create separete GAME that will deliberately work with coroutines
 */
export class Coroutine extends GE.ADynamicObject {
	public readonly actionOnStart: () => void = () => {};
	public readonly actionOnFrameUpdate: () => void = () => {};
	public readonly actionOnDelete: () => void = () => {};
	public readonly stopCondition: () => boolean;

	private _isRunning: boolean = false;
	public get isRunning(): boolean {
		return this._isRunning;
	}

	public constructor(params: ICoroutineParams) {
		super();
		this.disable();

		this.actionOnStart = params.onStart ?? this.actionOnStart;
		this.actionOnFrameUpdate = params.onUpdate ?? this.actionOnFrameUpdate;
		this.actionOnDelete = params.onDelete ?? this.actionOnDelete;

		this.stopCondition = params.stopOn;
	}

	public static calculateRemainingFactor(startTime: number, duration: number): number {
		const endTime = startTime + duration;
		const remainsms = endTime - GE.GameTime.realTimeSinceStartup;
		const remains0to1 = (duration / 1) * remainsms;
		const factor = 1 - remains0to1;

		return math.clamp(factor);
	}

	public launch() {
		this.enable();
		this._isRunning = true;
		this.onStart();
	}

	public override onFrameUpdate(): void {
		this.actionOnFrameUpdate();
		if (this.stopCondition()) {
			this.delete();
		}
	}

	private _isKilled = false;
	/**
	 * errases this coroutine without executing onDelete
	 */
	public kill() {
		this._isKilled = true;
		this.delete();
	}

	public override onDelete(): void {
		this._isRunning = false;
		if (!this._isKilled) this.actionOnDelete();
	}
}
