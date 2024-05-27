import os
import shutil

folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/Cool Sloth'
mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/generated'

def generate_image_metadata(folder_path, mirror_folder_path):
    folder_name = os.path.basename(folder_path)
    images_metadata = []
    image_names_csv = []  # List to store image names for CSV
    index = 1  # Initialize index for images
    occurrence_num = 1  # Number of times to repeat each image
    
    # Create the mirror folder if it doesn't exist
    if not os.path.exists(mirror_folder_path):
        os.makedirs(mirror_folder_path)

    # Copy images directly into the generated folder
    for filename in os.listdir(os.path.join(folder_path, 'Body')):
        if filename.endswith(".png"):
            new_image_name = f"{folder_name} #{index}" 
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
            mirror_image_path = os.path.join(mirror_folder_path, f"{new_image_name}.png")
            shutil.copyfile(os.path.join(folder_path, 'Body', filename), mirror_image_path)
            image_names_csv.append(new_image_name)  # Add image name to CSV list
            index += 1  # Increment index for the next image

    # Traverse through the rest of the folders
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            subfolder_path = os.path.join(root, dir_name)
            for filename in os.listdir(subfolder_path):
                if filename.endswith(".png"):
                    image_name = filename.split('.')[0]  # Remove file extension from filename
                    new_image_name = f"{dir_name} #{index}" 
                    image_metadata = {
                        "name": new_image_name,
                        "description": "",
                        "image": f"{index}.png",
                        "edition": 1,
                        "attributes": [
                            {"type": dir_name, "value": image_name},
                        ],
                        "compiler": "TowneSpace Engine"
                    }
                    images_metadata.append(image_metadata)
                    # Copy image to mirror folder
                    mirror_image_path = os.path.join(mirror_folder_path, f"{new_image_name}.png")
                    shutil.copyfile(os.path.join(subfolder_path, filename), mirror_image_path)
                    image_names_csv.append(new_image_name)  # Add image name to CSV list
                    index += 1  # Increment index for the next image

    return images_metadata, image_names_csv  # Return image metadata and CSV data

metadata, csv_data = generate_image_metadata(folder_path, mirror_folder_path)
