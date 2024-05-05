import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IParented } from "../IParented/IParented";
import { type IEnableable } from "../IEnableable/IEnableable";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { Bro } from "../../FunctionalBroH";
import type { IDinamicUpdates } from "../IDinamicUpdates/IDinamicUpdates";
import type { IDinamicObject } from "./typesBase";
import { IDinamicUpdatesH } from "../IDinamicUpdates/IDinamicUpdatesH";
import { IParentedH } from "../IParented/IParentedH";
import { iuri } from "../_IURI___";
import { dinamicObject } from ".";

/**
 *
 */
export const start =
	<T extends ITimeMoment>(time: T) =>
	<A extends IDinamicObject>(obj: A): A => {
		return pipe(
			obj,
			IEnableableH.executeIfEnabled(() => {
				obj.onStart(time);
				obj._isStarted = true;
			}),
			Bro.meanwhile((bro) => console.log("started: " + bro))
		);
	};
export const tryStart =
	<T extends ITimeMoment>(time: T) =>
	<A extends object>(obj: A): A => {
		// the worst typescript i have ever wrote
		// i am expecting bug here
		if ("onStart" in obj === false) return obj;
		return pipe(
			obj as any as IDinamicObject,
			option.fromNullable,
			option.match(
				() => obj,
				(casted) => dinamicObject.start(time)(casted) as A
			)
		);
	};

export const frameUpdate =
	<T extends ITimeMoment>(time: T) =>
	<A extends IDinamicObject>(obj: A): A => {
		return pipe(
			obj,
			// BroH.logThisOnePLZ,
			IEnableableH.executeIfEnabled(() => obj.onFrameUpdate(time))
			// BroH.meanwhile((bro) => console.log("meanwhiled " + bro))
			// SedeffectsH.doIf((obj) => console.log(obj))((obj) => true)
			// SedeffectsH.doIf((obj)=>obj.)
		);
	};

export const newDelete =
	<T extends ITimeMoment>(time: T) =>
	<A extends IDinamicObject>(obj: A): A => {
		return pipe(
			obj,
			(x) => {
				x.onDelete(time);
				x._isDeleted = true;
				return x;
			},
			IEnableableH.disable
		);
	};
export const newDeleteParented =
	<T extends ITimeMoment>(time: T) =>
	<C, A extends IDinamicObject & IParented<C>>(obj: A): A => {
		return pipe(
			obj, //
			dinamicObject.newDelete(time),
			IDinamicUpdatesH.tryRemoveAndUnParent(obj.parent)
		);
	};
