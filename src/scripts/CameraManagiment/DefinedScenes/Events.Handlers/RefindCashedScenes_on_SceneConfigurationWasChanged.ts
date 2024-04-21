import asi from "@/scripts/asi/asi";
import { requestHandler, type INotificationHandler } from "mediatr-ts";
import NSceneConfigurationChanged from "../Events/SceneConfigurationWasChanged";
import SceneRegistryEX from "../SceneRegistry/SceneRegistryEX";

@requestHandler(NSceneConfigurationChanged)
export default class RefindCashedScenes_on_SceneConfigurationWasChanged
	implements INotificationHandler<NSceneConfigurationChanged>
{
	async handle(notification: NSceneConfigurationChanged): Promise<void> {
		console.log("before");
		SceneRegistryEX.debugState(asi.data.ScenesRegistry);

		asi.data.ScenesRegistry.updateCache();

		console.log("after");
		SceneRegistryEX.debugState(asi.data.ScenesRegistry);

		return Promise.resolve();
	}
}
