import { type UUID } from "../UUID/UUID";

/**
 * only one reliable reference type that never getting rebuilded.
 * only one thing that is getting not copied in functional game engine,
 * and safe to be referenced by references
 * Self - A extends all inner subtypes for public access
 */
export interface ID<Self> {
	/**
	 * numerical identity of this object if it was copyed for some reson
	 */
	readonly id: UUID;
	/**
	 * access to selfs subtipes
	 * Getting cloned fully or partially every operation
	 */
	self: Self;
}
