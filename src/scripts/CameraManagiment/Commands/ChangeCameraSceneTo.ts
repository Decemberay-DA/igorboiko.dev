import asi from "@/scripts/asi/asi";
import { requestHandler, type INotification, type INotificationHandler } from "mediatr-ts";

export class ChangeCameraSceneToRequested implements INotification {
	public readonly newSceneName: string;
	public constructor(newSceneName: string) {
		this.newSceneName = newSceneName;
	}
}

@requestHandler(Request)
class ChangeCameraSceneToHandler implements INotificationHandler<ChangeCameraSceneToRequested> {
	handle(notification: ChangeCameraSceneToRequested): Promise<void> {
		asi.data.CAMERA_SCENES.tweenToScene(notification.newSceneName);
		return Promise.resolve();
	}
}
