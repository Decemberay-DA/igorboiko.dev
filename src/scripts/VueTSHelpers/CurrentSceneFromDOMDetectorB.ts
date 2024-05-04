import { pipe } from "fp-ts/lib/function";
import asi from "../asi/asi";
import HTMLElementEX from "./HTMLElementEX";
import { array } from "fp-ts";
import SectionWasChangedToID from "../CameraManagiment/DefinedScenes/Events/SectionWasChangedTo";
import { IDB } from "../GameEngineFunctional/ADTs/ID.ts/builders";
import { IDinamicObjectB } from "../GameEngineFunctional/ADTs/IDinamicObject/builders";
import { IDinamicUpdateB } from "../GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { IDinamicUpdatesH } from "../GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import { IURIB } from "../GameEngineFunctional/ADTs/_IURI/IURIB";
import type { IURI } from "../GameEngineFunctional/ADTs/_IURI/types";
import type { ID } from "../GameEngineFunctional/ADTs/ID.ts/types";
import type { IDinamicObject } from "../GameEngineFunctional/ADTs/IDinamicObject/typesBase";
import type { IParented } from "../GameEngineFunctional/ADTs/IParented/IParented";
import type { ITopLevelGame } from "../GameEngineFunctional/Types/ITopLevelGameB";
import { IListenerB } from "../GameEngineFunctional/Types/IListenerH";

/**
 *
 */
export class CurrentSceneFromDOMDetectorH {
	static byHorizontallCursorOverlap = (): void => {
		const previousActiveScene = asi.data.ScenesRegistry.currentAnyScene;
		const scenes = asi.data.ScenesRegistry.cahsedIHTMLScene;

		const checkParams = {
			vertical: false,
			horizontal: true,
		};

		const overlapedSections = pipe(
			scenes,
			array.filter((sc) =>
				HTMLElementEX.isCursorOverlaps(
					asi.data.cursor.self.clientRelative.position(),
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
	};
}

export class CurrentSceneFromDOMDetectorB {
	/**
	 * detects current section when mouse move
	 * and call transition to it
	 */
	static new = (): ID<IURI & IDinamicObject & IParented<ITopLevelGame>> => {
		return pipe(
			["mousemove", "scroll"],
			IListenerB.newSubscribeUnsobscribeActions_toMulti_any(
				CurrentSceneFromDOMDetectorH.byHorizontallCursorOverlap
			),
			IDinamicUpdateB.new,
			IDinamicObjectB.new,
			IDinamicUpdatesH.newInsertedAndParentedToasiRootGame,
			IURIB.newImprinted("Listener"),
			IDB.new
		);
	};
}
