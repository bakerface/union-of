import { CreatorsToType } from "./creators-to-type";
import { SchemaToCreators } from "./schema-to-creators";

export type SchemaToType<T> = CreatorsToType<SchemaToCreators<T>>;
