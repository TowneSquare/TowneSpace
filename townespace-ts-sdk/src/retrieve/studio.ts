/*
 **/

import {
  AccountAddressInput,
  Aptos,
  AptosConfig
} from "@aptos-labs/ts-sdk";
import { EVENTS_MODULE } from "../utils/module-endpoints";

interface getAccountEventsByEventTypeResponse {
  account_address: string;
  creation_number: any;
  data: any;
  event_index: any;
  indexed_type: string;
  sequence_number: any;
  transaction_block_height: any;
  transaction_version: any;
  type: string;
}

export class StudioEvents {
  readonly aptos: Aptos;

  constructor(readonly config: AptosConfig) {
    this.aptos = new Aptos(this.config);
  }

  async getCollectionCreatedEvent(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const collectionCreatedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::CollectionCreated`,
      minimumLedgerVersion: 0,
    });

    return collectionCreatedEvents; // Fix: Remove the empty square brackets
  }

  async getComposableMinted(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const composableMintedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableMinted`,
      minimumLedgerVersion: 0,
    });

    return composableMintedEvents;
  }

  async getTraitMinted(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const traitMintedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitMinted`,
      minimumLedgerVersion: 0,
    });

    return traitMintedEvents;
  }

  async getComposableBurned(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const composableBurnedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableBurned`,
      minimumLedgerVersion: 0,
    });

    return composableBurnedEvents;
  }

  async getTraitBurned(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const traitBurnedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitBurned`,
      minimumLedgerVersion: 0,
    });

    return traitBurnedEvents;
  }

  async getCompositionEvent(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const compositionEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::CompositionEvent`,
      minimumLedgerVersion: 0,
    });

    return compositionEvents;
  }

  async DecompositionEvent(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const decompositionEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::DecompositionEvent`,
      minimumLedgerVersion: 0,
    });

    return decompositionEvents;
  }

  async getComposableTransferredEvent(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const composableTransferredEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableTransferredEvent`,
      minimumLedgerVersion: 0,
    });

    return composableTransferredEvents;
  }

  async getTraitTransferredEvent(
    args: { accountAddress: AccountAddressInput }
  ): Promise<getAccountEventsByEventTypeResponse[]> {
    const traitTransferredEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitTransferredEvent`,
      minimumLedgerVersion: 0,
    });

    return traitTransferredEvents;
  }
}
