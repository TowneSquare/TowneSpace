import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";

const getNfts = async (filter: FilterType) => {
   if (filter == FilterType.nft)
      return NFTS.filter((e) => e.type == NftType.nft)
   else if (filter == FilterType.nftv2)
      return NFTS.filter((e) => e.type == NftType.nftv2)
   else
      return NFTS;
};
export default getNfts;

const NFTS: NftMetadataType[] = [
   {
      collection: "CryptoBananas",
      description: "",
      name: "cBanana #9898",
      uri: "",
      type: NftType.nft,
      price: 8990
   },
   {
      collection: "CryptoBananas",
      description: "",
      name: "cBanana #9898",
      uri: "",
      type: NftType.nftv2,
      price: 8990
   },
   {
      collection: "CryptoBananas",
      description: "",
      name: "cBanana #9898",
      uri: "",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 8990
   },
   {
      collection: "CryptoBananas",
      description: "",
      name: "cBanana #9898",
      uri: "",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 8990
   },
   {
      collection: "CryptoBananas",
      description: "",
      name: "cBanana #9898",
      uri: "",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 8990
   },
]
