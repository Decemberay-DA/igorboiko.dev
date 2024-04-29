import { GE } from "@/scripts/GameEngine";
import { type IDinamicObject } from "../ADTs/IDinamicObject/IDinamicObject";
import { IGameBoundedB } from "../ADTs/IGameBounded/IGameBoundedB";
import { type IGameBounded } from "../ADTs/IGameBounded/IGameBounded";
import { IDinamicUpdateB } from "../ADTs/IDinamicUpdate/IDinamicUpdate/IDinamicUpdateB";
import { type IEnableable } from "../ADTs/IEnableable/IEnableable";
import { IEnableableB } from "../ADTs/IEnableable/IEnableableB";
import type { IGame } from "../ADTs/IDinamicUpdate/IDinamicUpdates/IGame/IGame";
import { type ITimeMoment } from "../ADTs/ITimeMoment/ITimeMoment";
import { ITimeMomentB } from "../ADTs/ITimeMoment/ITimeMomentB";
import { ITimeMomentH } from "../ADTs/ITimeMoment/ITimeMomentH";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export class GameTimeB {
	static readonly newTracker =
		(startTime: number = 0) =>
		<A extends IGame>(game: A): IDinamicObject & IGameBounded & ITimeMoment => {
			const root = GameTimeB.newRootTracker(startTime);
			return {
				...root,
				...IGameBoundedB.new(game),
			};
		};
	/**
	 * OHMYGOSH tHIS sHITiS cRAZY AS FOR C# DeV OOOMG
	 * @returns object that every frame gots to itself actual time of the game
	 */
	static readonly newRootTracker = (startTime: number = 0): IDinamicObject & ITimeMoment => {
		const timeMoment = ITimeMomentB.new(startTime);
		return {
			...IEnableableB.enabled(),
			...IDinamicUpdateB.new({
				onFrameUpdateOrder: GE.OnFrameUpdatePriorities.GAME_TIME,
				onFrameUpdate(time) {
					timeMoment.frame = time.frame + 1;
					timeMoment.delta = pipe(
						timeMoment.sinceStart,
						ITimeMomentH.calculateDeltaTime(time.sinceStart)
					);
				},
			}),
			...timeMoment,
		};
	};
}
