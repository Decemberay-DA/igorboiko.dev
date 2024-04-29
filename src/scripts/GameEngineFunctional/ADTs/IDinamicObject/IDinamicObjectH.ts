import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IParented } from "../IParented/IParented";
import { type IEnableable } from "../IEnableable/IEnableable";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { BroH } from "../../FunctionalBroH";
import type { IDinamicUpdates } from "../IDinamicUpdates/IDinamicUpdates";
import type { IDinamicObject } from "./IDinamicObject";

/**
 *
 */
export class IDinamicObjectH {
	static readonly start =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicUpdate & IEnableable>(obj: A): A => {
			return pipe(
				obj,
				IEnableableH.executeIfEnabled(() => obj.onStart(time)),
				BroH.meanwhile((bro) => console.log("started: " + bro))
			);
		};
	static readonly frameUpdate =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicUpdate & IEnableable>(obj: A): A => {
			return pipe(
				obj,
				// BroH.logThisOnePLZ,
				IEnableableH.executeIfEnabled(() => obj.onFrameUpdate(time))
				// BroH.meanwhile((bro) => console.log("meanwhiled " + bro))
				// SedeffectsH.doIf((obj) => console.log(obj))((obj) => true)
				// SedeffectsH.doIf((obj)=>obj.)
			);
		};
}
