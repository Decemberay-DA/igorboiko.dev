export class GameTime {
    private static previousFrameTimestamp: DOMHighResTimeStamp = 0;
    public static deltaTime: number = 0;
    public static currentFrame: number = 0;
    public static realTimeSinceStartup: number = 0;

    public static updateTime(
        time: DOMHighResTimeStamp = performance.now()
    ): void {
        GameTime.deltaTime = (time - GameTime.previousFrameTimestamp) / 1000;
        GameTime.realTimeSinceStartup += GameTime.deltaTime;
        GameTime.previousFrameTimestamp = time;
        GameTime.currentFrame++;
    }
}
