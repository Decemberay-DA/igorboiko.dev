// import { DOMContentFinallyWasLoadedOMG } from "../VueTSHelper/VueSpecificks";
import context from "./context";
import { data } from "./data";
import { mediator } from "./mediator";

/**
 * Description:
 * afigenniy
 * superzvukovoi
 * ispolnitel
 *
 * Explanation:
 * ocheny dlinnaya istoriyz, mne leny pisaty no povery mne - nikto ne slomal sebe kolennuyu chashechku, vklyuchaya teh 3000 pchyol.
 */
export class asi {
	public static readonly context: Readonly<context> = new context();
	public static readonly data: data = new data();
	public static readonly mediator: Readonly<mediator> = new mediator();

	static {
		// document.addEventListener("DOMContentLoaded", () =>
		// 	// asi.mediator.publish(new DOMContentFinallyWasLoadedOMG())
		// );
	}
}
