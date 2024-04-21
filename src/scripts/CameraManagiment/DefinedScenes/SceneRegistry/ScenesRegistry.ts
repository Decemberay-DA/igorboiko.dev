import ScenesRegistryH from "./ScenesRegistryH";
import type { IScene, ITHREEScene, IHTMLScene, TAnyScene } from "../IScene/IScene";
import SceneRegistryEX from "./SceneRegistryEX";

export default class ScenesRegistry {
	private _cahsedIScenes: IScene[] = [];
	public get cahsedIScenes(): IScene[] {
		return this._cahsedIScenes;
	}

	private _cahsedITHREEScene: ITHREEScene[] = [];
	public get cahsedITHREEScene(): ITHREEScene[] {
		return this._cahsedITHREEScene;
	}

	private _cahsedIHTMLScene: IHTMLScene[] = [];
	public get cahsedIHTMLScene(): IHTMLScene[] {
		return this._cahsedIHTMLScene;
	}

	private _currentScene!: TAnyScene;
	public get currentAnyScene(): Readonly<TAnyScene> {
		return this._currentScene ?? this.cahsedIScenes[0];
	}
	public set currentAnyScene(scene: TAnyScene) {
		this._currentScene = scene;
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
		updateCacheAsync().then(() => {
			SceneRegistryEX.debugState(this);
		});
	}
}
