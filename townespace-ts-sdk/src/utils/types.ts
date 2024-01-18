import { STUDIO_MODULE } from "./module-endpoints";

export const PropertyTypeMap = {
  BOOLEAN: "bool",
  U8: "u8",
  U16: "u16",
  U32: "u32",
  U64: "u64",
  U128: "u128",
  U256: "u256",
  ADDRESS: "address",
  VECTOR: "vector<u8>",
  STRING: "string",
};

export type PropertyType = keyof typeof PropertyTypeMap;

export const CollectionType: string = `${STUDIO_MODULE}::Collection`;
export const ComposableType: string = `${STUDIO_MODULE}::Composable`;
export const TraitType: string = `${STUDIO_MODULE}::Trait`;
