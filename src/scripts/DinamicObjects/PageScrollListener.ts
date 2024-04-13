import { GE } from "../GameEngine";

/**
 * provides access to current scroll of page
 */
export class PageScrollListener extends GE.ADynamicObject {
	private _scroll!: number;
	public get scrollAbsolute(): number {
		return this._scroll;
	}
	public get scroll0to1(): number {
		return this._scroll / (document.body.scrollHeight - window.innerHeight);
	}

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE - 1;

		this.updateScroll();
	}

	private updateScroll() {
		// this._scroll = window.scrollY;
	}

	public override onStart(): void {
		// window.addEventListener("scroll", this.updateScroll);
	}
	public override onDelete(): void {
		// window.removeEventListener("scroll", this.updateScroll);
	}
}
