import RefindCashedScenes_on_SceneConfigurationWasChanged from "@/scripts/CameraManagiment/DefinedScenes/Events.Handlers/RefindCashedScenes_on_SceneConfigurationWasChanged";
import SetChangedSection from "@/scripts/CameraManagiment/DefinedScenes/Events.Handlers/SetChangedSection";
import EHTestSectionChangeDebug from "@/scripts/CameraManagiment/DefinedScenes/Events.Handlers/TestSectionChangeDebug";
import NSceneConfigurationChanged from "@/scripts/CameraManagiment/DefinedScenes/Events/SceneConfigurationWasChanged";
import SectionWasChangedToID from "@/scripts/CameraManagiment/DefinedScenes/Events/SectionWasChangedTo";
import EHSceneTweenExecutor from "@/scripts/CameraManagiment/Events.Handlers/SceneTweenExecutor";
import EHCurtainsOpener_on_NThreeSceneLoaded from "@/scripts/ThreeJS/LoadCurtains/Events.Handlers/EHCurtainsOpener_on_NThreeSceneLoaded";
import EHStuff_on_NCurtainsOpened from "@/scripts/ThreeJS/LoadCurtains/Events.Handlers/EHStuff_on_NCurtainsOpened";
import NCurtainsOpened from "@/scripts/ThreeJS/LoadCurtains/Events/NCurtainsOpened";
import NThreeSceneLoaded from "@/scripts/ThreeJS/LoadCurtains/Events/NThreeSceneLoaded";
import type { Mediator } from "./OneFileMediator";
import EHOnAnyInterractionGeneral from "@/scripts/MegaCursor/MouseClicking/Events.Handlers/EHOnAnyInterractionGeneral";
import ETAnyInterractionOccured from "@/scripts/MegaCursor/MouseClicking/Events/ETAnyInterractionOccured";
import EHTailwindStyleFlick from "@/scripts/MegaCursor/MouseClicking/Events.Handlers/EHTailwindStyleFlick";
import EHTweenCubes from "@/scripts/MegaCursor/MouseClicking/Events.Handlers/EHTweenCubes";

/**
 *
 */
export default class OneFileMediatorNotificationHandlersRegistrationH {
	/**
	 * i am LITERALLY FORCED TO INIT THEM ALL HERE CZ OTHER WHIZE THIERS FILES WILL BE NEVER READ
	 * force to register handlers from other files
	 */
	public static registerHandlers(mediator: Mediator): Mediator {
		mediator.register(
			NSceneConfigurationChanged.name,
			new RefindCashedScenes_on_SceneConfigurationWasChanged()
		);
		mediator.register(SectionWasChangedToID.name, new SetChangedSection());
		mediator.register(SectionWasChangedToID.name, new EHTestSectionChangeDebug());
		mediator.register(SectionWasChangedToID.name, new EHSceneTweenExecutor());
		mediator.register(NThreeSceneLoaded.name, new EHCurtainsOpener_on_NThreeSceneLoaded());
		mediator.register(NCurtainsOpened.name, new EHStuff_on_NCurtainsOpened());
		mediator.register(ETAnyInterractionOccured.name, new EHOnAnyInterractionGeneral());
		mediator.register(ETAnyInterractionOccured.name, new EHTailwindStyleFlick());
		mediator.register(ETAnyInterractionOccured.name, new EHTweenCubes());

		return mediator;
	}
}
