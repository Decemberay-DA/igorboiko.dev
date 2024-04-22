import asi from "@/scripts/asi/asi";
import { option } from "fp-ts";
import SectionWasChangedToID from "../DefinedScenes/Events/SectionWasChangedTo";
import ISceneEX from "../DefinedScenes/IScene/ISceneEX";
import ScenesRegistryH from "../DefinedScenes/SceneRegistry/ScenesRegistryH";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";

export default class EHSceneTweenExecutor implements INotificationHandler<SectionWasChangedToID> {
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
asi.mediator.register(SectionWasChangedToID.name, new EHSceneTweenExecutor());
