/**
 * Example to demonstrate composing and decomposing a cNFT
 */
import "dotenv";
import {
    Account,
    AccountAddress,
    Aptos,
    AptosConfig,
    Ed25519PrivateKey,
    Network,
    MoveString
} from "@aptos-labs/ts-sdk";
import { createInterface } from "readline";
import { Minter } from "../src/submit/minter";
import { Studio } from "../src/submit/studio";
import { StudioEvents } from "../src/retrieve/studioEvents";

// Default to devnet
const APTOS_NETWORK: Network = Network.TESTNET;

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const compose = async () => {
    
    const aptosConfig = new AptosConfig({ network: APTOS_NETWORK });
    const aptos = new Aptos(aptosConfig);

    // create accounts
    const deployer = Account.fromPrivateKeyAndAddress({
        privateKey: new Ed25519PrivateKey(process.argv[2]),
        address: AccountAddress.from(process.argv[2]),
    });

    await aptos.fundAccount({ accountAddress: deployer.accountAddress, amount: 100_000_000 });

    const townespace_studio = new Studio();
    const studio_events = new StudioEvents(aptosConfig);
    const townespace_minter = new Minter();

    // create a collection
    await townespace_minter.createUnlimitedSupplyCollection(
        aptos,
        deployer,
        new MoveString("description"),
        new MoveString("name"),
        new MoveString("symbol"),
        new MoveString("uri"),
        1,
        1,
    );

    // get the collection address
    const collection_address = await studio_events.getCollectionCreatedEvent({
        accountAddress: deployer.accountAddress,
    });
    console.log("Collection address: ", (collection_address[0].data as { collection_address: string }).collection_address);

    // create a composable token
    await townespace_studio.CreateComposableToken(
        aptos,
        deployer,
        new MoveString("name"),
        new MoveString("description"),
        new MoveString("uri"),
        BigInt(1), // Convert bigint to number
        [],
        Number(BigInt(1)), // Convert bigint to number
        Number(BigInt(1)), // Convert bigint to number
    );

    // get the token address
    const token_address = await studio_events.getComposableMinted({
        accountAddress: deployer.accountAddress,
    });
    console.log("Token address: ", token_address);

    // create a trait token
    await townespace_studio.createTraitToken(
        aptos,
        deployer,
        new MoveString("name"),
        new MoveString("description"),
        new MoveString("type"),
        new MoveString("uri"),
        BigInt(1), // Convert bigint to number
        Number(BigInt(1)), // Convert bigint to number
        Number(BigInt(1)), // Convert bigint to number
    );

    // get the trait token address
    const trait_token_address = await studio_events.getTraitMinted({
        accountAddress: deployer.accountAddress,
    });
    console.log("Trait token address: ", token_address);

    // equip trait token with composable token
    await townespace_studio.equipTrait(
        aptos,
        deployer,
        token_address.toString(), // Convert token_address to string
        trait_token_address.toString(), // Convert trait_token_address to string
        new MoveString("trait_type"), // Add the missing trait_type argument
    );

    // get equip event
    const equip_event = await studio_events.getCompositionEvent({
        accountAddress: deployer.accountAddress,
    });
    console.log("Equip event: ", equip_event[0].data);

    readline.close();

}

compose();
