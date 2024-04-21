import { pipe } from "fp-ts/lib/function";
import { asi } from "../asi/asi";
import { GE } from "../GameEngine";
import HTMLElementEX from "./HTMLElementEX";
import { array } from "fp-ts";
import SectionWasChangedToID from "../CameraManagiment/DefinedScenes/Events/SectionWasChangedTo";

/**
 * detects current section when mouse move
 * and call transition to it
 */
export class CurrentSceneFromDOMDetector extends GE.ADynamicObject {
	public override onStart(): void {
		document.addEventListener("mousemove", this._detect);
		document.addEventListener("scroll", this._detect);
	}
	public override onDelete(): void {
		document.removeEventListener("mousemove", this._detect);
		document.removeEventListener("scroll", this._detect);
	}

	public constructor() {
		super();
	}

	private _detect(): void {
		if (GE.GameTime.currentFrame < 1) return;
		CurrentSceneFromDOMDetector.byHorizontallCursorOverlap();
	}

	private static byHorizontallCursorOverlap(): void {
		const previousActiveScene = asi.data.ScenesRegistry.currentScene;
		const scenes = asi.data.ScenesRegistry.getScenes;

		const checkParams = {
			vertical: false,
			horizontal: true,
		};

		const overlapedSections = pipe(
			scenes,
			array.filter((sc) =>
				HTMLElementEX.isCursorOverlaps(
					asi.data.Cursor.clientRelstive.position,
					sc.htmlElement,
					checkParams
				)
			)
		);

		if (overlapedSections.length <= 0) return;
		const currentScene = overlapedSections[0];

		const isSectionWasChanged = previousActiveScene !== currentScene;

		if (isSectionWasChanged && asi.context.isAbleCursorSectionSwitching) {
			asi.mediator.publish(new SectionWasChangedToID(currentScene.nameID));
		}
	}
}
