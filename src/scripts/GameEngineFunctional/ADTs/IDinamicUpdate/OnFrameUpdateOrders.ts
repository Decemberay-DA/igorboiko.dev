/**
 * Static definition of update orders.
 * Legit for every type of update: onStart, onFrame, etc cz array is sorted
 */

export class OnFrameUpdateOrders {
	// any shared base
	public static readonly GAME_TIME = -10000;
	public static readonly EARLY_FRAME_UPDATE = -9500;
	// any logick
	public static readonly MID_FRAME_UPDATE = -9000;
	// any visuals
	public static readonly THREE_SCENE = -2000;
	public static readonly GUI_EFFECTS = -100;
	// post scene updators
	public static readonly LATE_FRAME_UPDATE = 10000;
}
