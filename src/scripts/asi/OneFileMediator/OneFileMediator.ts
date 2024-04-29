import { PromisseH } from "@/scripts/utils/PromisseH";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export interface INotification {}

/**
 *
 */
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
		// const flowd = await pipe(
		// 	(await this._mapping.get(notification.constructor.name)) || [], //
		// 	await array.map(async (handler) => await handler.handle(notification).then().catch())
		// );
		const flowd = pipe(
			this._mapping.get(notification.constructor.name),
			option.fromNullable,
			option.match(
				() => {
					console.log("No handlers registered for notification: " + notification.constructor.name);
					return [];
				},
				(ok) => ok
			),
			array.map((handler) => handler.handle(notification)),
			PromisseH.runSimultaneously
		);
	}

	/**
	 * use name of event like "INotification.name"
	 */
	public register<TNotification extends INotification>(
		notificationName: string,
		notificationHandler: INotificationHandler<TNotification>
	) {
		const handlers = this._mapping.get(notificationName) || [];
		handlers.push(notificationHandler);
		this._mapping.set(notificationName, handlers);
		console.log("Mediator : Registered handles for notification: " + notificationName);
	}
}
