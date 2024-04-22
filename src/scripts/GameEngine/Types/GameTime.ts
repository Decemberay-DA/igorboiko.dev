import { GE } from "../index";

/**
 * Handles time managiment in all scenes.
 * Singleton.
 */
export class GameTime extends GE.ADynamicObject {
	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.GAME_TIME;
	}

	/**
	 * in seconds
	 */
	private static previousFrameTimestamp: DOMHighResTimeStamp = 0;
	/**
	 * in seconds
	 */
	public static deltaTime: number = 0;
	public static currentFrame: number = 0;
	/**
	 * in seconds
	 */
	public static realTimeSinceStartup: number = 0;

	private static updateTime(time: DOMHighResTimeStamp = performance.now()): void {
		GameTime.deltaTime = (time - GameTime.previousFrameTimestamp) / 1000;
		GameTime.realTimeSinceStartup += GameTime.deltaTime;
		GameTime.previousFrameTimestamp = time;
		GameTime.currentFrame++;
	}

	public override onStart(): void {
		GameTime.updateTime();
	}
	public override onFrameUpdate(): void {
		GameTime.updateTime();
		// console.log("--------------- new frame '" + GameTime.currentFrame + "' GameTime ---------------");
	}
}