import * as GE from "./index";

export abstract class DynamicObject implements IEnablable {
    protected _isEnabled: boolean = true; // is this object should be updated
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

    protected constructor() {
        GE.Game.getInstance().registerDinamicObject(this);
    }

    public onStart(): void {
        return;
    }
    // define the order in which dynamick objects are sorted and updated
    protected __onFrameUpdatePriority: number =
        GE.OnFrameUpdatePriorities.usualDynamicObject;
    public get onFrameUpdatePriority(): number {
        return this.__onFrameUpdatePriority;
    }
    public onFrameUpdate(): void {
        return;
    }
    public onDelete(): void {
        return;
    }

    public delete(): void {
        GE.Game.getInstance().unRegisterDinamicObject(this); // Unregister this object from the Game instance
        this.onDelete();
    }
}
