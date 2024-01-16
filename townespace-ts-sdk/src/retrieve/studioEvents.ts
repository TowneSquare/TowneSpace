/*
 **/

import {
  AccountAddress,
  Aptos,
  AptosConfig,
  GetEventsResponse,
} from "@aptos-labs/ts-sdk";
import { EVENTS_MODULE } from "../utils/module-endpoints";

export class StudioEvents {
  readonly aptos: Aptos;

  constructor(readonly config: AptosConfig) {
    this.aptos = new Aptos(this.config);
  }

  async getCollectionCreatedEvent(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const collectionCreatedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::CollectionCreated`,
      minimumLedgerVersion: 0,
    });

    return collectionCreatedEvents;
  }

  async getComposableMinted(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const composableMintedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableMinted`,
      minimumLedgerVersion: 0,
    });

    return composableMintedEvents;
  }

  async getTraitMinted(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const traitMintedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitMinted`,
      minimumLedgerVersion: 0,
    });

    return traitMintedEvents;
  }

  async getComposableBurned(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const composableBurnedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableBurned`,
      minimumLedgerVersion: 0,
    });

    return composableBurnedEvents;
  }

  async getTraitBurned(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const traitBurnedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitBurned`,
      minimumLedgerVersion: 0,
    });

    return traitBurnedEvents;
  }

  async getCompositionEvent(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const compositionEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::CompositionEvent`,
      minimumLedgerVersion: 0,
    });

    return compositionEvents;
  }

  async DecompositionEvent(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const decompositionEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::DecompositionEvent`,
      minimumLedgerVersion: 0,
    });

    return decompositionEvents;
  }

  async getComposableTransferredEvent(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const composableTransferredEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::ComposableTransferredEvent`,
      minimumLedgerVersion: 0,
    });

    return composableTransferredEvents;
  }

  async getTraitTransferredEvent(
    args: { accountAddress: AccountAddress }
  ): Promise<GetEventsResponse> {
    const traitTransferredEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${EVENTS_MODULE}::TraitTransferredEvent`,
      minimumLedgerVersion: 0,
    });

    return traitTransferredEvents;
  }
}
