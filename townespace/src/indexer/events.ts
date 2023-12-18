/*
**/

import { Aptos, AptosConfig, Network, OrderByArg, PaginationArgs } from "@aptos-labs/ts-sdk";
import { Address } from "aptos/src/generated";
import { EVENTS_MODULE } from "../utils/module-endpoints";


// an optional config information for the SDK client instance.
const config = new AptosConfig({ network: Network.LOCAL }); // default network is devnet
const aptos = new Aptos(config);

interface AccountEventsArgs {
    accountAddress: Address;
    eventType: string;
    minimumLedgerVersion?: number;
    options?: PaginationArgs & OrderByArg<{
      account_address: string;
      creation_number: any;
      data: any;
      event_index: any;
      indexed_type: string;
      sequence_number: any;
      transaction_block_height: any;
      transaction_version: any;
      type: string;
    }>;
}

interface getAccountEventsByEventTypeRespomse {
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

export class Events {
    async getCollectionCreatedEvent(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let collectionCreatedEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::CollectionCreated`,
            minimumLedgerVersion: 0
        });

        return collectionCreatedEvents; // Fix: Remove the empty square brackets
    }

    async getComposableMinted(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let composableMintedEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::ComposableMinted`,
            minimumLedgerVersion: 0
        });

        return composableMintedEvents;
    }

    async getTraitMinted(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let traitMintedEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::TraitMinted`,
            minimumLedgerVersion: 0
        });

        return traitMintedEvents;
    }

    async getComposableBurned(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let composableBurnedEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::ComposableBurned`,
            minimumLedgerVersion: 0
        });

        return composableBurnedEvents;
    }

    async getTraitBurned(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let traitBurnedEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::TraitBurned`,
            minimumLedgerVersion: 0
        });

        return traitBurnedEvents;
    }

    async getCompositionEvent(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let compositionEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::CompositionEvent`,
            minimumLedgerVersion: 0
        });

        return compositionEvents;
    }

    async DecompositionEvent(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let decompositionEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::DecompositionEvent`,
            minimumLedgerVersion: 0
        });

        return decompositionEvents;
    }

    async getComposableTransferredEvent(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let composableTransferredEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::ComposableTransferredEvent`,
            minimumLedgerVersion: 0
        });

        return composableTransferredEvents;
    }

    async getTraitTransferredEvent(accountAddress: Address): Promise<getAccountEventsByEventTypeRespomse[]> {
        let traitTransferredEvents = await aptos.getAccountEventsByEventType({
            accountAddress: accountAddress,
            eventType: `${EVENTS_MODULE}::TraitTransferredEvent`,
            minimumLedgerVersion: 0
        });

        return traitTransferredEvents;
    }
}