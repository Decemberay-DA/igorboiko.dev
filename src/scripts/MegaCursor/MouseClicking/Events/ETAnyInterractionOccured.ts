import type { INotification } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import type { TAnyInterraction } from "../TAnyInterraction";

export default class ETAnyInterractionOccured implements INotification {
	public readonly event: TAnyInterraction;

	constructor(event: TAnyInterraction) {
		this.event = event;
	}
}
