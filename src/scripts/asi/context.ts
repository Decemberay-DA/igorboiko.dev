import { asi } from "./asi";
// import { type INotification } from "mediatr-ts";
import asiSpecificks from "./asiSpesificks";

export default class context {
	// html ========-====-====-====-============
	public get section() {
		return asi.data.DefinedSections.curentSection;
	}

	// three ========-====-====-====-============
	public get currentCameraScene() {
		return asi.data.CAMERA_SCENES.currentScene;
	}

	// app ========-====-====-====-============
	public appContext = asiSpecificks.Contextes.INTRO_CUTSCENE;
	public pageType = asiSpecificks.PageTypes.MAIN_PAGE;
}

// export class IntroCutsceneStarted implements INotification {}
// export class IntroCutsceneEnded implements INotification {}

// export class SubPageExpanded implements INotification {}
// export class SubPageCollapsed implements INotification {}
