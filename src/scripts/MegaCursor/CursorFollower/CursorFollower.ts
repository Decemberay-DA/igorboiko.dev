import { asi } from "../../asi/asi";
import * as GE from "../../GameEngine/index";
import DOMSearcher from "@/scripts/VueTSHelper/DOMSearcher";
import { THREE } from "@/scripts/ThreeJS/THREE";
import { SmoothLerper } from "@/scripts/CameraManagiment/Lerper";

export class CursorFollower extends GE.ADynamicObject {
	private draggerF!: CursorDragger;
	private draggerB!: CursorDragger;

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;
	}

	override onStart(): void {
		// if (asi.context.pageType === asiSpecificks.PageTypes.ERROR_404_PAGE) {
		const foregroundStar = DOMSearcher.getElementById("cursor_betreyal_foregroundStar");
		this.draggerF = new CursorDragger(foregroundStar, 0.5);

		const backgroundStar = DOMSearcher.getElementById("cursor_betreyal_backgroundStar");
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
			asi.data.Cursor.pageRelative.position.x,
			asi.data.Cursor.pageRelative.position.y
		);

		const x = SmoothLerper.number(this._lastPosition.x, currentCursorPosition.x, this._dragForce);
		const y = SmoothLerper.number(this._lastPosition.y, currentCursorPosition.y, this._dragForce);

		const draggedposition = asi.data.Cursor.pageRelative.position;
		this._lastPosition = draggedposition;

		this._element.style.left = draggedposition.x + "px";
		this._element.style.top = draggedposition.y + "px";
	}
}
