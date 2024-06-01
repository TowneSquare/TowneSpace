import { NftMetadataType } from "./nft_type";

export default interface CustomFolderType {
    name: string;
    trait: NftMetadataType | undefined;
}