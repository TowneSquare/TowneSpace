/*
 **/

import {
  AccountAddress,
  Aptos,
  AptosConfig,
  GetEventsResponse,
} from "@aptos-labs/ts-sdk";
import { ComposableType, STUDIO_MODULE, TraitType } from "../utils";

export class Studio {
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
        eventType: `${STUDIO_MODULE}::CollectionCreatedEvent`,
        minimumLedgerVersion: 0,
      });

    return collectionCreatedEvents;
  }

  async getComposableMinted(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const composableMintedEvents = await this.aptos.getAccountEventsByEventType(
      {
        accountAddress: args.accountAddress,
        eventType: `${STUDIO_MODULE}::TokenCreatedEvent<${ComposableType}>`,
        minimumLedgerVersion: 0,
      },
    );

    return composableMintedEvents;
  }

  async getTraitMinted(args: {
    accountAddress: AccountAddress;
  }): Promise<GetEventsResponse> {
    const traitMintedEvents = await this.aptos.getAccountEventsByEventType({
      accountAddress: args.accountAddress,
      eventType: `${STUDIO_MODULE}::TokenCreatedEvent<${TraitType}>`,
      minimumLedgerVersion: 0,
    });

    return traitMintedEvents;
  }
}
