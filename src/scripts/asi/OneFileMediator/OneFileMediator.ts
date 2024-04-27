import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
export interface INotification {}

export interface INotificationHandler<TNotification extends INotification> {
	handle(notification: TNotification): Promise<void>;
}

/**
 * it looks like a Semigroupe to me hahahahah
 * cz clear like what was the word
 */
export class Mediator {
	private _mapping: Map<string, Array<INotificationHandler<INotification>>> = new Map();

	public constructor() {}

	public async publish(notification: INotification): Promise<void> {
		const flowd = await pipe(
			(await this._mapping.get(notification.constructor.name)) || [], //
			await array.map(async (handler) => await handler.handle(notification).then().catch())
		);
	}

	/**
	 * use name of event like "INotification.name"
	 */
	public register<TNotification extends INotification>(
		notificationType: string,
		notificationHandler: INotificationHandler<TNotification>
	) {
		const handlers = this._mapping.get(notificationType) || [];
		handlers.push(notificationHandler);
		this._mapping.set(notificationType, handlers);
		console.log("Mediator : Registered handles for event : " + notificationType);
	}
}
