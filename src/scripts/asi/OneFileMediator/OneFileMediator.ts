import type { UUID } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/UUID";
import { PromisseH } from "@/scripts/utils/PromisseH";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export interface INotification {}
export interface INotificationTyped extends INotification, ITypeUUIDed {
	readonly typeUUID: UUID;
}

export interface ITypeUUIDed {
	readonly typeUUID: UUID;
}
export class TypeUUDIH {
	static readonly appendInherited = (thisOne: UUID) => (baseOne: ITypeUUIDed) => thisOne + baseOne.typeUUID;
	static readonly isContains = (thisOne: UUID) => (baseOne: ITypeUUIDed) =>
		baseOne.typeUUID.includes(thisOne);
}

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
