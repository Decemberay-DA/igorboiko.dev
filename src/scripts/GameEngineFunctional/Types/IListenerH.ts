import { array, string } from "fp-ts";
import type { IDinamicUpdate, IDinamicUpdateFields } from "../ADTs/IDinamicUpdate/IDinamicUpdate";
import { pipe } from "fp-ts/lib/function";
import { IDinamicUpdateB } from "../ADTs/IDinamicUpdate/IDinamicUpdateB";

/**
 *
 */
export class IListenerB {
	static newSubscribeUnsobscribeActions = (
		eventName: string,
		listener: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => void
	): IDinamicUpdateFields => ({
		onStart() {
			document.addEventListener(eventName, listener);
		},
		onDelete() {
			document.removeEventListener(eventName, listener);
		},
	});

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
