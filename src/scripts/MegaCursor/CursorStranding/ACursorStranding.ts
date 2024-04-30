import { GE } from "@/scripts/GameEngine";
import { IURIB } from "@/scripts/GameEngineFunctional/ADTs/_IURI/IURIB";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObjectB";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { MixinB } from "@/scripts/GameEngineFunctional/ADTs/Utils/MixinB";
import { IListenerB } from "@/scripts/GameEngineFunctional/Types/IListenerH";
import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { pipe } from "fp-ts/lib/function";

/**
 * Handles cursor effects.
 * Platform specifick
 *
 * Yo like "Death Strending"
 * got it?
 * like Kojima reference
 */
// export class ACursorStranding extends GE.ADynamicObject {
// 	protected __pagePosition: THREE.Vector2 = new THREE.Vector2(
// 		window.innerWidth / 2,
// 		window.innerHeight / 2
// 	);
// 	protected __clientPosition: THREE.Vector2 = new THREE.Vector2(
// 		window.innerWidth / 2,
// 		window.innerHeight / 2
// 	);

// 	public readonly pageRelative = CursorPositionProviderB.newRelative(() => this.__pagePosition);
// 	public readonly clientRelstive = CursorPositionProviderB.newRelative(() => this.__clientPosition);
// 	public readonly window = CursorPositionProviderB.newRelativeWindow(() => this.__clientPosition);

// 	protected constructor() {
// 		super();
// 		this.onFrameUpdateOrder = GE.OnFrameUpdateOrders.EARLY_FRAME_UPDATE - 1;
// 	}
// }

export interface IACursorStranding {
	__pagePosition: THREE.Vector2;
	__clientPosition: THREE.Vector2;
	pageRelative: CursorPositionData;
	clientRelstive: CursorPositionData;
	window: CursorPositionDataWindow;
}

export class ACursorStrandingB {
	/**
	 * @returns desctop version
	 */
	static newIACursorStranding_Desctop = (): IACursorStranding => {
		const __pagePosition = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
		const __clientPosition = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
		return {
			__pagePosition: __pagePosition,
			__clientPosition: __clientPosition,
			pageRelative: CursorPositionProviderB.newRelative(() => __pagePosition),
			clientRelstive: CursorPositionProviderB.newRelative(() => __clientPosition),
			window: CursorPositionProviderB.newRelativeWindow(() => __clientPosition),
		};
	};

	static _mouselistening =
		(e: MouseEvent) =>
		(data: IACursorStranding): void => {
			const page = new THREE.Vector2(e.pageX, e.pageY);
			if (page !== new THREE.Vector2(0, 0)) {
				data.__pagePosition = page;
			}
			const client = new THREE.Vector2(e.clientX, e.clientY);
			if (client !== new THREE.Vector2(0, 0)) {
				data.__clientPosition = client;
			}
		};

	static newMouseCursorStranding = () => {
		const listener = (e: any) => ACursorStrandingB._mouselistening(e)(cs.self);
		const cs = pipe(
			IListenerB.newSubscribeUnsobscribeActions_any("mousemove", listener),
			IDinamicUpdateB.new,
			IDinamicObjectB.new,
			MixinB.newWith(ACursorStrandingB.newIACursorStranding_Desctop()),
			IURIB.newImprinted("Listener"),
			IDB.new
		);
		return cs;
	};
}

/**
 *
 */
type CursorPositionData = {
	position: () => THREE.Vector2;
	position0to1: () => THREE.Vector2;
	positionNegative1toPositive1: () => THREE.Vector2;
	distanceTo: (point: THREE.Vector2) => number;
};
type CursorPositionDataWindow = {
	isCursorWithinScreen: () => boolean;
};
export class CursorPositionProviderB {
	static newRelative = (getter: () => THREE.Vector2): CursorPositionData => {
		const position = () => getter();
		const position0to1 = () =>
			new THREE.Vector2(getter().x / window.innerWidth, getter().y / window.innerHeight);
		const positionNegative1toPositive1 = () =>
			new THREE.Vector2((position0to1().x - 0.5) * 2, (position0to1().y - 0.5) * 2);
		const distanceTo = (point: THREE.Vector2) => getter().distanceTo(point);
		return {
			position,
			position0to1,
			positionNegative1toPositive1,
			distanceTo,
		};
	};

	static newRelativeWindow = (getter: () => THREE.Vector2): CursorPositionDataWindow => {
		const isCursorWithinScreen = () => {
			const x = getter().x;
			const y = getter().y;
			return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
		};
		return {
			isCursorWithinScreen,
		};
	};
}
