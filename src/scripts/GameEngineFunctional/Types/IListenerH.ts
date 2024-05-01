import { array, string } from "fp-ts";
import type { IDinamicUpdate, IDinamicUpdateFields } from "../ADTs/IDinamicUpdate/IDinamicUpdate";
import { pipe } from "fp-ts/lib/function";
import { IDinamicUpdateB } from "../ADTs/IDinamicUpdate/IDinamicUpdateB";

interface ISubscribeUnsubscribeTarget {
	addEventListener<K extends keyof DocumentEventMap>(
		type: K,
		listener: (this: Document, ev: DocumentEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): void;
	removeEventListener<K extends keyof DocumentEventMap>(
		type: K,
		listener: (this: Document, ev: DocumentEventMap[K]) => any,
		options?: boolean | EventListenerOptions
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	): void;
}
/**
 *
 */
export class IListenerB {
	static newSubscribeUnsobscribeActionsFor =
		<T extends ISubscribeUnsubscribeTarget>(target: T) =>
		(
			eventName: string,
			listener: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => void
		): IDinamicUpdateFields => ({
			onStart() {
				target.addEventListener(eventName, listener);
			},
			onDelete() {
				target.removeEventListener(eventName, listener);
			},
		});

	static newSubscribeUnsobscribeActions = (
		eventName: string,
		listener: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => void
	): IDinamicUpdateFields => IListenerB.newSubscribeUnsobscribeActionsFor(document)(eventName, listener);

	static newSubscribeUnsobscribeActions_any = (
		eventName: string,
		listener: (this: Document, ev: any) => void
	): IDinamicUpdateFields => IListenerB.newSubscribeUnsobscribeActions(eventName, listener);

	static newSubscribeUnsobscribeActions_toMulti_any =
		(listener: (this: Document, ev: any) => void) =>
		(eventNames: string[]): IDinamicUpdate => {
			return pipe(
				eventNames,
				array.map((event) =>
					pipe(IListenerB.newSubscribeUnsobscribeActions_any(event, listener), IDinamicUpdateB.new)
				),
				array.reduce(IDinamicUpdateB.empty(), (a, b) => IDinamicUpdateB.concat(a)(b))
			);
		};
}
