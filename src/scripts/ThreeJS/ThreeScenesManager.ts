import type { TJ } from ".";

type notInited = null;

class ManagimentedThreeSceneBridge {
    public readonly name: string;
    public readonly GUID: string;
    public constructor(name: string, GUID: string) {
        this.name = name;
        this.GUID = GUID;
    }

    private _threeScene: TJ.ThreeScene | notInited = null;
    public GetSchene(): TJ.ThreeScene {
        if (this._threeScene) {
            return this._threeScene;
        } else {
            throw new Error("threeScene is not set.");
        }
    }
    private _threeSceneSet: boolean = false;
    public InitSetThreeScene(schene: TJ.ThreeScene) {
        if (!this._threeSceneSet) {
            this._threeScene = schene;
            this._threeSceneSet = true;
        } else {
            console.warn("threeScene already initted");
        }
    }

    private _sceneMountLocation: HTMLElement | notInited = null;
    public GetMountLocation(): HTMLElement {
        if (this._sceneMountLocation) {
            return this._sceneMountLocation;
        } else {
            throw new Error("sceneMountLocation is not set.");
        }
    }
    private _sceneMountLocationSet: boolean = false;
    public InitSetSceneMountLocation(element: HTMLElement) {
        if (!this._sceneMountLocationSet) {
            this._sceneMountLocation = element;
            this._sceneMountLocationSet = true;
        } else {
            console.warn("sceneMountLocation already initted");
        }
    }
}

export class ThreeScenesManager {
    private constructor() {}

    public static readonly MAIN_SCHENE = new ManagimentedThreeSceneBridge(
        "MAIN",
        "e3d65d41-dcef-4e32-9299-01a07e605cfc"
    );
    public static readonly BACKGROUND_SCHENE = new ManagimentedThreeSceneBridge(
        "BACKGROUND",
        "387237c6-89b7-4e48-be61-8437468eaf56"
    );
}
