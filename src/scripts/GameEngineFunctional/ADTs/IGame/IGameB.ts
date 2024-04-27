import { IDinamicObjectH } from "../IDinamicObject/IDinamicObjectH";
import type { IGame } from "./IGame";
import { IDinamicUpdatesB } from "../IDinamicUpdates/IDinamicUpdatesB";
import { IEnableableB } from "../IEnableable/IEnableableB";
import { GameTimeB } from "../../Types/GameTime";
import type { IDinamicObject } from "../IDinamicObject/IDinamicObject";
import { IGameH } from "./IGameH";

/**
 *
 */
export class IGameB {
	static readonly newIGame = (): IGame => ({
		timeMoment: GameTimeB.newRootTracker(0), // who is updating this one?
		participants: [],
		concat: IGameH.concat,
	});

	static readonly new = (): IGame & IDinamicObject => {
		const sIGame = IGameB.newIGame();
		return {
			...IEnableableB.enabled(),
			...sIGame,
			...IDinamicUpdatesB.new({
				// or is it better to use its own time??? // here a time bug probably i thunk
				onStart(time) {
					IGameH.traverce((ch) => IDinamicObjectH.start(time)(ch))(sIGame);
				},
				onFrameUpdate(time) {
					IGameH.traverce((ch) => IDinamicObjectH.start(time)(ch))(sIGame);
				},
				onDelete: (time) => IGameH.traverce((ch) => IDinamicObjectH.destroyFrom(sIGame)(ch))(sIGame),
			}),
		};
	};
}
