import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";

/**
 * 
 */
export default class EHOnAnyInterractionGeneral implements INotificationHandler<ETAnyInterractionOccured> {
	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		console.log("EHOnAnyInterractionGeneral: handled event: " + notification.event);
		return Promise.resolve();
	}
}
