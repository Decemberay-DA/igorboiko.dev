import { Mediator, type INotification, type IRequest } from "mediatr-ts";

/**
 * if only this worked
 */
export class mediator {
	private _mediator = new Mediator();

	public send<T>(request: IRequest<T>): Promise<T> {
		return this._mediator.send<T>(request);
	}

	public publish(notification: INotification): Promise<void> {
		return this._mediator.publish(notification);
	}
}
