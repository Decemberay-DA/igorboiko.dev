import AEnumClass from "../utils/AEnumClass";
import asi from "./asi";
import { requestHandler, type INotification, type INotificationHandler } from "mediatr-ts";
import ACursorStranding, { CursorTraverserBuilder } from "../MegaCursor/CursorTraversing/ACursorStranding";
import asiSpecificks from "./asiSpesificks";
import type { DOMContentFinallyWasLoadedOMG } from "../VueTSHelper/VueSpecificks";
import CursorFollower from "../MegaCursor/CursorFollower/CursorFollower";

export default class context {
	// html ========-====-====-====-============
	public get section() {
		return asi.data.DefinedSections.curentSection;
	}

	// three ========-====-====-====-============
	public get currentCameraScene() {
		return asi.data.CAMERA_SCENES.currentScene;
	}

	private _cursor!: ACursorStranding;
	public get Cursor() {
		return this._cursor;
	}
	public set _setCursor(value: ACursorStranding) {
		this._cursor = value;
	}
	public readonly CursorFollower = new CursorFollower();

	// app ========-====-====-====-============
	private _appContext = asiSpecificks.Contextes.INTRO_CUTSCENE;
	public get appContext() {
		return this._appContext;
	}
	private _pageType = asiSpecificks.PageTypes.MAIN_PAGE;
	public get pageType(): string {
		return this._pageType;
	}
}

export class EPageTypes extends AEnumClass {
	public readonly MAIN_PAGE = "MAIN_PAGE";
	public readonly ERROR_404_PAGE = "ERROR_404_PAGE";
}

export class EasiContextes extends AEnumClass {
	public readonly USUAL_IDK = "USUAL_IDK";
	public readonly INTRO_CUTSCENE = "INTRO_CUTSCENE";
	public readonly EXPANDED_SUBPAGE_VIEW = "EXPANDED_SUBPAGE_VIEW";
}

export class IntroCutsceneStarted implements INotification {}
export class IntroCutsceneEnded implements INotification {}

export class SubPageExpanded implements INotification {}
export class SubPageCollapsed implements INotification {}

@requestHandler(Request)
class E312 implements INotificationHandler<DOMContentFinallyWasLoadedOMG> {
	handle(notification: DOMContentFinallyWasLoadedOMG): Promise<void> {
		asi.context._setCursor = CursorTraverserBuilder.getPlatformDependend();
		return Promise.resolve();
	}
}
