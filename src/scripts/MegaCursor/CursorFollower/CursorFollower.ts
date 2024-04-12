import { asi } from "../../asi/asi";
import * as GE from "../../GameEngine/index";
import DOMSearcher from "@/scripts/VueTSHelper/DOMSearcher";
import { THREE } from "@/scripts/ThreeJS/THREE";
import { Lerper } from "@/scripts/CameraManagiment/Lerper";

export default class CursorFollower extends GE.ADynamicObject {
	private draggerF!: CursorDragger;
	private draggerB!: CursorDragger;

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.LATE_FRAME_UPDATE;
	}

	override onStart(): void {
		// if (asi.context.pageType === asiSpecificks.PageTypes.ERROR_404_PAGE) {
		const foregroundStar = DOMSearcher.getElementById(
			"cursor_betreyal_foregroundStar.f1d525ae-f58e-4746-998a-243effeb900c"
		);
		const backgroundStar = DOMSearcher.getElementById(
			"cursor_betreyal_backgroundStar.f1d545ae-f58e-4746-998a-243effeb900c"
		);

		this.draggerF = new CursorDragger(foregroundStar, 0.5);
		this.draggerB = new CursorDragger(backgroundStar, 0.1);
	}

	public override onFrameUpdate(): void {
		this.draggerF.doDrag();
		this.draggerB.doDrag();
	}
}

class CursorDragger {
	private element: HTMLElement;
	private _lastPosition: THREE.Vector2 = new THREE.Vector2(0, 0); // todo get center position on page
	private _dragForce: number;

	public constructor(element: HTMLElement, dragForce: number) {
		this.element = element;
		this._dragForce = dragForce;
	}

	public doDrag() {
		const currentCursorPosition = new THREE.Vector2(
			asi.data.Cursor.currentPosition.x,
			asi.data.Cursor.currentPosition.y
		);
		const draggedposition = Lerper.lerpVector2(
			this._lastPosition,
			currentCursorPosition,
			this._dragForce
		);
		this._lastPosition = draggedposition;

		this.element.style.left = draggedposition.x + "px";
		this.element.style.top = draggedposition.y + "px";
	}
}
