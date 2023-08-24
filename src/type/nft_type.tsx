export enum NftType{
   nft,
   nftv2
}
export interface NftMetadataType{
   creator?: any,
   collection: string,
   description: string,
   name: string,
   uri: string,
   total_supply?: number,  // objects supply must be less or equal than token supply
   object_tokens?: any[],
   property_keys?: any[],
   property_types?: any[],
   property_values?: number[][],
   seed?: number[] // used when auid is disabled.
   type: NftType,
   price?: number
}

