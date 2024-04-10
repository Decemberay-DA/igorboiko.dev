import { Vector2 } from "three";
import type { THREE } from "../../ThreeJS/THREE";
import ACursorStranding from "./ACursorStranding";

export default class MouseCursorStranding extends ACursorStranding {
	public constructor() {
		super();
	}

	private mousemoveListener?: (e: MouseEvent) => void;
	public override onStart(): void {
		this.mousemoveListener = (e: MouseEvent): void => {
			this.updatePosition(new Vector2(e.pageX, e.pageY));
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
		this.__currentPosition = newPosition;
	}
}
