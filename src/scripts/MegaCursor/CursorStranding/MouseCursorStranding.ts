import { Vector2 } from "three";
import type { THREE } from "../../ThreeJS/THREE";
import { ACursorStranding } from "./ACursorStranding";

export class MouseCursorStranding extends ACursorStranding {
	private _mousemoveListener = (e: MouseEvent): void => {
		const position = new Vector2(e.pageX, e.pageY);

		if (position !== new Vector2(0, 0)) {
			this.updatePosition(position);
			// console.warn(
			// 	"MouseCursorStranding: Current cursor position : x = '" +
			// 		this.__currentPosition.x +
			// 		"' y = '" +
			// 		this.__currentPosition.y +
			// 		"'"
			// );
		}
	};

	public constructor() {
		super();
		console.warn("MouseCursorStranding was created");
	}

	public override onStart(): void {
		document.addEventListener("mousemove", this._mousemoveListener);
		console.warn("MouseCursorStranding was started");
	}

	public override onDelete(): void {
		super.onDelete();
		document.removeEventListener("mousemove", this._mousemoveListener);
	}

	private updatePosition(newPosition: THREE.Vector2): void {
		this.__currentPosition = newPosition;
	}
}
