import context from "./context.ts";
import data from "./data.ts";
import { Mediator } from "./OneFileMediator/OneFileMediator.ts";
import OMediatoH from "./OneFileMediator/OneFileMediatorNotificationHandlersRegistrationH.ts";
import { game } from "./game.ts";

/**
 * Description:
 * afigenniy
 * superzvukovoi
 * ispolnitel
 *
 * Explanation:
 * ocheny dlinnaya istoriyz, mne leny pisaty no povery mne - nikto ne slomal sebe kolennuyu chashechku,
 * 		 vklyuchaya tyeh 3000 pchyol.
 */
export default class asi {
	/**
	 * some app-level state
	 */
	public static readonly context = new context();
	/**
	 * bag with global wariables
	 */
	public static readonly data = new data();
	/**
	 * app-scope events
	 */
	public static readonly mediator: Readonly<Mediator> = OMediatoH.registerHandlers(new Mediator());
	/**
	 * the root game
	 */
	public static readonly game: Readonly<game> = new game();
}
