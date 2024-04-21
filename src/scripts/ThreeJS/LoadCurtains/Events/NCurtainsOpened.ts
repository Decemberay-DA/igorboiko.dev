import { notificationHandler, type INotification, type INotificationHandler } from "mediatr-ts";

export default class NCurtainsOpened implements INotification {}

// @notificationHandler(NCurtainsOpened)
// class EHDefault_on_NCurtainsOpened implements INotificationHandler<NCurtainsOpened> {
// 	public async handle(notification: NCurtainsOpened): Promise<void> {
// 		return Promise.resolve();
// 	}
// }
