import { asi } from "./asi";
import asiSpecificks from "./asiSpesificks";
import { PageScrollListener } from "../DinamicObjects/PageScrollListener";

export default class context {
	// html ========-====-====-====-============
	public get section() {
		return asi.data.DefinedSections.curentSection;
	}

	// three ========-====-====-====-============
	public get cameraScene() {
		return asi.data.CAMERA_SCENES.currentScene;
	}
	// scroll
	public scroll = new PageScrollListener();
	public get cursor() {
		return asi.data.Cursor;
	}

	// app ========-====-====-====-============
	/**
	 * SideEffects:
	 * - user scroll
	 *
	 * not SideEffects:
	 * - button pressed in navbar
	 */
	public get isAllowedToChangeScenesBySideEffects() {
		return (
			asi.context.appContext !== asiSpecificks.Contextes.EXPANDED_SUBPAGE_VIEW &&
			asi.context.appContext !== asiSpecificks.Contextes.INTRO_CUTSCENE
		);
	}
	public appContext = asiSpecificks.Contextes.INTRO_CUTSCENE;
	public pageType = asiSpecificks.PageTypes.MAIN_PAGE;
}
