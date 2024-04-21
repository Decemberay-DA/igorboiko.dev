import { notificationHandler, type INotification, type INotificationHandler } from "mediatr-ts";

/**
 *
 */
export default class SectionWasChangedToID implements INotification {
	public readonly newSectionNameID: string;
	public constructor(newSectionNameID: string) {
		this.newSectionNameID = newSectionNameID;
	}
}

// @notificationHandler(SectionWasChangedToID)
// class EHDefault_on_SectionWasChangedToID implements INotificationHandler<SectionWasChangedToID> {
// 	public async handle(notification: SectionWasChangedToID): Promise<void> {
// 		return Promise.resolve();
// 	}
// }
