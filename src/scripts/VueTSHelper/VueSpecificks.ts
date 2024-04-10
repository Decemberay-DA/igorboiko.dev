import { getCurrentInstance, type App } from "vue";
import type { INotification } from "mediatr-ts";
import asi from "../asi/asi";
import { EDefinedLayers } from "./EDefinedLayers";


/**
 * duh
 */
export default class VueSpecificks {
	public static readonly DefinedComponents = new EDefinedLayers();

	static {
		document.addEventListener("DOMContentLoaded", function () {
			asi.mediator.publish(new DOMContentFinallyWasLoadedOMG());
		});
	}
}

export class DOMContentFinallyWasLoadedOMG implements INotification {}
