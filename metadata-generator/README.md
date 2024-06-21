# TS creator tool helper

> **IMPORTANT NOTE: The tool is still a WIP**

## Steps

There are two potential ways on tackling this problem. The following is the one being developed at the moment.

### Way 1

- Prerequisites:
  - A folder with the images to be tokenized.

1. Parse through it to generate a csv table with the following columns:
    - Name; usually the file name
    - Type; usually the subfolder name
    - Path; a URI to the image
    - Count; the number of times the image appears in the table
2. Use the csv table to generate the payloads that will created the tokens on-chain.

#### Scenario

Alice is a creator.

1. She provides the tool with a folder containing the images she wants to tokenize.
2. (via generate_csv.py) The tool generates a csv table with the images metadata and return it to Alice (Alice will see the csv file as in the set rarities flow).
3. (via generate_cnfts.py) The tool generates the cNFTs;
   1. The tool copies all the images with the type body.
   2. The tool renames the copied images to the name of the images folder and type to cnft.
4. (via generate_uri.py) The tool uploads the images to IPFS and populates the csv table with the URIs.
5. Alice populates the csv table with the rarity rates of each image.
   1. The tool will calculate the token count for each image based on the follwoing formula:
      - `token_count = total_supply * rarity_rate / 100`
6. (via generate_payload.py) The tool generates the payloads that will create the tokens on-chain. NOTE: The tool skips all the images with the type cnft.


TODOs:

- [ ] Give proper names to the scripts
- [ ] Work on a proper strcutre for the scripts
