import type { TJ } from ".";

type uninitialized = null;

/**
 * Handles connection beetween scene created in SceneConfigurator and vue component mounted to dom
 */
class ThreeSceneDOMBridge {
	public readonly NAME: string;
	public readonly GUID: string;
	public constructor(NAME: string, GUID: string) {
		this.NAME = NAME;
		this.GUID = GUID;
	}

	private _threeScene: TJ.ThreeScene | uninitialized = null;
	public GetSchene(): TJ.ThreeScene {
		if (this._threeScene) {
			return this._threeScene;
		} else {
			throw new Error("threeScene is not set.");
		}
	}
	private _threeSceneSet: boolean = false;
	public InitSetThreeScene(schene: TJ.ThreeScene) {
		if (this._threeSceneSet) console.warn("threeScene already initted");

		this._threeScene = schene;
		this._threeSceneSet = true;
		if (this._sceneMountLocation) this._threeScene.mountTo(this._sceneMountLocation);
	}

	private _sceneMountLocation: HTMLElement | uninitialized = null;
	public GetMountLocation(): HTMLElement {
		if (this._sceneMountLocation) return this._sceneMountLocation;
		else throw new Error("sceneMountLocation is not set.");
	}
	private _sceneMountLocationSet: boolean = false;
	public InitSetSceneMountLocation(element: HTMLElement) {
		if (!this._sceneMountLocationSet) console.warn("sceneMountLocation already initted");

		this._sceneMountLocation = element;
		this._sceneMountLocationSet = true;
		if (this._threeScene) this._threeScene.mountTo(this._sceneMountLocation);
		else console.warn("threeScene not initted to be mounted to " + element.id);
	}
}

/**
 * Data about existing bridges beetween three scenes and DOM
 */
export class ThreeScenesManager {
	/**
	 * What if will make this class not scalable by design, like not using a Map<sceneNameID, ThreeSceneDOMBridge>,
	 * where sceneNameID is string that stored in enum
	 * but just list all of them here
	 */
	private constructor() {}

	public static get allScenes(): ThreeSceneDOMBridge[] {
		return [ThreeScenesManager.MAIN_SCENE, ThreeScenesManager.BACKGROUND_SCENE];
	}

	public static readonly MAIN_SCENE = new ThreeSceneDOMBridge(
		"MAIN_SCENE",
		"e3d65d41-dcef-4e32-9299-STATIC00GUID"
	);
	public static readonly BACKGROUND_SCENE = new ThreeSceneDOMBridge(
		"BACKGROUND_SCENE",
		"387237c6-89b7-4e48-be61-STATIC00GUID"
	);
}

// public static readonly MAIN_SCENE = new ManagimentedThreeSceneBridge(
//     "MAIN_SCENE",
//     "e3d65d41-dcef-4e32-9299-STATIC00GUID"
// );
// public static readonly BACKGROUND_SCENE = new ManagimentedThreeSceneBridge(
//     "BACKGROUND_SCENE",
//     "387237c6-89b7-4e48-be61-STATIC00GUID"
// );
