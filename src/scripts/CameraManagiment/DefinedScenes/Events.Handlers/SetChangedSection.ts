import asi from "@/scripts/asi/asi";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import { option } from "fp-ts";
import SectionWasChangedToID from "../Events/SectionWasChangedTo";
import ScenesRegistryH from "../SceneRegistry/ScenesRegistryH";

export default class SetChangedSection implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		const anyScene = ScenesRegistryH.findTAnySceneByNameID(notification.newSectionNameID);

		if (option.isSome(anyScene)) {
			asi.data.ScenesRegistry.currentAnyScene = anyScene.value;
		}

		return Promise.resolve();
	}
}

asi.mediator.register(SectionWasChangedToID.name, new SetChangedSection());
