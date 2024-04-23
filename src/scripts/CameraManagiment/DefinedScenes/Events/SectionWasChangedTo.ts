import type { INotification } from "@/scripts/asi/OneFileMediator/OneFileMediator";

/**
 *
 */
export default class SectionWasChangedToID implements INotification {
	public readonly newSectionNameID: string;

	public constructor(newSectionNameID: string) {
		this.newSectionNameID = newSectionNameID;
	}
}
