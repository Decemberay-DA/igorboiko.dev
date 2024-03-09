import * as GE from "./index";
import * as DU from "../DevUnilities/index";
import * as MC from "../MegaCursor/index";

export class Game implements IEnablable {
    // IEnablable ========-====-====-====-============
    protected _isEnabled: boolean = false;
    public get isEenabled(): boolean {
        return this._isEnabled;
    }
    public enable(): void {
        this._isEnabled = true;
        console.log("Component enabled.");
    }
    public disable(): void {
        this._isEnabled = false;
        console.log("Component disabled.");
    }

    // Singletonin ========-====-====-====-============
    private static instance: Game;
    private constructor() {}
    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    // DynamicObject registration ========-====-====-====-============
    private dynamicObjects: Set<GE.DynamicObject> = new Set();
    public registerDinamicObject(dynamicObject: GE.DynamicObject): void {
        this.dynamicObjects.add(dynamicObject);
        DU.Logger.write(`DynamicObject registered`);
    }
    public unRegisterDinamicObject(dynamicObject: GE.DynamicObject): void {
        this.dynamicObjects.delete(dynamicObject);
        DU.Logger.write(`DynamicObject un registered`);
    }

    // Game loop ========-====-====-====-============
    public triggerStart(): void {
        this.enable();
        this.start();
    }
    private start(): void {
        GE.GameTime.updateTime();
        this.dynamicObjects.forEach((dynamicObject) => {
            dynamicObject.onStart();
        });
        this.update();
    }
    private update(): void {
        GE.GameTime.updateTime();

        if (!this._isEnabled) return;

        this.dynamicObjects.forEach((dynamicObject) => {
            if (dynamicObject.isEenabled) {
                dynamicObject.onFrameUpdate();
            }
        });

        DU.Logger.write(
            `Game updated "${GE.GameTime.currentFrame}", current time "${GE.GameTime.realTimeSinceStartup}", delta time "${GE.GameTime.deltaTime}"`
        );

        requestAnimationFrame(() => this.update()); // Continue the loop
    }
}
