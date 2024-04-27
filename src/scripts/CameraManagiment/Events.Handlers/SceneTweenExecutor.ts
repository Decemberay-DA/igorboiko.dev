import asi from "@/scripts/asi/asi";
import { option } from "fp-ts";
import SectionWasChangedToID from "../DefinedScenes/Events/SectionWasChangedTo";
import ISceneH from "../DefinedScenes/IScene/ISceneH";
import ScenesRegistryH from "../DefinedScenes/SceneRegistry/ScenesRegistryH";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";

export default class EHSceneTweenExecutor implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		const anyScene = await ScenesRegistryH.findTAnySceneByNameID(notification.newSectionNameID);

		if (option.isSome(anyScene)) {
			ISceneH.tweenTo(anyScene.value);
		} else {
			console.error(notification.newSectionNameID + " is not found anySection id");
		}

		return Promise.resolve();
	}
}
