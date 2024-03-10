import * as GE from "./index";
import * as DU from "../DevUnilities/index";
import * as MC from "../MegaCursor/index";

/**
 * Static definition of update orders.
 * Legit for every type of update: onStart, onFrame, etc cz array is sorted
 */
export class UpdatePriorities {
    // any shared base
    public static readonly gameTime = -10000;
    public static readonly earlyFrameUpdate = -9500;
    // any logick
    public static readonly usualDynamicObject = -9000;
    // any visuals
    public static readonly threeScene = -2000;
    public static readonly gui = -100;
    // post scene updators
    public static readonly lateFrameUpdate = 10000;
}

/**
 * game idk
 */
export class Game implements IEnablable {
    // IEnablable ========-====-====-====-============
    protected _isEnabled: boolean = false;
    public get isEnabled(): boolean {
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
    private _dynamicObjects: Array<GE.ADynamicObject> = [];
    public get dynamicObjects(): Readonly<Array<GE.ADynamicObject>> {
        return Object.freeze([...this._dynamicObjects]);
    }
    public registerDinamicObject(dynamicObject: GE.ADynamicObject): void {
        this._dynamicObjects.push(dynamicObject);
        this._dynamicObjects.sort(
            (a, b) => a.onFrameUpdatePriority - b.onFrameUpdatePriority
        );
        DU.Logger.write(`DynamicObject registered`);
    }
    public unRegisterDinamicObject(dynamicObject: GE.ADynamicObject): void {
        const index = this._dynamicObjects.indexOf(dynamicObject);
        if (index > -1) {
            // if found
            this._dynamicObjects.splice(index, 1);
            DU.Logger.write(`DynamicObject un registered`);
        }
    }

    // Game loop ========-====-====-====-============
    public triggerStart(): void {
        this.enable();
        this.start();
    }
    private start(): void {
        this._dynamicObjects.forEach((dynamicObject) => {
            dynamicObject.onStart();
        });
        this.update();
    }
    private update(): void {
        if (!this._isEnabled) requestAnimationFrame(() => this.update());

        this._dynamicObjects.forEach((dynamicObject) => {
            if (dynamicObject.isEnabled) {
                dynamicObject.onFrameUpdate();
            }
        });

        DU.Logger.write(
            `Game updated "${GE.GameTime.currentFrame}", current time "${GE.GameTime.realTimeSinceStartup}", delta time "${GE.GameTime.deltaTime}"`
        );

        requestAnimationFrame(() => this.update()); // Continue the loop
    }
}
