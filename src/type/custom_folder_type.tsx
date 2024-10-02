import { NftMetadataType, TRAIT_NAME } from "./nft_type";

export default interface CustomFolderType {
    name: TRAIT_NAME;
    trait: NftMetadataType | undefined;
}