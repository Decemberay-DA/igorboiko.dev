import { type INotification } from "mediatr-ts";

/**
 *
 */
export default class SectionWasChangedToID implements INotification {
	public readonly newSectionNameID: string;
	public constructor(newSectionNameID: string) {
		this.newSectionNameID = newSectionNameID;
	}
}
