import type { Container } from "inversify";
import context from "./context.ts";
import data from "./data.ts";
import InjectionContainerBuilderH from "./injector.ts";
import { Mediator } from "./OneFileMediator/OneFileMediator.ts";

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
	public static readonly mediator: Readonly<Mediator> = new Mediator();
	public static readonly injector: Readonly<Container> = InjectionContainerBuilderH.build();
}
