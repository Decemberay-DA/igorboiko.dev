import * as DU from "../DevUnilities/index";
import * as CT from "../CommonTypes/index";
import * as MG from "../MegaCursor/index";
// import * as GE from "../GameEngine/index";
import { GE } from "../GameEngine/index";

export class FloatingElementsBundle extends GE.ADynamicObject {
    private elementPositions: Map<HTMLElement, CT.Vector2d> = new Map();
    private motionSpeed = 5;
    private motionAmplitude = 6;
    private megaCursorInfluenceDistance = 1;
    private xPositionTimeInfluence = 1;

    public constructor() {
        super();
    }

    public registerManagedElements(styleID: string): void {
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
        console.log(
            `FloatingElements registered "${this.elementPositions.size}" elements`
        );
    }

    public override onFrameUpdate(): void {
        this.elementPositions.forEach((originalPosition, element) => {
            this.updateElementPosition(element, originalPosition);
        });
    }

    public updateElementPosition(
        element: HTMLElement,
        originalPosition: CT.Vector2d
    ): void {
        // offseted by horizontal axis
        const time =
            GE.GameTime.realTimeSinceStartup +
            originalPosition.x * this.xPositionTimeInfluence;

        // const megaCursorInfluence =
        //     MG.MegaCursor.getDistance(originalPosition) *
        //         this.megaCursorInfluenceDistance >
        //     500
        //         ? 1
        //         : 0;
        let megaCursorInfluence =
            MG.MegaCursor.getDistance(originalPosition) *
            this.megaCursorInfluenceDistance;
        megaCursorInfluence = Math.max(0, Math.min(1, megaCursorInfluence));

        const offsetX =
            Math.sin(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        const offsetY =
            Math.cos(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        // DU.Logger.write(
        //     `element "${element.id}" - position before: top=${element.style.top}, left=${element.style.left}`
        // );

        element.style.position = "relative"; // absolute
        element.style.left = `${originalPosition.x + offsetX}px`;
        element.style.top = `${originalPosition.y + offsetY}px`;
    }
}

/**
 * Manages one object only
 */
export class FloatingElement extends GE.ADynamicObject {
    private readonly _element: HTMLElement;
    private _elementOriginalPositions!: CT.Vector2d;

    public constructor(element: HTMLElement) {
        super();
        this._element = element;
    }
    public override onStart(): void {
        const rect = this._element.getBoundingClientRect();
        this._elementOriginalPositions = {
            x: rect.left,
            y: rect.top,
        };
    }

    private motionSpeed = 5;
    private motionAmplitude = 6;
    private megaCursorInfluenceDistance = 0.001 * 2;
    private xPositionTimeAmplitude = 5;
    private xPositionTimeInfluence = 1;

    public override onFrameUpdate(): void {
        this.updateElementPosition(
            this._element,
            this._elementOriginalPositions
        );
    }

    private updateElementPosition(
        element: HTMLElement,
        originalPosition: CT.Vector2d
    ): void {
        const timeOffset =
            originalPosition.x *
            this.xPositionTimeAmplitude *
            this.xPositionTimeInfluence;
        // offseted by horizontal axis
        const time = GE.GameTime.realTimeSinceStartup + timeOffset;

        let megaCursorInfluence =
            MG.MegaCursor.getDistance(originalPosition) *
            this.megaCursorInfluenceDistance;
        megaCursorInfluence = Math.max(0, Math.min(1, megaCursorInfluence));
        // megaCursorInfluence = megaCursorInfluence * 2; // add hard fallof

        const offsetXY: CT.Vector2d = {
            x: 1,
            y: 2,
        };

        const offsetX =
            Math.sin(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        const offsetY =
            Math.cos(time * this.motionSpeed) *
            this.motionAmplitude *
            megaCursorInfluence;

        element.style.position = "relative"; // absolute
        element.style.left = `${originalPosition.x + offsetX}px`;
        element.style.top = `${originalPosition.y + offsetY}px`;
    }
}

/**
 * Creates a indivisual DO for each element that is marked
 */
export class FloatingElementsFactory extends GE.ADynamicObject {
    private constructor() {
        super();
    }
    public static registerFloatingObjectsForClass(classID: string): void {
        const elements = document.getElementsByClassName(classID);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            const floatingController = new FloatingElement(element);
        }
    }
}
