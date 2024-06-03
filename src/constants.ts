/** 
 * ========
 * PACKAGES
 * ========
 */

/** TESTNET */

export const COMPOSABLE_TOKEN_TESTNET = '0x69ef0832ab2fba22869ad8c174f5a8872d3d2f16b941bf7a36916c00f7f8c6c6'
export const TOKEN_MINTER_TESTNET = '0xf50bac511401dd7671108053e71ee3b5a60aef091c3c959eb8b47cb217945af3'
export const TOWNESPACE_TESTNET = '0x709e7e45a7b0c4349f2ce17762c4432bdf0cae65ce4b3e6905c17b76c6144680'

/** MAINNET */

export const COMPOSABLE_TOKEN_MAINNET = '';
export const TOKEN_MINTER_MAINNET = '';
export const TOWNESPACE_MAINNET = '';


/** 
 * =======
 * MODULES
 * =======
*/

/** Composable Token */
export const COMPOSABLE_TOKEN = `composable_token`;
export const STUDIO = `studio`;

/** Townespace */

export const TOWNESPACE_STUDIO = `studio`
export const RANDOM_MINT = `random_mint`
export const BATCH_MINT = `batch_mint`

/** Token Minter */

/** 
 * =========
 * ENDPOINTS
 * =========
*/

/** TESTNET */
export const COMPOSABLE_TOKEN_ENDPOINT_TESTNET = COMPOSABLE_TOKEN_TESTNET + `::` + COMPOSABLE_TOKEN

/** MAINNET */
export const COMPOSABLE_TOKEN_ENDPOINT_MAINNET = COMPOSABLE_TOKEN_MAINNET + `::` + COMPOSABLE_TOKEN

/** 
 * =====
 * TYPES
 * =====
*/

//
// TODO: update when on mainnet!
// 
export const CNFT_COLLECTION =  COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Collection`
export const COMPOSABLE_TOKEN_TYPE = COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Composable`
export const TRAIT_TOKEN_TYPE = COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::Trait`
export const DIGITAL_ASSET_TYPE = COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::DA`
export const FUNGIBLE_ASSET_TYPE = COMPOSABLE_TOKEN_ENDPOINT_TESTNET + `::FA`

/** 
 * =========
 * READ APIs
 * =========
 */

/** Composable Token */
export const COLLECTION_NAME = `collection_name`
export const COLLECTION_SYMBOL = `collection_symbol`
export const COLLECTION_SUPPLY_TYPE = `collection_supply_type`

export const PARENT_TOKEN_OBJECT = `parent_token`
export const PARENTS_TOKENS_OBJECTS = `parents_tokens`
export const TOKEN_INDEX = `index`
export const TRAITS_FROM_COMPOSABLE = `traits_from_composable`

export const IDENTIFY_OBJECT = `object_type`
export const IDENTIFY_OBJECTS = `object_types`

/** Townespace */

/** Token Minter */

/**
 * =========
 * WRITE APIs
 * =========
 */

/** Composable Token */
export const CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_ROYALTY = `create_collection_with_fixed_supply_and_royalty`
export const CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_NO_ROYALTY = `create_collection_with_fixed_supply_and_no_royalty`
export const CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_ROYALTY = `create_collection_with_unlimited_supply_and_royalty`
export const CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_NO_ROYALTY = `create_collection_with_unlimited_supply_and_no_royalty`

export const EQUIP_TRAIT = `equip_trait`
export const EQUIP_TRAITS = `equip_traits`
export const UNEQUIP_TRAIT = `unequip_trait`
export const UNEQUIP_TRAITS = `unequip_traits`

export const DECOMPOSE_ENTIRE_COMPOSABLE_TOKEN = `decompose_entire_composable_token`

/** Townespace */
export const MINT_TOKENS = `mint_tokens`

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
