import { GE } from "@/scripts/GameEngine";
import { notificationHandler, type INotification, type INotificationHandler } from "mediatr-ts";

export default class NThreeSceneLoaded implements INotification {}

// @notificationHandler(NThreeSceneLoaded)
// class EHDefault_on_NThreeSceneLoaded implements INotificationHandler<NThreeSceneLoaded> {
// 	public async handle(notification: NThreeSceneLoaded): Promise<void> {
// 		return Promise.resolve();
// 	}
// }
