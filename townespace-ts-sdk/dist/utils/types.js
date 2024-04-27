"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraitType = exports.ComposableType = exports.CollectionType = exports.PropertyTypeMap = void 0;
const module_endpoints_1 = require("./module-endpoints");
exports.PropertyTypeMap = {
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
exports.CollectionType = `${module_endpoints_1.STUDIO_MODULE}::Collection`;
exports.ComposableType = `${module_endpoints_1.STUDIO_MODULE}::Composable`;
exports.TraitType = `${module_endpoints_1.STUDIO_MODULE}::Trait`;
