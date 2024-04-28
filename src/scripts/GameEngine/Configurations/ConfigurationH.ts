import type { IGame } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdates/IGame/IGame";
import { GE } from "..";

/**
 *
 */
export class ConfigurationH {
	static readonly time = () => {
		const timeUpdater = new GE.GameTime();
	};
}
