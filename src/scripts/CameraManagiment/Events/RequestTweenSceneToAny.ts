import type { INotification } from "mediatr-ts";
import type { TAnyScene } from "../DefinedScenes/IScene";
import WasRequestedTweenSceneToAny from "./WasRequestedTweenSceneToAny";

export default class RequestTweenSceneToAny extends WasRequestedTweenSceneToAny implements INotification {
	public readonly oldScene: TAnyScene;
	public readonly newScene: TAnyScene;

	constructor(oldScene: TAnyScene, newScene: TAnyScene) {
		super();

		this.oldScene = oldScene;
		this.newScene = newScene;
	}
}
