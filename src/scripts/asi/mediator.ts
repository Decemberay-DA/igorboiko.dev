import { Mediator, type INotification } from "mediatr-ts";

export class mediator {
	private _mediator: Mediator = new Mediator();

	public publish(notification: INotification) {
		this._mediator.publish(notification);
	}
}
