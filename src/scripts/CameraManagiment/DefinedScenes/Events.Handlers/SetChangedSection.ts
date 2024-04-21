import { asi } from "@/scripts/asi/asi";
import { requestHandler, type INotificationHandler } from "mediatr-ts";
import SectionWasChangedToID from "../Events/SectionWasChangedTo";
import ScenesRegistryH from "../ScenesRegistryH";
import { option } from "fp-ts";

@requestHandler(SectionWasChangedToID)
class SetChangedSection implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		const anyScene = ScenesRegistryH.findTAnySceneByNameID(notification.newSectionNameID);

		if (option.isSome(anyScene)) {
			asi.data.ScenesRegistry.currentScene = anyScene.value;
		}

		return Promise.resolve();
	}
}
