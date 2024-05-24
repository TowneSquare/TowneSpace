import { Aptos, AptosConfig, GetEventsResponse } from '@aptos-labs/ts-sdk';
import {
  COLLECTION_CREATED,
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_CREATED,
  COMPOSABLE_TOKEN_TESTNET,
  DA_CREATED,
  TRAIT_EQUIPPED,
  TRAIT_TOKEN_CREATED,
  TRAIT_UNEQUIPPED,
} from '../constants';

export class Events {
  private aptos: Aptos;

  constructor(config: AptosConfig) {
    this.aptos = new Aptos(config);
  }

  /**
   * Get the events for the created collections
   */
  // :!:CollectionCreated
  async getCollectionCreatedEvents(): Promise<GetEventsResponse> {
    const collectionCreatedEvent = await this.aptos.getModuleEventsByEventType({
      eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${COLLECTION_CREATED}`,
      minimumLedgerVersion: 0,
    });

    return collectionCreatedEvent;
  }

  /**
   * Get the events for the created composable tokens
   */
  // :!:ComposableTokenCreated
  async getComposableTokenCreatedEvents(): Promise<GetEventsResponse> {
    const composableTokenCreatedEvent =
      await this.aptos.getModuleEventsByEventType({
        eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${COMPOSABLE_TOKEN_CREATED}`,
        minimumLedgerVersion: 0,
      });

    return composableTokenCreatedEvent;
  }

  /**
   * Get the events for the created trait tokens
   */
  // :!:TraitTokenCreated
  async getTraitTokenCreatedEvents(): Promise<GetEventsResponse> {
    const traitTokenCreatedEvent = await this.aptos.getModuleEventsByEventType({
      eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAIT_TOKEN_CREATED}`,
      minimumLedgerVersion: 0,
    });

    return traitTokenCreatedEvent;
  }

  /**
   * Get the events for the created digital assets
   */
  // :!:DigitalAssetCreated
  async getDigitalAssetCreatedEvents(): Promise<GetEventsResponse> {
    const digitalAssetCreatedEvent =
      await this.aptos.getModuleEventsByEventType({
        eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${DA_CREATED}`,
        minimumLedgerVersion: 0,
      });

    return digitalAssetCreatedEvent;
  }

  /**
   * Get the events for the equipped traits
   */
  // :!:TraitEquipped
  async getTraitEquippedEvents(): Promise<GetEventsResponse> {
    const traitEquippedEvent = await this.aptos.getModuleEventsByEventType({
      eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAIT_EQUIPPED}`,
      minimumLedgerVersion: 0,
    });

    return traitEquippedEvent;
  }

  /**
   * Get the events for the unequipped traits
   */
  // :!:TraitUnequipped
  async getTraitUnequippedEvents(): Promise<GetEventsResponse> {
    const traitUnequippedEvent = await this.aptos.getModuleEventsByEventType({
      eventType: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAIT_UNEQUIPPED}`,
      minimumLedgerVersion: 0,
    });

    return traitUnequippedEvent;
  }
}
