import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { CS } from ".";

/**
 *
 */
// export class MouseCursorStranding extends CS.ACursorStranding {
// 	private _mousemoveListener = (e: MouseEvent): void => {
// 		const page = new THREE.Vector2(e.pageX, e.pageY);
// 		if (page !== new THREE.Vector2(0, 0)) {
// 			this.__pagePosition = page;
// 		}

// 		const client = new THREE.Vector2(e.clientX, e.clientY);
// 		if (client !== new THREE.Vector2(0, 0)) {
// 			this.__clientPosition = client;
// 		}
// 	};

// 	public constructor() {
// 		super();
// 	}

// 	public override onStart(): void {
// 		super.onStart();
// 		document.addEventListener("mousemove", this._mousemoveListener);
// 	}

// 	public override onDelete(): void {
// 		super.onDelete();
// 		document.removeEventListener("mousemove", this._mousemoveListener);
// 	}
// }
