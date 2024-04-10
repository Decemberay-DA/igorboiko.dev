import { GE, OnFrameUpdatePriorities } from "@/scripts/GameEngine";
import type { THREE } from "@/scripts/ThreeJS/THREE";
import { Vector2 } from "three";
import TouchScreenCursorStranding from "./TouchScreenCursorStranding";
import MouseCursorStranding from "./MouseCursorStranding";

/**
 * Handles cursor effects.
 * Platform specifick
 *
 * Yo like "Death Strending"
 * got it?
 * like Kojima reference
 */
export default class ACursorStranding extends GE.ADynamicObject {
	protected __currentPosition: THREE.Vector2 = new Vector2(0, 0);

	protected constructor() {
		super();
		this.__onFrameUpdatePriority = OnFrameUpdatePriorities.EARLY_FRAME_UPDATE - 1;
	}

	public get currentPosition(): THREE.Vector2 {
		return this.__currentPosition;
	}
	public get currentPosition0to1(): THREE.Vector2 {
		return new Vector2(
			this.__currentPosition.x / window.innerWidth,
			this.__currentPosition.y / window.innerHeight
		);
	}

	public getDistance(point: THREE.Vector2): number {
		const dx = point.x - this.__currentPosition.x;
		const dy = point.y - this.__currentPosition.y;
		const diatance = Math.sqrt(dx * dx + dy * dy);
		return diatance;
	}
}

export class CursorTraverserBuilder {
	public static getPlatformDependend(): ACursorStranding {
		var isTouchScreen = "ontouchstart" in document.documentElement;

		if (isTouchScreen) {
			return new TouchScreenCursorStranding();
		} else {
			return new MouseCursorStranding();
		}
	}
}
