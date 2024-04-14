import { ACursorStranding } from "./ACursorStranding";
import * as THREE from "three";

/**
 * makes cursor randomly move on screen
 * and sometimes follow touch
 */
export class TouchScreenCursorStranding extends ACursorStranding {
	public constructor() {
		super();
	}

	// seme as cursor for now
	private mousemoveListener?: (e: MouseEvent) => void;
	public override onStart(): void {
		this.mousemoveListener = (e: MouseEvent): void => {
			this.updatePosition(new THREE.Vector2(e.pageX, e.pageY));
		};
		document.addEventListener("mousemove", this.mousemoveListener);
	}

	public override onDelete(): void {
		super.onDelete();
		if (this.mousemoveListener) {
			document.removeEventListener("mousemove", this.mousemoveListener);
		}
	}

	private updatePosition(newPosition: THREE.Vector2): void {
		this.__pagePosition = newPosition;
	}
}
