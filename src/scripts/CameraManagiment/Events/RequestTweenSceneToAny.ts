import { notificationHandler, type INotification, type INotificationHandler } from "mediatr-ts";
import type { TAnyScene } from "../DefinedScenes/IScene/IScene";
import WasRequestedTweenSceneToAny from "./WasRequestedTweenSceneToAny";

export default class NRequestTweenSceneToAny extends WasRequestedTweenSceneToAny implements INotification {
	public readonly oldScene: TAnyScene;
	public readonly newScene: TAnyScene;

	constructor(oldScene: TAnyScene, newScene: TAnyScene) {
		super();

		this.oldScene = oldScene;
		this.newScene = newScene;
	}
}

// @notificationHandler(NRequestTweenSceneToAny)
// class EHDefault_on_NRequestTweenSceneToAny implements INotificationHandler<NRequestTweenSceneToAny> {
// 	public async handle(notification: NRequestTweenSceneToAny): Promise<void> {
// 		return Promise.resolve();
// 	}
// }
