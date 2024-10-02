import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { Network } from 'aptos';
import { PinataSDK } from 'pinata-web3';
import dotenv from 'dotenv';
//dotenv.config();

/**
 * ========
 * PACKAGES
 * ========
 */

/** TESTNET */

export const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
export const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

export const COMPOSABLE_TOKEN_TESTNET =
  '0x5fe4421182921f3f4c847bb30127e25138ef463455c5981e7726fa08ce42855e';
export const TOKEN_MINTER_TESTNET =
  '0xa89295004505a2394a3ed756dec801f7579c3484c499973a4b28eb071419abd6';
export const TOWNESPACE_TESTNET =
  '0xefb8cb1a3a6a05f065d05fedd857e3683837de3949581d362ce3b59471cebb63';

/** MAINNET */

export const COMPOSABLE_TOKEN_MAINNET =
  '0xd758b832d4d8fcad58ac7363a6b87af342a6e0dfd25897aa65233c606526e8f4';
export const TOKEN_MINTER_MAINNET =
  '0x5ca749c835f44a9a9ff3fb0bec1f8e4f25ee09b424f62058c561ca41ec6bb146';
export const TOWNESPACE_MAINNET =
  '0xd85adb3c424c398d5017ad1d20b63ce8b3373a651a484ff2b473aa93d3357296';

/**
 * =======
 * MODULES
 * =======
 */

/** Composable Token */
export const COMPOSABLE_TOKEN = `composable_token`;
export const COMPOSABLE_TOKEN_ENTRY = `composable_token_entry`;

/** Townespace */

export const TOWNESPACE_STUDIO = `studio`;
export const RANDOM_MINT = `random_mint`;
// TODO: delete
export const BATCH_MINT = `batch_mint`;

/** Token Minter */

/**
 * =========
 * ENDPOINTS
 * =========
 */

/** TESTNET */
export const COMPOSABLE_TOKEN_ENDPOINT_TESTNET =
  COMPOSABLE_TOKEN_TESTNET + `::` + COMPOSABLE_TOKEN;

/** MAINNET */
export const COMPOSABLE_TOKEN_ENDPOINT_MAINNET =
  COMPOSABLE_TOKEN_MAINNET + `::` + COMPOSABLE_TOKEN;

/**
 * =====
 * TYPES
 * =====
 */

//
// TODO: update when on mainnet!
//
export const CNFT_COLLECTION_TESTNET =
  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Collection`;
export const COMPOSABLE_TOKEN_TYPE_TESTNET =
  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Composable`;
export const TRAIT_TOKEN_TYPE_TESTNET =
  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Trait`;
export const DIGITAL_ASSET_TYPE_TESTNET =
  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::DA`;
