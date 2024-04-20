import { requestHandler, type INotificationHandler } from "mediatr-ts";
import SectionWasChangedToID from "../DefinedScenes/Events/SectionWasChangedTo";
import ISceneEX from "../DefinedScenes/ISceneEX";
import ScenesRegistryH from "../DefinedScenes/ScenesRegistryH";
import { option } from "fp-ts";

@requestHandler(SectionWasChangedToID)
class SceneTweenExecutor implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		const anyScene = ScenesRegistryH.findTAnySceneByNameID(notification.newSectionNameID);

		if (option.isSome(anyScene)) {
			ISceneEX.tweenTo(anyScene.value);
		} else {
			console.error(notification.newSectionNameID + " is not found anySection id");
		}

		return Promise.resolve();
	}
}
