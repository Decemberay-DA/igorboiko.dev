import type { Magma } from "fp-ts/lib/Magma";
import { type IDinamicObject } from "../IDinamicObject/IDinamicObject";
import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";

/**
 * a dinamic object that have a set of subobjects that it executes every frame
 * is It a Semigroupe? is order important? => test meybe idk
 */
export interface IGame extends ILocalTime, Magma<IGame> {
	participants: IDinamicObject[];
}

export interface ILocalTime {
	timeMoment: ITimeMoment;
}
