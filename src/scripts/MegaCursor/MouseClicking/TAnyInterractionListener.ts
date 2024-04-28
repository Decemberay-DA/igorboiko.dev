import { GE } from "@/scripts/GameEngine";
import type { TAnyInterraction } from "./TAnyInterraction";
import asi from "@/scripts/asi/asi";
import ETAnyInterractionOccured from "./Events/ETAnyInterractionOccured";

export default class TAnyInterractionListener extends GE.ADynamicObject {
	private _listener(e: TAnyInterraction) {
		asi.mediator.publish(new ETAnyInterractionOccured(e));
	}

	public constructor() {
		super();
		this.onFrameUpdateOrder = GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE;
	}

	public override onStart(): void {
		document.addEventListener("click", this._listener);
		document.addEventListener("keydown", this._listener);
		window.addEventListener("touchend", this._listener);
	}

	public override onDelete(): void {
		super.onDelete();
		document.removeEventListener("click", this._listener);
		document.removeEventListener("keydown", this._listener);
		window.removeEventListener("touchend", this._listener);
	}
}
