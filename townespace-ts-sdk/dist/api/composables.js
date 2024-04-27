"use strict";
/*
 **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.composables = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const utils_1 = require("../utils");
class composables {
    constructor(config) {
        this.config = config;
        this.aptos = new ts_sdk_1.Aptos(this.config);
    }
    async getCollectionCreatedEvent(args) {
        const collectionCreatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::CollectionCreatedEvent`,
            minimumLedgerVersion: 0,
        });
        return collectionCreatedEvents;
    }
    async getTokenBurnedEvent(args) {
        const tokenBurnedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TokenBurnedEvent`,
            minimumLedgerVersion: 0,
        });
        return tokenBurnedEvents;
    }
    async getTokenDescriptionUpdatedEvent(args) {
        const tokenDescriptionUpdatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TokenDescriptionUpdatedEvent`,
            minimumLedgerVersion: 0,
        });
        return tokenDescriptionUpdatedEvents;
    }
    async getTokenNameUpdatedEvent(args) {
        const tokenNameUpdatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TokenNameUpdatedEvent`,
            minimumLedgerVersion: 0,
        });
        return tokenNameUpdatedEvents;
    }
    async getTokenUriUpdatedEvent(args) {
        const tokenUriUpdatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TokenUriUpdatedEvent`,
            minimumLedgerVersion: 0,
        });
        return tokenUriUpdatedEvents;
    }
    async getPropertyAddedEvent(args) {
        const propertyAddedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::PropertyAddedEvent`,
            minimumLedgerVersion: 0,
        });
        return propertyAddedEvents;
    }
    async getTypedPropertyAddedEvent(args) {
        const typedPropertyAddedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TypedPropertyAddedEvent`,
            minimumLedgerVersion: 0,
        });
        return typedPropertyAddedEvents;
    }
    async getPropertRemovedEvent(args) {
        const propertyRemovedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::PropertyRemovedEvent`,
            minimumLedgerVersion: 0,
        });
        return propertyRemovedEvents;
    }
    async getPropertyUpdatedEvent(args) {
        const propertyUpdatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::PropertyUpdatedEvent`,
            minimumLedgerVersion: 0,
        });
        return propertyUpdatedEvents;
    }
    async getComposableCreatedEvent(args) {
        const composableCreatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::ComposableCreatedEvent`,
            minimumLedgerVersion: 0,
        });
        return composableCreatedEvents;
    }
    async getTraitCreatedEvent(args) {
        const traitCreatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TraitCreatedEvent`,
            minimumLedgerVersion: 0,
        });
        return traitCreatedEvents;
    }
    async getTraitEquippedEvent(args) {
        const traitEquippedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TraitEquippedEvent`,
            minimumLedgerVersion: 0,
        });
        return traitEquippedEvents;
    }
    async getTraitUnequippedEvent(args) {
        const traitUnequippedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TraitUnequippedEvent`,
            minimumLedgerVersion: 0,
        });
        return traitUnequippedEvents;
    }
    async getFAEquippedEvent(args) {
        const faEquippedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::FAEquippedEvent`,
            minimumLedgerVersion: 0,
        });
        return faEquippedEvents;
    }
    async getFAUnequippedEvent(args) {
        const faUnequippedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::FAUnequippedEvent`,
            minimumLedgerVersion: 0,
        });
        return faUnequippedEvents;
    }
    async getTokenTransferredEvent(args) {
        const tokenTransferredEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TokenTransferredEvent`,
            minimumLedgerVersion: 0,
        });
        return tokenTransferredEvents;
    }
    async getFATransferredEvent(args) {
        const faTransferredEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::FATransferredEvent`,
            minimumLedgerVersion: 0,
        });
        return faTransferredEvents;
    }
    async getTransferFrozenEvent(args) {
        const transferFrozenEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TransferFrozenEvent`,
            minimumLedgerVersion: 0,
        });
        return transferFrozenEvents;
    }
    async getTransferUnfrozenEvent(args) {
        const transferUnfrozenEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.COMPOSABLES_MODULE}::TransferUnfrozenEvent`,
            minimumLedgerVersion: 0,
        });
        return transferUnfrozenEvents;
    }
}
exports.composables = composables;
