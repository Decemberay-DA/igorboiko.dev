import { pipe } from "fp-ts/lib/function";
import asi from "../asi/asi";
import { GE } from "../GameEngine";
import HTMLElementEX from "./HTMLElementEX";
import { array } from "fp-ts";
import SectionWasChangedToID from "../CameraManagiment/DefinedScenes/Events/SectionWasChangedTo";
import { game } from "../asi/game";
import { IDB } from "../GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IDinamicUpdateB } from "../GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { IDinamicUpdatesH } from "../GameEngineFunctional/ADTs/IDinamicUpdates/IDinamicUpdatesH";
import { TAnyInterractionListenerB } from "../MegaCursor/MouseClicking/TAnyInterractionListenerB";
import { IURIB } from "../GameEngineFunctional/ADTs/_IURI/IURIB";
import type { IURI } from "../GameEngineFunctional/ADTs/_IURI/IURI";
import type { ID } from "../GameEngineFunctional/ADTs/ID.ts/ID";
import type { IDinamicObject } from "../GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import type { IDinamicUpdate } from "../GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import type { IParented } from "../GameEngineFunctional/ADTs/IParented/IParented";
import type { ITopLevelGame } from "../GameEngineFunctional/Types/ITopLevelGameB";

export class CurrentSceneFromDOMDetectorH {
	static byHorizontallCursorOverlap(): void {
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

export class CurrentSceneFromDOMDetectorB {
	/**
	 * detects current section when mouse move
	 * and call transition to it
	 */
	static new = (): ID<IURI & IDinamicObject & IParented<ITopLevelGame>> => {
		return pipe(
			{
				onStart(time) {
					document.addEventListener(
						"mousemove",
						CurrentSceneFromDOMDetectorH.byHorizontallCursorOverlap
					);
					document.addEventListener(
						"scroll",
						CurrentSceneFromDOMDetectorH.byHorizontallCursorOverlap
					);
				},
				onDelete(time) {
					document.removeEventListener(
						"mousemove",
						CurrentSceneFromDOMDetectorH.byHorizontallCursorOverlap
					);
					document.removeEventListener(
						"scroll",
						CurrentSceneFromDOMDetectorH.byHorizontallCursorOverlap
					);
				},
			},
			IDinamicUpdateB.new,
			IDinamicObjectB.new,
			IDinamicUpdatesH.newInsertedAndParentedToasiRootGame,
			IURIB.newImprinted("Listener"),
			IDB.new
		);
	};
}
