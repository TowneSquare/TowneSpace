import os
import shutil
import json

# Images folder path
folder_path = "Cool Sloth"
mirror_folder_path = "generated"

def generate_image_metadata(folder_path, mirror_folder_path):
    folder_name = os.path.basename(folder_path)
    images_metadata = []
    index = 1  # Initialize index for images
    
    # Create the mirror folder if it doesn't exist
    if not os.path.exists(mirror_folder_path):
        os.makedirs(mirror_folder_path)

    for root, dirs, files in os.walk(folder_path):
        subfolder_name = os.path.relpath(root, folder_path)
        for filename in files:
            if filename.endswith(".png"):
                image_name = filename.split('.')[0]  # Remove file extension from filename
                image_metadata = {
                    "name": f"{folder_name} #{index} {subfolder_name}",
                    "description": "",
                    "image": f"{index}.png",
                    "edition": 1,
                    "attributes": [
                        {"type": subfolder_name, "value": image_name},
                        # {"trait_type": "Body", "value": ""},
                        # {"trait_type": "Expression", "value": ""},
                        # {"trait_type": "Hair", "value": ""},
                        # {"trait_type": "Outfit", "value": ""}
                    ],
                    "compiler": "TowneSpace Engine"
                }
                images_metadata.append(image_metadata)
                # Copy image to mirror folder
                mirror_image_path = os.path.join(mirror_folder_path, f"{index}.png")
                shutil.copyfile(os.path.join(root, filename), mirror_image_path)
                index += 1  # Increment index for the next image
    return images_metadata

def save_metadata_to_json(metadata, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(metadata, json_file, indent=4)

if __name__ == "__main__":
    output_file = "generated/metadata.json"
    images_metadata = generate_image_metadata(folder_path, mirror_folder_path)
    save_metadata_to_json(images_metadata, output_file)
