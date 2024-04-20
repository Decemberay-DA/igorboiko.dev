import { asi } from "@/scripts/asi/asi";
import { requestHandler, type INotificationHandler } from "mediatr-ts";
import SectionWasChangedToID from "../Events/SectionWasChangedTo";
import ISceneEX from "../ISceneEX";
import ScenesRegistryH from "../ScenesRegistryH";
import { option } from "fp-ts";

@requestHandler(SectionWasChangedToID)
class SetChangedSection implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		const anyScene = ScenesRegistryH.findTAnySceneByNameID(notification.newSectionNameID);

		if (option.isSome(anyScene)) {
			asi.data.ScenesRegistry.currentScene = anyScene.value;
		}

		const newSection = asi.data.DefinedSections.getAllSections.find(
			(sec) => sec.name === notification.newSectionNameID
		)!;
		asi.data.DefinedSections.curentSection = newSection;
		return Promise.resolve();
	}
}
