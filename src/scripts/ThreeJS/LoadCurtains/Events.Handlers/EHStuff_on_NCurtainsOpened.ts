import NCurtainsOpened from "../Events/NCurtainsOpened.ts";
import type { INotification, INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator.ts";

export default class EHStuff_on_NCurtainsOpened implements INotificationHandler<NCurtainsOpened> {
	public async handle(notification: NCurtainsOpened): Promise<void> {
		console.warn("CURTAINS WAS OPENED! RUN!");
		return Promise.resolve();
	}
}
