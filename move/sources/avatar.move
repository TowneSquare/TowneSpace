/*
    - Avatar is the primary NFT of type tokenv2,
    it can own other non-primary NFTs, also of type tokenv2, such as clothes.
    
    Relations:
    - Primary token can own non-primary token, and the inverse is false;
        - An avatar cannot own avatars.
        - An avatar can own zero to many Clothes.
        - Clothes cannot own clothes.

    Lifecycle:
    1. The creator initializes a collection of avatars.
    2. The creator mints one to many avatars.
    3. The creator mints one to many clothings.
    4. The creator combines an avatar token with a clothing token.

    TODOs: 
    - come up with better namings. e.g: layer 1 (avatar) -> layer 2 (clothes)
*/

module marketplace_v2::avatar {
    // For the sake of explanations, we will 
    // only focus on the avatars and clothes for now.
    use aptos_framework::object::{Self, ConstructorRef, Object};

    use aptos_token_objects::collection;
    use aptos_token_objects::token;

    use std::option::{Self, Option};
    use std::signer;
    use std::string::{Self, String};

    struct OnChainConfig has key {
        collection_name: String,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Hero has key {
        name: String,
        type: String, // TODO this must be a vector
        price: u64,
        clothing: Option<Object<Clothing>>,
        mutator_ref: token::MutatorRef,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Clothing has key {
        name: String,
        price_modifier: u64,
    }

    // 1. Initialize avatar collection
    fun initialize_collection(creator: &signer) {
        // TODO assert signer is the creator
        create_collection(
            creator,
            description,
            supply,
            name,
            uri,
            );
    }

    fun create_collection(creator, description, supply, name, uri) {
        collection::create_fixed_collection(
            creator,
            description,
            supply,
            name,
            option::none(),
            uri,
        )

        // Move the created object to the resource account.
        let new_collection = OnChainConfig {
            name: new_name,
        };
        move_to(account, new_collection);
    }

    // Create an object, this function is reusable and will be used
    // for both the avatar and the clothing objects
    fun create_object(
        creator: &signer,
        description: String,
        name: String,
        uri: String,
    ): ConstructorRef acquires OnChainConfig {
        let collection = borrow_global<OnChainConfig>(signer::address_of(creator));
        token::create_named_token(
            creator,
            collection.name,
            description,
            name,
            option::none(),
            uri,
        )
    }

    // Create avatar; this function will be used for minting the avatar token
    public fun create_avatar(
        // avatar variables that we will submit on-chain
        price: u64,

        // object variables that we will submit on-chain
        creator: &signer,
        description: String,
        name: String,
        uri: String,
    ): Object<Avatar> acquires OnChainConfig {
        let constructor_ref = create_object(creator, description, name, uri);
        let object_signer = object::generate_signer(&constructor_ref);

        let new_avatar = Avatar {
            price,
            clothing: option::none(),
            mutator_ref: token::generate_mutator_ref(&constructor_ref),
        };
        move_to(&object_signer, new_avatar);

        object::address_to_object(signer::address_of(&object_signer))
    }

    // 2. Mint an avatar
    entry fun mint_avatar(
        account: &signer,
        description: String,
        name: String,
        uri: String,
        price: u64,
    ) acquires OnChainConfig {
        create_avatar(price, account, description, name, uri);
    }

    // Create clothing function, this will be used for minting the clothing token
    public fun create_clothing(
        // clothing variables that we will submit on-chain
        price_modifier: u64,

        creator: &signer,
        description: String,
        name: String,
        uri: String,
    ): Object<Clothing> acquires OnChainConfig {
        let constructor_ref = create_object(creator, description, name, uri);
        let object_signer = object::generate_signer(&constructor_ref);

        let new_clothing = Clothing {
            price_modifier,
        };
        move_to(&object_signer, new_clothing);

        // get the object from the object signer  
        object::address_to_object(signer::address_of(&object_signer))
    }

    // 3. Mint a clothing token
    entry fun mint_clothing(
        category: String,
        price_modifier: u64,
        account: &signer,
        description: String,
        name: String,
        uri: String,
    ) acquires OnChainConfig {
        create_clothing(category, price_modifier, account, description, name, uri);
    }

    // 4. Combine an avatar with a clothing
    public fun equip_clothing(
        owner: &signer,
        avatar: Object<Avatar>,
        clothing: Object<Clothing>,
    ) acquires Avatar {
        let avatar_object = borrow_global_mut<Avatar>(object::object_address(&avatar));

        option::fill(&mut avatar_object, clothing);
        object::transfer_to_object(owner, clothing, hero);

        // TODO: Disable transfer. Clothing must be transferred
        // only through `unequip_clothing` function.
    }

    // 5. Uncombine a clothing from an avatar
    public fun unequip_clothing(
        owner: &signer,
        avatar: Object<Avatar>,
        clothing: Object<Clothing>,
    ) acquires Avatar {
        let avatar_object = borrow_global_mut<Avatar>(object::object_address(&avatar));
        let combined_clothing = option::extract(&mut avatar_object.clothing);
        object::transfer(owner, clothing, signer::address_of(owner));
    }

    // Unit test
    #[test(account = @0x123)]
    fun test(account: &signer) acquires Avatar, OnChainConfig {
        initialize_collection(account);

        let avatar = create_avatar(
            50,
            account,
            string::utf8(b"a dummy one"),
            string::utf8(b"toad"),
            string::utf8(b"www.townesquare.xyz"),
        );

        let clothing = create_clothing(
            string::utf8(b"a hat"),
            20,
            account,
            string::utf8(b"designed exclussively for dummy toads"),
            string::utf8(b"www.townesquare.xyz"),
        );

        let account_address = signer::address_of(account);
        assert!(object::is_owner(avatar, account_address), 0);
        assert!(object::is_owner(clothing, account_address), 1);

        equip_clothing(account, avatar, clothing);
        assert!(object::is_owner(avatar, account_address), 3);
        assert!(object::is_owner(clothing, object::object_address(&avatar)), 4);

        unequip_clothing(account, avatar, clothing);
    }

}