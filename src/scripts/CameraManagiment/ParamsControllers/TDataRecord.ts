import type { TMemento } from "./IObjectsGroupeParametersController";
import type { IClonable } from "@/scripts/utils/Clone";

export type TDataRecord<TObj, TSelf> = TMemento<TObj> & IClonable<TSelf>;
