import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IGame } from "../IGame/IGame";
import type { IDinamicObject } from "./IDinamicObject";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IGameBounded } from "../IGameBounded/IGameBounded";
import { type IEnableable } from "../IEnableable/IEnableable";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { BroH } from "../../FunctionalBroH";
import { SedeffectsH } from "../../SedeffectsH";

/**
 *
 */
export class IDinamicObjectH {
	static readonly start =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicUpdate & IEnableable>(obj: A): A => {
			return pipe(
				obj,
				IEnableableH.executeIfEnabled(() => obj.onStart(time))
			);
		};
	static readonly frameUpdate =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicUpdate & IEnableable>(obj: A): A => {
			return pipe(
				obj,
				BroH.logThisOnePLZ,
				IEnableableH.executeIfEnabled(() => obj.onFrameUpdate(time)),
				BroH.meanwhile((bro) => console.log("meanwhiled " + bro))
				// SedeffectsH.doIf((obj) => console.log(obj))((obj) => true)
				// SedeffectsH.doIf((obj)=>obj.)
			);
		};

	static readonly destroyItself = <A extends IDinamicUpdate & IEnableable & IGameBounded>(obj: A): A => {
		const game = obj.parentGame;

		const deleted = pipe(
			obj,
			IEnableableH.disable,
			BroH.meanwhile((x) => x.onDelete(game.timeMoment))
		);

		game.participants = pipe(
			game.participants,
			array.filter((objs) => objs !== obj)
		);

		return deleted;
	};

	static readonly destroyFrom =
		<G extends IGame>(game: G) =>
		<A extends IDinamicUpdate & IEnableable>(obj: A): G => {
			obj.onDelete(game.timeMoment);

			game.participants = pipe(
				game.participants,
				array.filter((objs) => objs !== obj)
			);

			return game;
		};
}
