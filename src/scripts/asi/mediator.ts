import { Mediator, type INotification, type IRequest } from "mediatr-ts";
// export * from "src/scripts/asi/mediator.order";
// export * from "src/scripts/asi/mediator.order/mediator.orderedImport.ts";

// // load Ns
// /**
//  * i hate load order soooo much omg
//  */
// // export * from "";
// import * as LoadCurtainsE from "src/scripts/ThreeJS/LoadCurtains/Events";
// import * as CameraManagimentE from "src/scripts/CameraManagiment/Events";
// import * as DefinedScenesE from "src/scripts/CameraManagiment/DefinedScenes/Events";

// // load NHs
// // export * from "";
// import * as LoadCurtainsEH from "src/scripts/ThreeJS/LoadCurtains/Events.Handlers";
// import * as CameraManagimentEH from "src/scripts/CameraManagiment/Events.Handlers";
// import * as DefinedScenesEH from "src/scripts/CameraManagiment/DefinedScenes/Events.Handlers";

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
}
