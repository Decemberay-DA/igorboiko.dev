import { notificationHandler, type INotification, type INotificationHandler } from "mediatr-ts";

/**
 * updating of all scenes happening when they are changing somehow
 */
export default class NSceneConfigurationChanged implements INotification {}

// @notificationHandler(NSceneConfigurationChanged)
// class EHDefault_on_NSceneConfigurationChanged implements INotificationHandler<NSceneConfigurationChanged> {
// 	public async handle(notification: NSceneConfigurationChanged): Promise<void> {
// 		return Promise.resolve();
// 	}
// }

/**
 * omg i like have to have at least one INotificationHandler for every INotification
 */
// @notificationHandler(NSceneConfigurationChanged)
// export default class NSceneConfigurationChanged
// 	implements INotification, INotificationHandler<NSceneConfigurationChanged>
// {
// 	public async handle(notification: NSceneConfigurationChanged): Promise<void> {
// 		console.log("NSceneConfigurationChanged created");
// 		return Promise.resolve();
// 	}
// }
