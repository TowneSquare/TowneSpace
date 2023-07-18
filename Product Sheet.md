# Product Sheet

- Will only support Token V2 for now

## Initial Structure

### Off-chain

These are the functionalities that will be implemented off-chain.

#### Marketplace

- Combine listed NFTs to get overview of the end product.

#### Studio

- Combine owned NFTs to get overview of the end product.

### On-chain

#### Marketplace

(forking move-examples/marketplace.move)
- Buy/Sell NFTs.
- Auction NFTs.
> Class Diagrams will be implemented upon discussing the structure explictly.

#### Studio

(using move-examples/object-token/hero.move as a reference)
- compose NFTs: Un/equip NFT to another NFTs.
> Class Diagrams will be implemented upon discussing the structure explictly.

## Schedule

```mermaid
gantt
    title Schedule Plan
    dateFormat  DD-MM-YYYY
    section Contracts
    marketplaceV2  :17-07-2023, 3d
    studio   :04-08-2023  , 7d
    audit   :14-09-2023 , 14d
    section UI 
    web  :11-08-2023 , 21d
    section Deploy 
    testnet      :01-09-2023  , 27d
    mainnet      :01-10-2023 ,
```
