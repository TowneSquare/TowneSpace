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
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      type: NftType.nft,
      price: 13.0245
   },
   {
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
]
