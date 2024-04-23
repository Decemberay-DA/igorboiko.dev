import asi from "@/scripts/asi/asi";
import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import { option } from "fp-ts";
import SectionWasChangedToID from "../Events/SectionWasChangedTo";
import ScenesRegistryH from "../SceneRegistry/ScenesRegistryH";

export default class EHTestSectionChangeDebug implements INotificationHandler<SectionWasChangedToID> {
	async handle(notification: SectionWasChangedToID): Promise<void> {
		console.warn("EHTestSectionChangeDebug handled transfer to scene : " + notification.newSectionNameID);
		return Promise.resolve();
	}
}

