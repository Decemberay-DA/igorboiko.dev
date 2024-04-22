import type { TAnyScene } from "../DefinedScenes/IScene/IScene";
import WasRequestedTweenSceneToAny from "./WasRequestedTweenSceneToAny";


export default class NRequestTweenSceneToAny extends WasRequestedTweenSceneToAny {
	public readonly oldScene: TAnyScene;
	public readonly newScene: TAnyScene;

	constructor(oldScene: TAnyScene, newScene: TAnyScene) {
		super();

		this.oldScene = oldScene;
		this.newScene = newScene;
	}
}

