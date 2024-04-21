import { Mediator } from "mediatr-ts";
import context from "./context";
import data from "./data";
import mediator from "./mediator";
import InjectionContainerBuilderH from "./injector";
import type { Container } from "inversify";

/**
 * Description:
 * afigenniy
 * superzvukovoi
 * ispolnitel
 *
 * Explanation:
 * ocheny dlinnaya istoriyz, mne leny pisaty no povery mne - nikto ne slomal sebe kolennuyu chashechku, vklyuchaya teh 3000 pchyol.
 */
export default class asi {
	public static readonly context: context = new context();
	public static readonly data: data = new data();
	public static readonly mediator: Readonly<mediator> = new mediator();
	public static readonly injector: Readonly<Container> = InjectionContainerBuilderH.build();
}
