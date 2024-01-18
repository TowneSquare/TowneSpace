/*
 **/

import {
  AccountAddress,
  Aptos,
  AptosConfig,
  GetEventsResponse,
} from "@aptos-labs/ts-sdk";
import { COMPOSABLES_MODULE } from "../utils";

export class composables {
  readonly aptos: Aptos;

  constructor(readonly config: AptosConfig) {
    this.aptos = new Aptos(this.config);
  }

  async getCollectionCreatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const collectionCreatedEvents =
      await this.aptos.getAccountEventsByEventType({
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::CollectionCreatedEvent`,
        minimumLedgerVersion: 0,
      });

    return collectionCreatedEvents;
  }

  async getTokenBurnedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const tokenBurnedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TokenBurnedEvent`,
      minimumLedgerVersion: 0,
    });

    return tokenBurnedEvents;
  }

  async getTokenDescriptionUpdatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const tokenDescriptionUpdatedEvents =
      await this.aptos.getAccountEventsByEventType({
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::TokenDescriptionUpdatedEvent`,
        minimumLedgerVersion: 0,
      });

    return tokenDescriptionUpdatedEvents;
  }

  async getTokenNameUpdatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const tokenNameUpdatedEvents = await this.aptos.getAccountEventsByEventType(
      {
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::TokenNameUpdatedEvent`,
        minimumLedgerVersion: 0,
      },
    );

    return tokenNameUpdatedEvents;
  }

  async getTokenUriUpdatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const tokenUriUpdatedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TokenUriUpdatedEvent`,
      minimumLedgerVersion: 0,
    });

    return tokenUriUpdatedEvents;
  }

  async getPropertyAddedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const propertyAddedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::PropertyAddedEvent`,
      minimumLedgerVersion: 0,
    });

    return propertyAddedEvents;
  }

  async getTypedPropertyAddedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const typedPropertyAddedEvents =
      await this.aptos.getAccountEventsByEventType({
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::TypedPropertyAddedEvent`,
        minimumLedgerVersion: 0,
      });

    return typedPropertyAddedEvents;
  }

  async getPropertRemovedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const propertyRemovedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::PropertyRemovedEvent`,
      minimumLedgerVersion: 0,
    });

    return propertyRemovedEvents;
  }

  async getPropertyUpdatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const propertyUpdatedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::PropertyUpdatedEvent`,
      minimumLedgerVersion: 0,
    });

    return propertyUpdatedEvents;
  }

  async getComposableCreatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const composableCreatedEvents =
      await this.aptos.getAccountEventsByEventType({
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::ComposableCreatedEvent`,
        minimumLedgerVersion: 0,
      });

    return composableCreatedEvents;
  }

  async getTraitCreatedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const traitCreatedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TraitCreatedEvent`,
      minimumLedgerVersion: 0,
    });

    return traitCreatedEvents;
  }

  async getTraitEquippedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const traitEquippedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TraitEquippedEvent`,
      minimumLedgerVersion: 0,
    });

    return traitEquippedEvents;
  }

  async getTraitUnequippedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const traitUnequippedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TraitUnequippedEvent`,
      minimumLedgerVersion: 0,
    });

    return traitUnequippedEvents;
  }

  async getFAEquippedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const faEquippedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::FAEquippedEvent`,
      minimumLedgerVersion: 0,
    });

    return faEquippedEvents;
  }

  async getFAUnequippedEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const faUnequippedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::FAUnequippedEvent`,
      minimumLedgerVersion: 0,
    });

    return faUnequippedEvents;
  }

  async getTokenTransferredEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const tokenTransferredEvents = await this.aptos.getAccountEventsByEventType(
      {
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::TokenTransferredEvent`,
        minimumLedgerVersion: 0,
      },
    );

    return tokenTransferredEvents;
  }

  async getFATransferredEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const faTransferredEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::FATransferredEvent`,
      minimumLedgerVersion: 0,
    });

    return faTransferredEvents;
  }

  async getTransferFrozenEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const transferFrozenEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${COMPOSABLES_MODULE}::TransferFrozenEvent`,
      minimumLedgerVersion: 0,
    });

    return transferFrozenEvents;
  }

  async getTransferUnfrozenEvent(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const transferUnfrozenEvents = await this.aptos.getAccountEventsByEventType(
      {
        accountAddress: args.accountAddress,
        eventType: `${COMPOSABLES_MODULE}::TransferUnfrozenEvent`,
        minimumLedgerVersion: 0,
      },
    );

    return transferUnfrozenEvents;
  }
}
