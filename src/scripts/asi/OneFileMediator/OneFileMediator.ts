export interface INotification {}

export interface INotificationHandler<TNotification extends INotification> {
	handle(notification: TNotification): Promise<void>;
}

export class Mediator {
	private _mapping: Map<string, Array<INotificationHandler<INotification>>> = new Map();

	public constructor() {}

	public async publish(notification: INotification): Promise<void> {
		const handlers = this._mapping.get(notification.constructor.name) || [];
		for (const handler of handlers) {
			await handler.handle(notification).then().catch();
		}
	}

	public register<TNotification extends INotification>(
		notificationType: string,
		notificationHandler: INotificationHandler<TNotification>
	) {
		const handlers = this._mapping.get(notificationType) || [];
		handlers.push(notificationHandler);
		this._mapping.set(notificationType, handlers);
	}

	public unregister<TNotification extends INotification>(
		notificationType: string,
		notificationHandler: INotificationHandler<TNotification>
	) {
		const handlers = this._mapping.get(notificationType);
		if (!handlers) return;

		const index = handlers.indexOf(notificationHandler);
		if (index === -1) return;

		handlers.splice(index, 1);
		if (handlers.length === 0) {
			this._mapping.delete(notificationType);
		} else {
			this._mapping.set(notificationType, handlers);
		}
	}
}
