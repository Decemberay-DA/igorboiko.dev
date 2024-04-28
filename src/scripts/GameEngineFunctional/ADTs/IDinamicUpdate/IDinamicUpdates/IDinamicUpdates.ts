import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";

/**
 * some ammoun of updates in one place getting executed (maybe even in order)
 */
export interface IDinamicUpdates extends IDinamicUpdate {
	participants: IDinamicUpdate[];
}
