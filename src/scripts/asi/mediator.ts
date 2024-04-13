import { Mediator, type INotification } from "mediatr-ts";

/**
 * if only this worked
 */
export class mediator {
	private _mediator: Mediator = new Mediator();

	public publish(notification: INotification) {
		this._mediator.publish(notification);
	}
}
