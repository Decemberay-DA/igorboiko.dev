import { IURIB } from "@/scripts/GameEngineFunctional/ADTs/_IURI/IURIB";
import { IDB } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/IDB";
import { IDinamicObjectB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/builders";
import { IDinamicUpdateB } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdateB";
import { MixinB } from "@/scripts/GameEngineFunctional/ADTs/Utils/MixinB";
import { Bro } from "@/scripts/GameEngineFunctional/FunctionalBroH";
import { IListenerB } from "@/scripts/GameEngineFunctional/Types/IListenerH";
import { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { functor } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 * Handles cursor effects.
 * Platform specifick
 *
 * Yo like "Death Strending"
 * got it?
 * like Kojima reference
 */
export interface IACursorStranding {
	__pagePosition: THREE.Vector2;
	__clientPosition: THREE.Vector2;
	readonly pageRelative: ICursorPositionData;
	readonly clientRelative: ICursorPositionData;
	readonly windowState: ICursorWindowState;
}

/**
 *
 */
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
			clientRelative: CursorPositionProviderB.newRelative(() => __clientPosition),
			windowState: CursorPositionProviderB.newRelativeWindow(() => __clientPosition),
		};
	};

	static newMouseCursorStranding = () => {
		const listener = (e: MouseEvent) => {
			const page = new THREE.Vector2(e.pageX, e.pageY);
			if (page !== new THREE.Vector2(0, 0)) cs.self.__pagePosition = page;

			const client = new THREE.Vector2(e.clientX, e.clientY);
			if (client !== new THREE.Vector2(0, 0)) cs.self.__clientPosition = client;
		};

		const cs = pipe(
			IListenerB.newSubscribeUnsobscribeActions_any("mousemove", listener),
			// {},
			IDinamicUpdateB.new,
			IDinamicObjectB.new,
			MixinB.newWith(ACursorStrandingB.newIACursorStranding_Desctop()),
			IURIB.newImprinted("Listener"),
			Bro.logThisOnePLZ,
			IDB.new
		);

		const jgksd = functor.bindTo;

		return cs;
	};
}

/**
 *
 */
type ICursorPositionData = {
	position: () => THREE.Vector2;
	position0to1: () => THREE.Vector2;
	positionNegative1toPositive1: () => THREE.Vector2;
	distanceTo: (point: THREE.Vector2) => number;
};
type ICursorWindowState = {
	isCursorWithinScreen: () => boolean;
};
export class CursorPositionProviderB {
	static newRelative = (getter: () => THREE.Vector2): ICursorPositionData => {
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

	static newRelativeWindow = (getter: () => THREE.Vector2): ICursorWindowState => {
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
