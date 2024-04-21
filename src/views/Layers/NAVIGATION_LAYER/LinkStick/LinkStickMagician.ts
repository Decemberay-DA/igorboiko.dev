import asi from "@/scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import DOMSearcherH from "@/scripts/VueTSHelpers/DOMSearcherH";

export default class SideStackMagician extends GE.ADynamicObject {
	private stack!: HTMLElement;

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.GUI_EFFECTS;
	}

	public override onStart(): void {
		this.stack = DOMSearcherH.getElementById("side-stack-89906bb0-5f3d-401d-9d8c-109faf03b099");
	}

	private transitionDistanceTreshold = 300;
	private _lastFrameState = false;
	public override onFrameUpdate(): void {
		const rect = this.stack.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const centerOfElement = new THREE.Vector2(centerX, centerY);

		const dustanceToCursor = asi.data.Cursor.clientRelstive.position.distanceTo(centerOfElement);

		const isInRange = dustanceToCursor < this.transitionDistanceTreshold;

		const isNewStateChanged = this._lastFrameState !== isInRange;

		// eq changed to in range
		if (isNewStateChanged && isInRange) {
			this.stack.classList.add("sgap__manual-hover");
		}
		if (isNewStateChanged && !isInRange) {
			this.stack.classList.remove("sgap__manual-hover");
		}

		this._lastFrameState = isInRange;
	}
}
