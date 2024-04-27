"use strict";
/*
 **/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Studio = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const utils_1 = require("../utils");
class Studio {
    constructor(config) {
        this.config = config;
        this.aptos = new ts_sdk_1.Aptos(this.config);
    }
    async getCollectionCreatedEvent(args) {
        const collectionCreatedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.STUDIO_MODULE}::CollectionCreatedEvent`,
            minimumLedgerVersion: 0,
        });
        return collectionCreatedEvents;
    }
    async getComposableMinted(args) {
        const composableMintedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.STUDIO_MODULE}::TokenCreatedEvent<${utils_1.ComposableType}>`,
            minimumLedgerVersion: 0,
        });
        return composableMintedEvents;
    }
    async getTraitMinted(args) {
        const traitMintedEvents = await this.aptos.getAccountEventsByEventType({
            accountAddress: args.accountAddress,
            eventType: `${utils_1.STUDIO_MODULE}::TokenCreatedEvent<${utils_1.TraitType}>`,
            minimumLedgerVersion: 0,
        });
        return traitMintedEvents;
    }
}
exports.Studio = Studio;
