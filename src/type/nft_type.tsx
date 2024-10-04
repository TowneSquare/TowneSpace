import { TokenFields } from '../api/queries';

export type NftMetadataType = TokenFields;

export enum TRAIT_NAME {
  BACKGROUND = "Background",
  BODY = "Body",
  MOUTH = "Mouth",
  EYES = "Eyes",
  HATS = "Hats",
  CLOTHING = "Clothing",
  BADGES = "Badge",
  NO_TRAIT = ""
}

export enum NFT_TYPE {
  TRAIT = "trait",
  COMPOSABLE = "composable"
}