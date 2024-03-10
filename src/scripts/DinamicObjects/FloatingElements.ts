import * as DU from "../DevUnilities/index";
import * as CT from "../CommonTypes/index";
import * as MG from "../MegaCursor/index";
// import * as GE from "../GameEngine/index";
import { GE } from "../GameEngine/index";

export class FloatingElements extends GE.DynamicObject {
    private elementPositions: Map<HTMLElement, CT.Vector2d> = new Map();
    private motionSpeed = 5;
    private motionAmplitude = 6;
    private megaCursorInfluenceDistance = 1;

    constructor() {
        super();
    }

    private updateManagedElements(styleID: string): void {
        const elements = document.getElementsByClassName(styleID);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            // Save the original position when first encountered
            if (!this.elementPositions.has(element)) {
                const rect = element.getBoundingClientRect();
                this.elementPositions.set(element, {
                    x: rect.left,
                    y: rect.top,
                });
            }
        }
        // console.log(
        //     `FloatingElements registered "${this.elementPositions.size}" elements`
        // );
    }

    public override onFrameUpdate(): void {
        this.elementPositions.forEach((originalPosition, element) => {
            this.updateElementPosition(element, originalPosition);
        });
    }

    private updateElementPosition(
        element: HTMLElement,
        originalPosition: CT.Vector2d
    ): void {
        const time = GE.GameTime.realTimeSinceStartup;
        const megaCursorInfluence =
            MG.MegaCursor.getDistance(originalPosition) *
                this.megaCursorInfluenceDistance >
            500
                ? 1
                : 0;

        const offsetX =
            Math.sin(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        const offsetY =
            Math.cos(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        DU.Logger.write(
            `element "${element.id}" - position before: top=${element.style.top}, left=${element.style.left}`
        );

        element.style.position = "relative"; // absolute
        element.style.left = `${originalPosition.x + offsetX}px`;
        element.style.top = `${originalPosition.y + offsetY}px`;

        DU.Logger.write(
            `element "${element.id}" - position after: top=${element.style.top}, left=${element.style.left} and megaCursorInfluence = ${megaCursorInfluence}`
        );
    }
}
