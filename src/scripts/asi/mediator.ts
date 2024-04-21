import { Mediator, type INotification, type IRequest } from "mediatr-ts";

/**
 * if only this worked
 */
export default class mediator {
	private _mediator = new Mediator();

	public send<T>(request: IRequest<T>): Promise<T> {
		// sometimes it cant find map for Notifications that have no handlers
		try {
			return this._mediator.send<T>(request);
		} catch (error) {
			console.warn("asi.mediator error : " + error);
			return Promise.reject(error);
		}
	}

	public publish(notification: INotification): Promise<void> {
		try {
			return this._mediator.publish(notification);
		} catch (error) {
			console.warn("asi.mediator error : " + error);
			return Promise.reject(error);
		}
	}

	// private tryDo<targ, tret>(arg: targ, action: (arg: targ) => tret) {
	// 	// sometimes it cant find map for Notifications that have no handlers
	// 	try {
	// 		return action(arg);
	// 	} catch (error) {
	// 		console.warn("asi.mediator error : " + error);
	// 		return Promise.reject(error);
	// 	}
	// }
}
