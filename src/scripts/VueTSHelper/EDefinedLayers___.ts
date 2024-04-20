import type { IEnumClass } from "../utils/AEnumClass";
import { Lazy } from "../utils/Lazy";
import DOMSearcherH from "./DOMSearcherH";
/**
 * @deprecated use SceneRegistry
 */
type TReadonlyDefinedLayer = Readonly<IDefinedLayer>;
/**
 * @deprecated use SceneRegistry
 */
export interface IDefinedLayer {
	name: string;
	ntmlElement: HTMLElement;
}
/**
 * @deprecated use SceneRegistry
 */
export class EDEFINED_LAYERS {
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

	private _THREE_SPACE_SCENE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "THREE_SPACE_SCENE_LAYER",
			ntmlElement: DOMSearcherH.getElementById("THREE_SPACE_SCENE_LAYER"),
		};
	});
	private _CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER",
				ntmlElement: DOMSearcherH.getElementById("CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER"),
			};
		});
	private _CENTER_PAGE_CONTENT: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "CENTER_PAGE_CONTENT",
			ntmlElement: DOMSearcherH.getElementById("CENTER_PAGE_CONTENT"),
		};
	});
	private _OPENED_SUBPAGE_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "OPENED_SUBPAGE_LAYER",
			ntmlElement: DOMSearcherH.getElementById("OPENED_SUBPAGE_LAYER"),
		};
	});
	private _CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER: Lazy<TReadonlyDefinedLayer> =
		new Lazy<TReadonlyDefinedLayer>(() => {
			return {
				name: "CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER",
				ntmlElement: DOMSearcherH.getElementById("CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER"),
			};
		});
	private _NAVIGATION_LAYER: Lazy<TReadonlyDefinedLayer> = new Lazy<TReadonlyDefinedLayer>(() => {
		return {
			name: "NAVIGATION_LAYER",
			ntmlElement: DOMSearcherH.getElementById("NAVIGATION_LAYER"),
		};
	});
}
