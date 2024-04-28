import { THREE } from "@/scripts/ThreeJS";
import type { IDinamicObject } from "../IDinamicObject/IDinamicObject";
import { IDinamicUpdateB } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdateB";
import { IEnableableB } from "../IEnableable/IEnableableB";
import { type UUID } from "./UUID";
import { IDB } from "./IDB";

/**
 * only one reference type.
 * only one thing that is getting not copied in functional game engine,
 * and safe to be referenced by references
 * Self - A extends all inner subtypes for public access
 * @note actually it is possible to completely live without it in functional progrmming
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
	readonly self: Self;
}

interface IMover {
	target: THREE.Object3D;
	speed: number;
	freq: number;
}
const moverProps: IMover = {
	target: new THREE.Object3D(),
	speed: 12,
	freq: 5,
};
type IDIDinamicObject<A> = ID<IDinamicObject & A>;

const od: IDinamicObject = {
	...IEnableableB.enabled(),
	...IDinamicUpdateB.new({}),
};

const sinmoverTested: ID<IDinamicObject & IMover> = IDB.new({
	...od, //
	...moverProps,
});
// sinmoverTested.self.

const sinmoverTested2: IDIDinamicObject<IMover> = IDB.new({
	...od, //
	...moverProps,
});
