# TODO: should print seperate payloads: 1st of composables and then for traits
# TODO: work on payload scripts

import os
import shutil

# folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/Cool Sloth'
# mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated'
# output_md_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated_for_payload.md'

folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/Sloth Ball'
mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated'
output_md_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated_for_payload.md'

def generate_image_metadata(folder_path, mirror_folder_path):
    folder_name = os.path.basename(folder_path)
    images_metadata = []
    image_names_csv = []  # List to store image names for CSV
    uris = []  # List to store image URIs
    suffixes = []  # List to store suffixes for image names
    index = 1  # Initialize index for images
    descriptions = []  # List to store descriptions
    occurrence_num = 5  # Number of times to repeat each image
    names_with_no_index = []  # List to store names of images that don't have an index
    
    # Create the mirror folder if it doesn't exist
    if not os.path.exists(mirror_folder_path):
        os.makedirs(mirror_folder_path)

    # Copy images directly into the generated folder
    for filename in os.listdir(os.path.join(folder_path, 'Body')):
        if filename.endswith(".png"):
            for i in range(occurrence_num):
                new_image_name = f"{folder_name} #{index}.png"
                name_with_no_index = f"{folder_name}"
                # parse through the folder name and change sapces to %20
                parsed_folder_name = folder_name.replace(" ", "%20")
                image_uri = f"{parsed_folder_name}"
                description = f"{folder_name}"
                image_metadata = {
                    "name": new_image_name,
                    "description": "",
                    "image": f"{index}.png",
                    "edition": 1,
                    "attributes": [
                        {"type": folder_name, "value": folder_name},
                    ],
                    "compiler": "TowneSpace Engine"
                }
                images_metadata.append(image_metadata)
                # Copy image to mirror folder
                mirror_image_path = os.path.join(mirror_folder_path, new_image_name)
                shutil.copyfile(os.path.join(folder_path, 'Body', filename), mirror_image_path)
                image_names_csv.append(new_image_name)  # Add image name to CSV list
                uris.append(image_uri)  # Add image URI to list
                suffixes.append(f"")
                descriptions.append(description)
                names_with_no_index.append(name_with_no_index)
                index += 1  # Increment index for the next image

    # Process the "Body" folder first, if it exists
    body_folder_path = os.path.join(folder_path, "Body")
    if os.path.exists(body_folder_path):
        for filename in os.listdir(body_folder_path):
            if filename.endswith(".png"):
                image_name = filename.split('.')[0]  # Remove file extension from filename
                new_image_name = f"{image_name} #{index}.png"
                name_with_no_index = f"{image_name}"
                parsed_image_name = image_name.replace(" ", "%20")
                image_uri = f"{parsed_image_name}"
                description = "Body"
                image_metadata = {
                    "name": new_image_name,
                    "description": "",
                    "image": f"{new_image_name}.png",
                    "edition": 1,
                    "attributes": [
                        {"type": "Body", "value": image_name},
                    ],
                    "compiler": "TowneSpace Engine"
                }
                images_metadata.append(image_metadata)
                # Copy image to mirror folder
                mirror_image_path = os.path.join(mirror_folder_path, new_image_name)
                shutil.copyfile(os.path.join(body_folder_path, filename), mirror_image_path)
                image_names_csv.append(new_image_name)  # Add image name to CSV list
                uris.append(image_uri)  # Add image URI to list
                suffixes.append(f"")
                descriptions.append(description)
                names_with_no_index.append(name_with_no_index)
                index += 1  # Increment index for the next image

    # Traverse through the rest of the folders, excluding "Body"
    for root, dirs, files in os.walk(folder_path):
        dirs[:] = [d for d in dirs if d != 'Body']  # Skip the "Body" folder as it is already processed
        for dir_name in dirs:
            subfolder_path = os.path.join(root, dir_name)
            for filename in os.listdir(subfolder_path):
                if filename.endswith(".png"):
                    image_name = filename.split('.')[0]  # Remove file extension from filename
                    new_image_name = f"{image_name} #{index}.png"
                    name_with_no_index = f"{image_name}"
                    parsed_image_name = image_name.replace(" ", "%20")
                    image_uri = f"{parsed_image_name}"
                    description = f"{dir_name}"
                    image_metadata = {
                        "name": new_image_name,
                        "description": "",
                        "image": f"{new_image_name}.png",
                        "edition": 1,
                        "attributes": [
                            {"type": dir_name, "value": image_name},
                        ],
                        "compiler": "TowneSpace Engine"
                    }
                    images_metadata.append(image_metadata)
                    # Copy image to mirror folder
                    mirror_image_path = os.path.join(mirror_folder_path, new_image_name)
                    shutil.copyfile(os.path.join(subfolder_path, filename), mirror_image_path)
                    image_names_csv.append(new_image_name)  # Add image name to CSV list
                    uris.append(image_uri)  # Add image URI to list
                    suffixes.append(f"")
                    descriptions.append(description)
                    names_with_no_index.append(name_with_no_index)
                    index += 1  # Increment index for the next image

    return images_metadata, names_with_no_index, uris, suffixes, descriptions, index-1  # Return image metadata, CSV data, URI, suffixes, descriptions and total count

metadata, names_with_no_index, uris, suffixes, descriptions, count = generate_image_metadata(folder_path, mirror_folder_path)

# Generate Markdown file with list of generated names in the specified format
with open(output_md_path, 'w') as md_file:
    md_file.write('Token descriptions:\n')
    md_file.write(', '.join(descriptions))
    md_file.write('\n')
    md_file.write('Token URIs:\n')
    md_file.write(', '.join(uris))
    md_file.write('\n')
    md_file.write('Token names:\n')
    md_file.write(', '.join(names_with_no_index))
    md_file.write('\n')
    md_file.write('Token suffixes:\n')
    md_file.write(', '.join(suffixes))
    md_file.write('\n')
    md_file.write('Total count: ')
    md_file.write(str(count))
