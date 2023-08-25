export enum NftType{
   nft = 0x01,
   nftv2 = 0x02
}
export interface NftMetadataType{
   address: string,
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

