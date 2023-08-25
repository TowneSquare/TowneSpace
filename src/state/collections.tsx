import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";

const getCollections = (filter?: string) => {
   if(filter != undefined)   
      return COLLECTIONS.filter((e) => e.collection.includes(filter))
   return COLLECTIONS;
};
export default getCollections;

const COLLECTIONS: NftMetadataType[] = [
   {
      collection: "SIOthians",
      description: "",
      name: "",
      uri: "/mytokens/collections/siothians.png",
      type: NftType.nft
   },
   {
      collection: "AptosMonekys",
      description: "",
      name: "",
      uri: "/mytokens/collections/aptosmonekys.png",
      type: NftType.nft
   }, 
   {
      collection: "Aptoads",
      description: "",
      name: "",
      uri: "/mytokens/collections/aptoads.png",
      type: NftType.nft
   }, 
   {
      collection: "METAPIXEL Early Adopter ...",
      description: "",
      name: "",
      uri: "/mytokens/collections/metapixel.png",
      type: NftType.nft
   }
]