export const FUNGIBLE_ASSET_TYPE_TESTNET =
  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::FA`;

export const CNFT_COLLECTION_MAINNET =
  COMPOSABLE_TOKEN_ENDPOINT_MAINNET + `::Collection`;
export const COMPOSABLE_TOKEN_TYPE_MAINNET =
  COMPOSABLE_TOKEN_ENDPOINT_MAINNET + `::Composable`;
export const TRAIT_TOKEN_TYPE_MAINNET =
  COMPOSABLE_TOKEN_ENDPOINT_MAINNET + `::Trait`;
export const DIGITAL_ASSET_TYPE_MAINNET =
  COMPOSABLE_TOKEN_ENDPOINT_MAINNET + `::DA`;
export const FUNGIBLE_ASSET_TYPE_MAINNET =
  COMPOSABLE_TOKEN_ENDPOINT_MAINNET + `::FA`;

/**
 * =========
 * READ APIs
 * =========
 */

/** Composable Token */
export const COLLECTION_NAME = `collection_name`;
export const COLLECTION_SYMBOL = `collection_symbol`;
export const COLLECTION_SUPPLY_TYPE = `collection_supply_type`;

export const PARENT_TOKEN_OBJECT = `parent_token`;
export const PARENTS_OBJECTS = `parents_by_address`;
export const TOKEN_INDEX = `index`;
export const TRAITS_FROM_COMPOSABLE = `traits_from_composable`;

export const IDENTIFY_OBJECT = `object_type`;
export const IDENTIFY_OBJECTS = `object_types`;

/** Townespace */
export const OWNED_TOKENS = `owned_tokens`;

/** Token Minter */

/**
 * =========
 * WRITE APIs
 * =========
 */

/** Composable Token */
export const CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_ROYALTY = `create_collection_with_fixed_supply_and_royalty`;
export const CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_NO_ROYALTY = `create_collection_with_fixed_supply_and_no_royalty`;
export const CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_ROYALTY = `create_collection_with_unlimited_supply_and_royalty`;
export const CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_NO_ROYALTY = `create_collection_with_unlimited_supply_and_no_royalty`;

export const EQUIP_TRAIT = `equip_trait`;
export const EQUIP_TRAITS = `equip_traits`;
export const UNEQUIP_TRAIT = `unequip_trait`;
export const UNEQUIP_TRAITS = `unequip_traits`;
export const REPLACE_TRAITS = `replace_traits_of_composable`;

export const DECOMPOSE_ENTIRE_COMPOSABLE_TOKEN = `decompose_entire_composable_token`;

/** Townespace */
export const MINT_TOKENS = `mint_tokens`;

/** Token Minter */

/**
 * ======
 * EVENTS
 * ======
 */

/** Composable Token */
export const COLLECTION_CREATED = `CollectionCreatedEvent`;
export const COMPOSABLE_TOKEN_CREATED = `ComposableCreatedEvent`;
export const TRAIT_TOKEN_CREATED = `TraitCreatedEvent`;
export const DA_CREATED = `DACreatedEvent`;

export const TRAIT_EQUIPPED = `TraitEquippedEvent`;
export const TRAIT_UNEQUIPPED = `TraitUnequippedEvent`;
export const DA_EQUIPPED = `DigitalAssetEquippedEvent`;
export const DA_UNEQUIPPED = `DigitalAssetUnequippedEvent`;
export const FA_EQUIPPED = `FAEquippedEvent`;
export const FA_UNEQUIPPED = `FAUnequippedEvent`;
export const FA_TRANSFERRED = `FATransferredEvent`;

export const TRANSFER_FROZEN = `TransferFrozenEvent`;
export const TRANSFER_UNFROZEN = `TransferUnfrozenEvent`;

export const TOKEN_BURNED = `TokenBurnedEvent`;
export const TOKEN_DESCRIPTION_UPDATED = `TokenDescriptionUpdatedEvent`;
export const TOKEN_NAME_UPDATED = `TokenNameUpdatedEvent`;
export const TOKEN_URI_UPDATED = `TokenUriUpdatedEvent`;
export const PROPERTY_ADDED = `PropertyAddedEvent`;
export const TYPED_PROPERTY_ADDED = `TypedPropertyAddedEvent`;
export const PROPERTY_REMOVED = `PropertyRemovedEvent`;
export const PROPERTY_UPDATED = `PropertyUpdatedEvent`;

/** Townespace */

/** Token Minter */

export const PINATA = new PinataSDK({
  pinataJwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2OTBkZjc0ZS0wZjhkLTQ5Y2UtOWQ5My1lZjczMmQzZjZmNTkiLCJlbWFpbCI6InRvd25lc3F1YXJldWkyMDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1MzEwYzZiZjE3OTQxYTA4OGNkOSIsInNjb3BlZEtleVNlY3JldCI6ImEyODZiYTJlNzk5ODFjZDMwZjc5MTgyOTY5MzBkMDBiYzkyM2I5MTg4NDIyZjNhN2JiOWRiNzY5NDJjOTg5YWYiLCJleHAiOjE3NTg1NjYzMjN9.iNvmGHdZX2YseEk9iZvN_8itTMtcU_ZzGbUAj4njkMw',
  pinataGateway: 'https://aquamarine-electoral-hyena-268.mypinata.cloud/ipfs',
});

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const APTOS = new Aptos(aptosConfig);
