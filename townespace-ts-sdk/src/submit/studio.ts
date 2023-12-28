/**
 */

import { STUDIO_MODULE } from "../utils/module-endpoints";
import { Account, Aptos, MoveAddressType, MoveObjectType, MoveString } from "@aptos-labs/ts-sdk";

export class Studio {

  async burnComposableToken(aptos: Aptos, deployer: Account, token_object: MoveObjectType): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::burn_composable_token`,
        functionArguments: [token_object],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Composable token burned. - ", response.hash);
    return response.hash;
  }

  async burnTraitToken(aptos: Aptos, deployer: Account, token_object: MoveObjectType): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::burn_trait_token`,
        functionArguments: [token_object],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Trait token burned. - ", response.hash);
    return response.hash;
  }

  async equipTrait(
    aptos: Aptos, 
    deployer: Account,
    composable_object: MoveObjectType,
    trait_object: MoveObjectType,
    trait_type: MoveString,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::equip_trait`,
        functionArguments: [composable_object, trait_object, trait_type],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Trait equipped. - ", response.hash);
    return response.hash;
  }

  async unequipTrait(
    aptos: Aptos, 
    deployer: Account,
    composable_object: MoveObjectType,
    trait_object: MoveObjectType,
    trait_type: MoveString,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::unequip_trait`,
        functionArguments: [composable_object, trait_object, trait_type],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Trait unequipped. - ", response.hash);
    return response.hash;
  }

  async decomposeEntireToken(
    aptos: Aptos, 
    deployer: Account,
    composable_object: MoveObjectType,
    new_uri: MoveString,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::decompose_entire_token`,
        functionArguments: [composable_object, new_uri],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Token decomposed. - ", response.hash);
    return response.hash;
  }

  

  // tokens are created but not ready to be minted
  async CreateComposableToken(
    aptos: Aptos, 
    deployer: Account,
    collection_name: MoveString,
    description: MoveString,
    uri: MoveString,
    base_mint_price: bigint,
    traits: MoveObjectType[],
    royalty_numerator: number,
    royalty_denominator: number,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::create_composable_token`,
        functionArguments: [collection_name, description, uri, base_mint_price, traits, royalty_numerator, royalty_denominator],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Token created. - ", response.hash);
    return response.hash;
  }

  

  // tokens are created but not ready to be minted
  async createTraitToken(
    aptos: Aptos,
    deployer: Account,
    collection_name: MoveString,
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
        function: `${STUDIO_MODULE}::create_trait_token`,
        functionArguments: [collection_name, description, type, uri, base_mint_price, royalty_numerator, royalty_denominator],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Token created. - ", response.hash);
    return response.hash;
  }

  async transferDigitalAsset(
    aptos: Aptos,
    deployer: Account,
    type: MoveString, // type of the digital asset
    token_address: MoveAddressType,
    recipient_address: MoveAddressType,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::transfer_digital_asset`,
        functionArguments: [type, token_address, recipient_address],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Digital asset transferred. - ", response.hash);
    return response.hash;
  }

  // works with digital asset being the recipient as well
  async transferFungibleAsset(
    aptos: Aptos,
    deployer: Account,
    fa_type: MoveString, // type of the fungible asset
    recipient_address: MoveAddressType,
    fa: MoveObjectType,
    amount: bigint,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::transfer_fungible_asset`,
        functionArguments: [fa_type, recipient_address, fa, amount],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Fungible asset transferred. - ", response.hash);
    return response.hash;
  }

  async setTokenName(
    aptos: Aptos,
    deployer: Account,
    token_object_addr: MoveAddressType,
    new_name: MoveString,
  ): Promise<string> {
    const rawTxn = await aptos.transaction.build.simple({
      sender: deployer.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::set_token_name`,
        functionArguments: [token_object_addr, new_name],
      },
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn});
    console.log("pendingTxn", pendingTxn);
    const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Token name set. - ", response.hash);
    return response.hash;
  }
}
