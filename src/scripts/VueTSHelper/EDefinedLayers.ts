import type { IEnumClass } from "../utils/AEnumClass";
import { ASeflSeqrchedEnumeration } from "../utils/ASeflSeqrchedEnumeration";
import { Lazy } from "../utils/Lazy";
import DOMSearcher from "./DOMSearcher";

type TReadonlyDefinedLayer = Readonly<IDefinedLayer>;
export interface IDefinedLayer {
	name: string;
	zIndex: number;
	ntmlElement: HTMLElement;
}

export class EDEFINED_LAYERS extends ASeflSeqrchedEnumeration implements IEnumClass {
	// public safely acessed lazy hidden things ========-====-====-====-============
	public readonly this = "DefinedLayers";

	public get THREE_SPACE_SCENE_LAYER(): TReadonlyDefinedLayer {
		return this._THREE_SPACE_SCENE_LAYER.value;
	}
	public get CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER(): TReadonlyDefinedLayer {
		return this._CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER.value;
	}
	public get CENTER_PAGE_CONTENT(): TReadonlyDefinedLayer {
		return this._CENTER_PAGE_CONTENT.value;
	}
	public get OPENED_SUBPAGE_LAYER(): TReadonlyDefinedLayer {
		return this._OPENED_SUBPAGE_LAYER.value;
	}
	public get CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER(): TReadonlyDefinedLayer {
		return this._CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER.value;
	}
	public get NAVIGATION_LAYER(): TReadonlyDefinedLayer {
		return this._NAVIGATION_LAYER.value;
	}

	// private lazy things cz statick fields are getting initialized before html dom ========-====-====-====-============
	private _THREE_SPACE_SCENE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "THREE_SPACE_SCENE_LAYER",
			zIndex: -2000,
			ntmlElement: DOMSearcher.getElementById("THREE_SPACE_SCENE_LAYER"),
		};
	});
	private _CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER",
				zIndex: -1000,
				ntmlElement: DOMSearcher.getElementById("CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER"),
			};
		});
	private _CENTER_PAGE_CONTENT: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "CENTER_PAGE_CONTENT",
			zIndex: 0,
			ntmlElement: DOMSearcher.getElementById("CENTER_PAGE_CONTENT"),
		};
	});
	private _OPENED_SUBPAGE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "OPENED_SUBPAGE_LAYER",
			zIndex: +500,
			ntmlElement: DOMSearcher.getElementById("OPENED_SUBPAGE_LAYER"),
		};
	});
	private _CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER",
				zIndex: +1000,
				ntmlElement: DOMSearcher.getElementById("CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER"),
			};
		});
	private _NAVIGATION_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "NAVIGATION_LAYER",
			zIndex: +2000,
			ntmlElement: DOMSearcher.getElementById("NAVIGATION_LAYER"),
		};
	});
}
