import { notificationHandler, type INotificationHandler } from "mediatr-ts";
import NCurtainsOpened from "../Events/NCurtainsOpened";
import { GE } from "@/scripts/GameEngine";

@notificationHandler(NCurtainsOpened)
class EHStuff_on_NCurtainsOpened extends GE.ADynamicObject implements INotificationHandler<NCurtainsOpened> {
	public async handle(notification: NCurtainsOpened): Promise<void> {
		return Promise.resolve();
	}
}
