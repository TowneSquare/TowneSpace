/* eslint-disable no-mixed-spaces-and-tabs */
/**
 */

import { STUDIO_MODULE } from "../utils/module-endpoints";
import { 
	Account, 
	Aptos, 
	MoveAddressType, 
	MoveObjectType, 
	MoveString,
	MoveUint64Type,
	Bool,
	MoveUint8Type
} from "@aptos-labs/ts-sdk";

export class Studio {

	async create_collection_with_fixed_supply_and_royalty(
		aptos: Aptos,
		deployer: Account,
		description: MoveString,
		max_supply: MoveUint64Type,
		name: MoveString,
		symbol: MoveString,
		uri: MoveString,
		mutable_description: Bool,
		mutable_royalty: Bool,
		mutable_uri: Bool,
		mutable_token_description: Bool,
		mutable_token_name: Bool,
		mutable_token_properties: Bool,
		mutable_token_uri: Bool,
		tokens_burnable_by_creator: Bool,
		tokens_freezable_by_creator: Bool,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_collection_with_fixed_supply_and_royalty`,
				functionArguments: [
					description,
					max_supply,
					name,
					symbol,
					uri,
					mutable_description,
					mutable_royalty,
					mutable_uri,
					mutable_token_description,
					mutable_token_name,
					mutable_token_properties,
					mutable_token_uri,
					tokens_burnable_by_creator,
					tokens_freezable_by_creator,
					royalty_numerator,
					royalty_denominator
				],
			},
		});

		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Collection created with fixed supply and royalty on. - ", response.hash);
		return response.hash;
	}

	async create_collection_with_fixed_supply_and_no_royalty(
		aptos: Aptos,
		deployer: Account,
		description: MoveString,
		max_supply: MoveUint64Type,
		name: MoveString,
		symbol: MoveString,
		uri: MoveString,
		mutable_description: Bool,
		mutable_royalty: Bool,
		mutable_uri: Bool,
		mutable_token_description: Bool,
		mutable_token_name: Bool,
		mutable_token_properties: Bool,
		mutable_token_uri: Bool,
		tokens_burnable_by_creator: Bool,
		tokens_freezable_by_creator: Bool,
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_collection_with_fixed_supply_and_no_royalty`,
				functionArguments: [
					description,
					max_supply,
					name,
					symbol,
					uri,
					mutable_description,
					mutable_royalty,
					mutable_uri,
					mutable_token_description,
					mutable_token_name,
					mutable_token_properties,
					mutable_token_uri,
					tokens_burnable_by_creator,
					tokens_freezable_by_creator
				],
			},
		});

		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Collection created with fixed supply and no royalty on. - ", response.hash);
		return response.hash;
	}

	async create_collection_with_unlimited_supply_and_royalty(
		aptos: Aptos,
		deployer: Account,
		description: MoveString,
		name: MoveString,
		symbol: MoveString,
		uri: MoveString,
		mutable_description: Bool,
		mutable_royalty: Bool,
		mutable_uri: Bool,
		mutable_token_description: Bool,
		mutable_token_name: Bool,
		mutable_token_properties: Bool,
		mutable_token_uri: Bool,
		tokens_burnable_by_creator: Bool,
		tokens_freezable_by_creator: Bool,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_collection_with_unlimited_supply_and_royalty`,
				functionArguments: [
					description,
					name,
					symbol,
					uri,
					mutable_description,
					mutable_royalty,
					mutable_uri,
					mutable_token_description,
					mutable_token_name,
					mutable_token_properties,
					mutable_token_uri,
					tokens_burnable_by_creator,
					tokens_freezable_by_creator,
					royalty_numerator,
					royalty_denominator
				],
			},
		});

		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Collection created with unlimited supply and royalty on. - ", response.hash);
		return response.hash;
	}
	
	async create_collection_with_unlimited_supply_and_no_royalty(
		aptos: Aptos,
		deployer: Account,
		description: MoveString,
		name: MoveString,
		symbol: MoveString,
		uri: MoveString,
		mutable_description: Bool,
		mutable_royalty: Bool,
		mutable_uri: Bool,
		mutable_token_description: Bool,
		mutable_token_name: Bool,
		mutable_token_properties: Bool,
		mutable_token_uri: Bool,
		tokens_burnable_by_creator: Bool,
		tokens_freezable_by_creator: Bool,
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_collection_with_unlimited_supply_and_no_royalty`,
				functionArguments: [
					description,
					name,
					symbol,
					uri,
					mutable_description,
					mutable_royalty,
					mutable_uri,
					mutable_token_description,
					mutable_token_name,
					mutable_token_properties,
					mutable_token_uri,
					tokens_burnable_by_creator,
					tokens_freezable_by_creator
				],
			},
		});

		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Collection created with unlimited supply and no royalty on. - ", response.hash);
		return response.hash;
	}
	
	async create_named_composable_token_with_no_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveAddressType,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_named_composable_token_with_no_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					property_keys,
					property_types,
					property_values
				],
			},
		});

		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Named composable token with no royalty created. - ", response.hash);
		return response.hash;
	}

	async create_named_composable_token_with_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveAddressType,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_named_composable_token_with_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					royalty_numerator,
					royalty_denominator,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Named composable token with royalty created. - ", response.hash);
		return response.hash;
	}

	async create_indexed_composable_token_with_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveString,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_indexed_composable_token_with_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					royalty_numerator,
					royalty_denominator,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Indexed composable token with royalty created. - ", response.hash);
		return response.hash;
	}
	
	async create_indexed_composable_token_with_no_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveString,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_indexed_composable_token_with_no_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Indexed composable token with no royalty created. - ", response.hash);
		return response.hash;
	}

	async create_named_trait_token_with_no_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveAddressType,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_named_trait_token_with_no_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Named trait token with no royalty created. - ", response.hash);
		return response.hash;
	}
	
	async create_named_trait_token_with_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveAddressType,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: {
				function: `${STUDIO_MODULE}::create_named_trait_token_with_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					royalty_numerator,
					royalty_denominator,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
		console.log("Named trait token with royalty created. - ", response.hash);
		return response.hash;
	}
	
	async create_indexed_trait_token_with_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveString,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		royalty_numerator: MoveUint64Type,
		royalty_denominator: MoveUint64Type,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: { 
				function: `${STUDIO_MODULE}::create_indexed_trait_token_with_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					royalty_numerator,
					royalty_denominator,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });	
		console.log("Indexed trait token with royalty created. - ", response.hash);
		return response.hash;
	}
	
	async create_indexed_trait_token_with_no_royalty(
		aptos: Aptos,
		deployer: Account,
		collection: MoveString,
		description: MoveString,
		name: MoveString,
		uri: MoveString,
		property_keys: MoveString[],
		property_types: MoveString[],
		property_values: MoveUint8Type[][]
	): Promise<string> {
		const rawTxn = await aptos.transaction.build.simple({
			sender: deployer.accountAddress,
			data: { 
				function: `${STUDIO_MODULE}::create_indexed_trait_token_with_no_royalty`,
				functionArguments: [
					collection,
					description,
					name,
					uri,
					property_keys,
					property_types,
					property_values
				],
			},
		});
		const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
		const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });	
		console.log("Indexed trait token with no royalty created. - ", response.hash);
		return response.hash;
	}
	
}
