import type { TMemento } from "./IObjectsGroupeParametersController";
import type { IClonable } from "@/scripts/utils/IClonable";

export type TDataRecord<TObj, TSelf> = TMemento<TObj> & IClonable<TSelf>;
