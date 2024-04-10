import AEnumClass from "../utils/AEnumClass";
import { Lazy } from "../utils/Lazy";
import DOMSearcher from "./DOMSearcher";

export interface IDefinedLayer {
	name: string;
	zIndex: number;
	ntmlElement: HTMLElement;
}

type TReadonlyDefinedLayer = Readonly<IDefinedLayer>;

export class EDefinedLayers extends AEnumClass {
	// public safely acessed lazy hidden things ========-====-====-====-============
	public get THREE_SPACE_SCENE_LAYER() {
		return this._THREE_SPACE_SCENE_LAYER.value;
	}
	public get CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER() {
		return this._CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER.value;
	}
	public get CENTER_PAGE_CONTENT() {
		return this._CENTER_PAGE_CONTENT.value;
	}
	public get OPENED_SUBPAGE_LAYER() {
		return this._OPENED_SUBPAGE_LAYER.value;
	}
	public get CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER() {
		return this._CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER.value;
	}
	public get FOREGROUND_PINNED_LAYER() {
		return this._FOREGROUND_PINNED_LAYER.value;
	}

	// private lazy things cz statick fields are getting initialized before html dom ========-====-====-====-============
	private _THREE_SPACE_SCENE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "THREE_SPACE_SCENE_LAYER",
			zIndex: -2000,
			ntmlElement: DOMSearcher.getHTMLElementByClassName("THREE_SPACE_SCENE_LAYER"),
		};
	});
	private _CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER",
				zIndex: -1000,
				ntmlElement: DOMSearcher.getHTMLElementByClassName("CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER"),
			};
		});
	private _CENTER_PAGE_CONTENT: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "CENTER_PAGE_CONTENT",
			zIndex: 0,
			ntmlElement: DOMSearcher.getHTMLElementByClassName("CENTER_PAGE_CONTENT"),
		};
	});
	private _OPENED_SUBPAGE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "OPENED_SUBPAGE_LAYER",
			zIndex: +500,
			ntmlElement: DOMSearcher.getHTMLElementByClassName("OPENED_SUBPAGE_LAYER"),
		};
	});
	private _CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER",
				zIndex: +1000,
				ntmlElement: DOMSearcher.getHTMLElementByClassName("CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER"),
			};
		});

	private _FOREGROUND_PINNED_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "FOREGROUND_PINNED_LAYER",
			zIndex: +2000,
			ntmlElement: DOMSearcher.getHTMLElementByClassName("FOREGROUND_PINNED_LAYER"),
		};
	});
}
