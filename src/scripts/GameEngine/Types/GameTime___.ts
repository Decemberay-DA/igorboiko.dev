import type { ITimeMoment } from "@/scripts/GameEngineFunctional/ADTs/ITimeMoment/ITimeMoment";
import { GE } from "../index";

/**
 * Handles time managiment in all scenes.
 * Singleton.
 * @deprecated use local game time from now on
 */
export class GameTime___ extends GE.ADynamicObject implements ITimeMoment {
	public constructor() {
		super();
		this.onFrameUpdateOrder = GE.OnFrameUpdateOrders.GAME_TIME;
	}

	public get sinceStart(): number {
		return GameTime___.sinceStart;
	}
	public get delta(): number {
		return GameTime___.delta;
	}
	public get frame(): number {
		return GameTime___.frame;
	}

	/**
	 * in seconds
	 * @deprecated use local game time from now on
	 */
	private static previousFrameTimestamp: DOMHighResTimeStamp = 0;
	/**
	 * in seconds
	 * @deprecated use local game time from now on
	 */
	public static delta: number = 0;
	/**
	 * @deprecated use local game time from now on
	 */
	public static frame: number = 0;
	/**
	 * in seconds
	 * @deprecated use local game time from now on
	 */
	public static sinceStart: number = 0;

	private static updateTime(time: DOMHighResTimeStamp = performance.now()): void {
		GameTime___.delta = (time - GameTime___.previousFrameTimestamp) / 1000;
		GameTime___.sinceStart += GameTime___.delta;
		GameTime___.previousFrameTimestamp = time;
		GameTime___.frame++;
	}

	public override onStart(): void {
		super.onStart();
		GameTime___.updateTime();
	}
	public override onFrameUpdate(): void {
		GameTime___.updateTime();
		// console.log("--------------- new frame '" + GameTime.currentFrame + "' GameTime ---------------");
	}
}
