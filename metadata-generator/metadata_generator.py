import os
import shutil

folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/Cool Sloth'
mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated'
output_md_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated_names.md'

def generate_image_metadata(folder_path, mirror_folder_path):
    folder_name = os.path.basename(folder_path)
    images_metadata = []
    image_names_csv = []  # List to store image names for CSV
    uris = []  # List to store image URIs
    index = 1  # Initialize index for images
    occurrence_num = 1  # Number of times to repeat each image
    
    # Create the mirror folder if it doesn't exist
    if not os.path.exists(mirror_folder_path):
        os.makedirs(mirror_folder_path)

    # Copy images directly into the generated folder
    for filename in os.listdir(os.path.join(folder_path, 'Body')):
        if filename.endswith(".png"):
            new_image_name = f"{folder_name} #{index}.png"
            # parse through the folder name and change sapces to %20
            parsed_folder_name = folder_name.replace(" ", "%20")
            image_uri = f"{parsed_folder_name}%20%23{index}.png"
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
            index += 1  # Increment index for the next image

    # Traverse through the rest of the folders
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            subfolder_path = os.path.join(root, dir_name)
            for filename in os.listdir(subfolder_path):
                if filename.endswith(".png"):
                    image_name = filename.split('.')[0]  # Remove file extension from filename
                    new_image_name = f"{image_name} #{index}.png"
                    parsed_image_name = image_name.replace(" ", "%20")
                    image_uri = f"{parsed_image_name}%20%23{index}.png"
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
                    index += 1  # Increment index for the next image

    return images_metadata, image_names_csv, uris  # Return image metadata, CSV data and URIs

metadata, csv_data, uris = generate_image_metadata(folder_path, mirror_folder_path)

# Generate Markdown file with list of generated names in the specified format
with open(output_md_path, 'w') as md_file:
    md_file.write('["')
    md_file.write('", "'.join(csv_data))
    md_file.write('"]\n')
    md_file.write('\n')
    md_file.write('["')
    md_file.write('", "'.join(uris))
    md_file.write('"]\n')
