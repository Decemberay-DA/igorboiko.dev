import { GE } from "../GameEngine/index";

/**
 * Execute action untill success
 */
export class Seeker extends GE.DynamicObject {
    private readonly _stopCondition: () => boolean;
    private readonly _executeAction: () => void;

    constructor(stopCondition: () => boolean, executeAction: () => void) {
        super();
        this._stopCondition = stopCondition;
        this._executeAction = executeAction;
    }

    public override onFrameUpdate(): void {
        if (this._stopCondition()) {
            this._executeAction();
            this.delete();
        }
    }
}

