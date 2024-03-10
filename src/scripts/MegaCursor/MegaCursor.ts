import * as CT from "../CommonTypes/index";
import * as DU from "../DevUnilities/index";
import * as GE from "../GameEngine/index";

export class MegaCursor extends GE.ADynamicObject {
    // position by default. // TODO create cursor stranding for phones and
    private static _position: CT.Vector2d = { x: 0, y: 0 };

    public constructor() {
        super();
    }

    public override onStart(): void {
        document.addEventListener("mousemove", (e: MouseEvent): void => {
            this.updatePosition({ x: e.pageX, y: e.pageY });
        });
    }

    private updatePosition(newPosition: CT.Vector2d): void {
        MegaCursor._position = newPosition;
        DU.Logger.write(
            "MegaCursor position was updated to ${MegaCursor._position}"
        );
        const sadas = document.onmousemove;
    }

    public static get position(): CT.Vector2d {
        return this._position;
    }

    public static getDistance(point: CT.Vector2d): number {
        const dx = point.x - MegaCursor._position.x;
        const dy = point.y - MegaCursor._position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
