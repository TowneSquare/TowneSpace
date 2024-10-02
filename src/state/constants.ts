import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { Network } from 'aptos';

import { NftMetadataType } from '../type/nft_type';

export const APTOS_CONFIG = new AptosConfig({ network: Network.MAINNET });
export const APTOS = new Aptos(APTOS_CONFIG);

export const NFTS: NftMetadataType[] = [];

export const COLLECTIONS: NftMetadataType[] = [];
export const TRAITS: NftMetadataType[] = [];
