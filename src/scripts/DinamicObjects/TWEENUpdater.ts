import { GE } from "../GameEngine";
import * as TWEEN from "@tweenjs/tween.js";
import { instance } from "three/examples/jsm/nodes/Nodes.js";

/**
 * handles animation of tweens
 */
export class TWEENUpdater extends GE.ADynamicObject {
	public constructor() {
		super();
	}
	public override onFrameUpdate(): void {
		const time = GE.GameTime.realTimeSinceStartup;
		TWEEN.update(time);
	}
}
