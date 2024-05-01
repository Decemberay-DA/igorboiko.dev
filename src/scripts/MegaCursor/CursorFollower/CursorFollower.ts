import asi from "../../asi/asi";
import * as GE from "../../GameEngine/index";
import DOMSearcherH from "@/scripts/VueTSHelpers/DOMSearcherH";
import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { LerpH } from "@/scripts/CameraManagiment/Lerper";

export class CursorFollower extends GE.ADynamicObject {
	private draggerF!: CursorDragger;
	private draggerB!: CursorDragger;

	public constructor() {
		super();
		this.onFrameUpdateOrder = GE.OnFrameUpdateOrders.LATE_FRAME_UPDATE;
	}

	override onStart(): void {
		super.onStart();
		// if (asi.context.pageType === asiSpecificks.PageTypes.ERROR_404_PAGE) {
		const foregroundStar = DOMSearcherH.getElementById("cursor_betreyal_foregroundStar");
		this.draggerF = new CursorDragger(foregroundStar, 0.5);

		const backgroundStar = DOMSearcherH.getElementById("cursor_betreyal_backgroundStar");
		this.draggerB = new CursorDragger(backgroundStar, 0.1);
	}

	public override onFrameUpdate(): void {
		this.draggerF.doDrugs();
		this.draggerB.doDrugs();
	}
}

class CursorDragger {
	private _element: HTMLElement;
	private _lastPosition = new THREE.Vector2(0, 0); // todo get center position on page
	private _dragForce: number;
	// private _lerper = new SmoothLerper(0);

	public constructor(element: HTMLElement, dragForce: number) {
		this._element = element;
		this._dragForce = dragForce;
	}

	public doDrugs() {
		const currentCursorPosition = new THREE.Vector2(
			asi.data.cursor.pageRelative.position.x,
			asi.data.cursor.pageRelative.position.y
		);

		const x = LerpH.number(this._lastPosition.x, currentCursorPosition.x, this._dragForce);
		const y = LerpH.number(this._lastPosition.y, currentCursorPosition.y, this._dragForce);

		const draggedposition = asi.data.cursor.pageRelative.position;
		this._lastPosition = draggedposition;

		this._element.style.left = draggedposition.x + "px";
		this._element.style.top = draggedposition.y + "px";
	}
}
