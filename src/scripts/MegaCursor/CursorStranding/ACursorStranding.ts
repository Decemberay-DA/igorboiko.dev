import asi from "@/scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
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

	public readonly pageRelative = CursorPositionProviderB.newRelative(() => this.__pagePosition);
	public readonly clientRelstive = CursorPositionProviderB.newRelative(() => this.__clientPosition);
	public readonly window = CursorPositionProviderB.newRelativeWindow(() => this.__clientPosition);

	protected constructor() {
		super();
		this.onFrameUpdateOrder = GE.OnFrameUpdateOrders.EARLY_FRAME_UPDATE - 1;
	}
}

class CursorPositionProviderB {
	static newRelative = (getter: () => THREE.Vector2) => {
		const position = () => getter();
		const position0to1 = () =>
			new Vector2(getter().x / window.innerWidth, getter().y / window.innerHeight);
		const positionNegative1toPositive1 = () =>
			new Vector2((position0to1().x - 0.5) * 2, (position0to1().y - 0.5) * 2);
		const distanceTo = (point: THREE.Vector2) => getter().distanceTo(point);
		return {
			position,
			position0to1,
			positionNegative1toPositive1,
			distanceTo,
		};
	};

	static newRelativeWindow = (getter: () => THREE.Vector2) => {
		const isCursorWithinScreen = () => {
			const x = getter().x;
			const y = getter().y;
			return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
		};
		return {
			isCursorWithinScreen,
		};
	};
}
