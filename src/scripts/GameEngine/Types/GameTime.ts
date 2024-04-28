import { GE } from "../index";

/**
 * Handles time managiment in all scenes.
 * Singleton.
 * @deprecated use somwthing from GameEngineFunctional
 */
export class GameTime extends GE.ADynamicObject {
	public constructor() {
		super();
		this.onFrameUpdateOrder = GE.OnFrameUpdatePriorities.GAME_TIME;
	}

	/**
	 * in seconds
	 */
	private static previousFrameTimestamp: DOMHighResTimeStamp = 0;
	/**
	 * in seconds
	 */
	public static deltaTime: number = 0;
	public static frame: number = 0;
	/**
	 * in seconds
	 */
	public static realTimeSinceStartup: number = 0;

	private static updateTime(time: DOMHighResTimeStamp = performance.now()): void {
		GameTime.deltaTime = (time - GameTime.previousFrameTimestamp) / 1000;
		GameTime.realTimeSinceStartup += GameTime.deltaTime;
		GameTime.previousFrameTimestamp = time;
		GameTime.frame++;
	}

	public override onStart(): void {
		GameTime.updateTime();
	}
	public override onFrameUpdate(): void {
		GameTime.updateTime();
		// console.log("--------------- new frame '" + GameTime.currentFrame + "' GameTime ---------------");
	}
}
