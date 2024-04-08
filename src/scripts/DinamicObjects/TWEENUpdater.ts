import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";

export class TWEENUpdater extends GE.ADynamicObject {
	public constructor() {
		super();
	}
	public override onFrameUpdate(): void {
		const time = GE.GameTime.realTimeSinceStartup;
		TWEEN.update(time);
	}
}
