import { asi } from "../asi/asi";
import { GE } from "../GameEngine";
import type { ISection } from "./EDefinedSections";
import VueSpecificks from "./VueSpecificks";

/**
 * detects current section when mouse move
 * and call transition to it
 */
export class CurrentSectionDetector extends GE.ADynamicObject {
	public override onStart(): void {
		document.addEventListener("mousemove", this.detect);
		document.addEventListener("scroll", this.detect);
	}
	public override onDelete(): void {
		document.removeEventListener("mousemove", this.detect);
		document.removeEventListener("scroll", this.detect);
	}

	public constructor() {
		super();
	}

	private detect(): void {
		if (GE.GameTime.currentFrame > 1) {
			CurrentSectionDetector.byHorizontallCursorOverlap();
		}
		// if (asi.context.cursor.window.isCursorWithinScreen) {
		// 	this.byHorizontallCursorOverlap();
		// } else {
		// 	this.byHorizontallCursorOverlap();
		// 	// this.byScroll();
		// }
	}

	private static byHorizontallCursorOverlap(): void {
		const previousActiveSection = asi.data.DefinedSections.curentSection;
		const sections = asi.data.DefinedSections.getAllSections;
		let activeSection: ISection | null = null;

		const checkParams = {
			vertical: false,
			horizontal: true,
		};
		for (const section of sections) {
			console.warn("checking section: " + section.name);
			const isOverlaps = VueSpecificks.isCursorOverlaps(
				asi.context.cursor.clientRelstive.position,
				section.htmlElement,
				checkParams
			);
			if (!isOverlaps) continue;

			activeSection = section;
			console.warn(">>> ACTIVE SECTION IS >>>: " + section.name);

			const newSection = activeSection;
			const isSectionWasChanged = previousActiveSection !== newSection;

			if (isSectionWasChanged && asi.context.isAbleCursorSectionSwitching) {
				asi.data.CAMERA_SCENES.tweenToScene(newSection.name);
			}
		}
	}

	private byScroll() {
		const sections = asi.data.DefinedSections.getAllSections;

		for (const section of sections) {
			const div = section.htmlElement;
			const isVisible = div && div.offsetWidth > 0 && div.offsetHeight > 0;
		}
	}
}
