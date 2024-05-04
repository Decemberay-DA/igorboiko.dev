import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IEnableable } from "../IEnableable/IEnableable";

/**
 *
 */
export interface IDinamicObject extends IDinamicUpdate, IEnableable {}
export const URI = "DinamicObject";
