import { NftMetadataType, NftType } from "../type/nft_type";

export const NFTS: NftMetadataType[] = [
   {
      address: "0x01",
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      type: NftType.nft,
      price: 13.0245
   },
   {
      address: "0x02",
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x03",
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x04",
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x05",
      collection: "SIOthians",
      description: "",
      name: "SIothian #9898",
      uri: "/nft-card/queen.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x06",
      collection: "AptosMonkeys",
      description: "",
      name: "AptosMonkeys #1000",
      uri: "/mytokens/collections/aptosmonekys.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x07",
      collection: "Aptoads",
      description: "",
      name: "Aptoads #9898",
      uri: "/mytokens/collections/aptoads.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
   {
      address: "0x08",
      collection: "metapixel",
      description: "",
      name: "METAPIXEL #9898",
      uri: "/mytokens/collections/metapixel.png",
      object_tokens: [1, 2],
      type: NftType.nftv2,
      price: 13.0245
   },
]


export const COLLECTIONS: NftMetadataType[] = [
   {
      address: "0x01",
      collection: "SIOthians",
      description: "",
      name: "SIOthians",
      uri: "/mytokens/collections/siothians.png",
      type: NftType.nft
   },
   {
      address: "0x02",
      collection: "AptosMonkeys",
      description: "",
      name: "AptosMonkeys",
      uri: "/mytokens/collections/aptosmonekys.png",
      type: NftType.nft
   },
   {
      address: "0x03",
      collection: "Aptoads",
      description: "",
      name: "Aptoads",
      uri: "/mytokens/collections/aptoads.png",
      type: NftType.nft
   },
   {
      address: "0x04",
      collection: "metapixel",
      description: "",
      name: "METAPIXEL Early Adopter ...",
      uri: "/mytokens/collections/metapixel.png",
      type: NftType.nft
   }
]
