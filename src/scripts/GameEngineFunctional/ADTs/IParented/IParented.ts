import type { option } from "fp-ts";

/**
 * knows about its parent context
 */
export interface IParented<Parent> {
	parent: option.Option<Parent>;
}
