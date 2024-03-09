import * as CT from "../CommonTypes/index";
import * as DU from "../DevUnilities/index";
import * as GE from "../GameEngine/index";
import * as MC from "../MegaCursor/index";

export class CursorBetrayal extends GE.DynamicObject {
    private element!: HTMLElement;

    public constructor() {
        super();
    }

    public override onStart(): void {
        const element = document.getElementById(
            "cursor_betreyal.f1d545ae-f58e-4746-998a-243effeb900c"
        );

        if (element != null) {
            this.element = element;
            DU.Logger.write(
                "cursor_betreyal.f1d545ae-f58e-4746-998a-243effeb900c was found"
            );
        } else {
            DU.Logger.write(
                "cursor_betreyal.f1d545ae-f58e-4746-998a-243effeb900c are not found",
                30
            );
        }
    }

    public override onFrameUpdate(): void {
        this.element.style.left = MC.MegaCursor.position.x + "px";
        this.element.style.top = MC.MegaCursor.position.y + "px";
    }
}
