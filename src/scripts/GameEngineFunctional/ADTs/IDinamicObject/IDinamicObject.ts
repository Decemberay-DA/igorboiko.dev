import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate/IDinamicUpdate";
import type { IEnableable } from "../IEnableable/IEnableable";

/**
 * here is no difference from IGame actually
 */
export interface IDinamicObject extends IDinamicUpdate, IEnableable {}
