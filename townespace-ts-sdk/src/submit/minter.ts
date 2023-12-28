/**
 */

import { MINT_MODULE } from "../utils/module-endpoints";
import { Account, Aptos, MoveAddressType, MoveString } from "@aptos-labs/ts-sdk";

export class Minter {

  async createFixedSupplyCollection(
    aptos: Aptos,
    deployer: Account,
    description: MoveString,
    max_supply: bigint,
    name: MoveString,
    symbol: MoveString,
    uri: MoveString,
    royalty_numerator: number,
    royalty_denominator: number,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${MINT_MODULE}::create_fixed_supply_collection`,
        functionArguments: [description, max_supply, name, symbol, uri, royalty_numerator, royalty_denominator, false, false],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Collection created. - ", response.hash);
    return response.hash;
  }

  async createUnlimitedSupplyCollection(
    aptos: Aptos,
    deployer: Account,
    description: MoveString,
    name: MoveString,
    symbol: MoveString,
    uri: MoveString,
    royalty_numerator: number,
    royalty_denominator: number,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${MINT_MODULE}::create_unlimited_supply_collection`,
        functionArguments: [description, name, symbol, uri, royalty_numerator, royalty_denominator, false, false],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Collection created. - ", response.hash);
    return response.hash;
  }

  // tokens are created and ready to be minted
  async CreateBatchOfReadyToMintComposableToken(
    aptos: Aptos,
    deployer: Account,
    collection_name: MoveString,
    number_of_tokens_to_mint: bigint,
    description: MoveString,
    uri: MoveString,
    base_mint_price: bigint,
    royalty_numerator: number,
    royalty_denominator: number,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${MINT_MODULE}::create_composable_tokens`,
        functionArguments: [collection_name, number_of_tokens_to_mint, description, uri, base_mint_price, royalty_numerator, royalty_denominator],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Collection created. - ", response.hash);
    return response.hash;
  }

  // tokens are created and ready to be minted
  async createBatchOfReadyToMintTraitToken(
    aptos: Aptos,
    deployer: Account,
    collection_name: MoveString,
    number_of_tokens_to_mint: bigint,
    description: MoveString,
    type: MoveString,
    uri: MoveString,
    base_mint_price: bigint,
    royalty_numerator: number,
    royalty_denominator: number,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${MINT_MODULE}::create_trait_tokens`,
        functionArguments: [collection_name, number_of_tokens_to_mint, description, type, uri, base_mint_price, royalty_numerator, royalty_denominator],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Collection created. - ", response.hash);
    return response.hash;
  }

  async mintToken(aptos: Aptos, deployer: Account, token_type: MoveString, token_addr: MoveAddressType): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${MINT_MODULE}::mint_token`,
        functionArguments: [token_type, token_addr],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Token minted. - ", response.hash);
    return response.hash;
  }
}
