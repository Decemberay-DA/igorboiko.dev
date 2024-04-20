import ScenesRegistryH from "./ScenesRegistryH";
import type { IScene, ITHREEScene, IHTMLScene, TAnyScene } from "./IScene";

export class ScenesRegistry {
	public readonly cahsedIScenes: IScene[] = [];
	public readonly cahsedITHREEScene: ITHREEScene[] = [];
	public readonly cahsedIHTMLScene: IHTMLScene[] = [];

	private _currentScene!: TAnyScene;

	public get currentScene(): Readonly<TAnyScene> {
		return this._currentScene ?? this.getScenes[0];
	}
	public set currentScene(scene: TAnyScene) {
		this._currentScene = scene;
	}

	public get getScenes(): Readonly<IScene>[] {
		if (this.cahsedIScenes.length === 0) {
			this.updateCache();
		}
		return this.cahsedIScenes;
	}
	public updateCache() {
		const updateCacheAsync = async () => {
			this.cahsedIHTMLScene.length = 0;
			this.cahsedIHTMLScene.push(...(await ScenesRegistryH.findHTMLScenes()));
			this.cahsedITHREEScene.length = 0;
			this.cahsedITHREEScene.push(...(await ScenesRegistryH.findTHREEScenes()));
			this.cahsedIScenes.length = 0;
			this.cahsedIScenes.push(
				...(await ScenesRegistryH.findCommonIScenes(this.cahsedIHTMLScene, this.cahsedITHREEScene))
			);
		};
		updateCacheAsync().then();
	}
}
