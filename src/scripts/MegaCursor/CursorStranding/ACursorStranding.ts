import { asi } from "@/scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import type { THREE } from "@/scripts/ThreeJS/THREE";
import { Vector2 } from "three";

/**
 * Handles cursor effects.
 * Platform specifick
 *
 * Yo like "Death Strending"
 * got it?
 * like Kojima reference
 */
export class ACursorStranding extends GE.ADynamicObject {
	protected __pagePosition: THREE.Vector2 = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
	protected __clientPosition: THREE.Vector2 = new Vector2(window.innerWidth / 2, window.innerHeight / 2);

	public readonly pageRelative: CursorPositionDataProvider;
	public readonly clientRelstive: CursorPositionDataProvider;
	public readonly window: CursorPositionWindowDataProvider;

	protected constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE - 1;

		this.pageRelative = new CursorPositionDataProvider(() => this.__pagePosition);
		this.clientRelstive = new CursorPositionDataProvider(() => this.__clientPosition);
		this.window = new CursorPositionWindowDataProvider(() => this.__clientPosition);
	}
}

class CursorPositionDataProvider {
	private readonly getter: () => THREE.Vector2;
	public constructor(getter: () => THREE.Vector2) {
		this.getter = getter;
	}
	public get position(): THREE.Vector2 {
		return this.getter();
	}
	public get position0to1(): THREE.Vector2 {
		return new Vector2(this.getter().x / window.innerWidth, this.getter().y / window.innerHeight);
	}
	public get positionNegative1toPositive1(): THREE.Vector2 {
		return new Vector2((this.position0to1.x - 0.5) * 2, (this.position0to1.y - 0.5) * 2);
	}
	public distanceTo(point: THREE.Vector2): number {
		return this.getter().distanceTo(point);
	}
}

class CursorPositionWindowDataProvider {
	private readonly getter: () => THREE.Vector2;
	public constructor(getter: () => THREE.Vector2) {
		this.getter = getter;
	}
	public get isCursorWithinScreen(): boolean {
		const x = this.getter().x;
		const y = this.getter().y;
		const width = window.innerWidth;
		const height = window.innerHeight;

		return x >= 0 && x <= width && y >= 0 && y <= height;
	}
}
