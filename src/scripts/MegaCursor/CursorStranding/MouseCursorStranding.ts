import { Vector2 } from "three";
import { ACursorStranding } from "./ACursorStranding";

/**
 *
 */
export class MouseCursorStranding extends ACursorStranding {
	private _mousemoveListener = (e: MouseEvent): void => {
		const page = new Vector2(e.pageX, e.pageY);
		if (page !== new Vector2(0, 0)) {
			this.__pagePosition = page;
		}

		const client = new Vector2(e.clientX, e.clientY);
		if (client !== new Vector2(0, 0)) {
			this.__clientPosition = client;
		}
	};
	
	public constructor() {
		super();
	}

	public override onStart(): void {
		document.addEventListener("mousemove", this._mousemoveListener);
		// document.addEventListener("scroll", this._mousemoveListener);
	}

	public override onDelete(): void {
		super.onDelete();
		document.removeEventListener("mousemove", this._mousemoveListener);
		// document.removeEventListener("scroll", this._mousemoveListener);
	}
}
