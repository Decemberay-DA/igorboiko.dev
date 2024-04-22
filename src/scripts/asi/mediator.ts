import { Mediator, type INotification } from "./OneFileMediator/OneFileMediator.ts";

/**
 * if only this worked
 */
export default class mediator {
	private _mediator = new Mediator();

	public publish(notification: INotification): Promise<void> {
		try {
			return this._mediator.publish(notification);
		} catch (error) {
			console.warn("asi.mediator error : " + error);
			return Promise.reject(error);
		}
	}
}
