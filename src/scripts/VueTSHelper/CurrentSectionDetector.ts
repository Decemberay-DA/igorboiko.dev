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
		document.addEventListener("mousemove", this.byCursorOverlap);
	}
	public override onDelete(): void {
		document.removeEventListener("mousemove", this.byCursorOverlap);
	}

	private byCursorOverlap() {
		const previousActiveSection = asi.data.DefinedSections.curentSection;
		const sections = asi.data.DefinedSections.getAllSections;
		const activeSections = new Array<ISection>();

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const is = VueSpecificks.isCursorOverlaps(
				asi.context.cursor.currentPosition,
				section.htmlElement
			);
			if (is) activeSections.push(section);
		}

		if (activeSections.length === 0) {
			return;
		}

		const newSection = activeSections[0];
		const isSectionWasChanged = previousActiveSection === newSection;

		if (isSectionWasChanged && asi.context.isAllowedToChangeScenesBySideEffects) {
			asi.data.CAMERA_SCENES.tweenToScene(newSection.name);
		}
	}

	private byScroll() {
		const sections = asi.data.DefinedSections.getAllSections;

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const div = section.htmlElement;
			const isVisible = div && div.offsetWidth > 0 && div.offsetHeight > 0;
		}
	}
}
