import os
import shutil
import json
import csv

# Images folder path
folder_path = "Sloth Ball"
mirror_folder_path = os.path.join(folder_path, ".generated")
occurrence_num = 5  # Number of times each image should be repeated in the metadata

def generate_image_metadata(folder_path, mirror_folder_path):
    folder_name = os.path.basename(folder_path)
    images_metadata = []
    image_names_csv = []  # List to store image names for CSV
    index = 1  # Initialize index for images
    png_files_count = 0  # Initialize count for PNG files
    
    # Count the number of PNG files in the folder
    for root, dirs, files in os.walk(folder_path):
        for filename in (files * occurrence_num):
            if filename.endswith(".png"):
                png_files_count += 1
    
    # Create the mirror folder if it doesn't exist
    if not os.path.exists(mirror_folder_path):
        os.makedirs(mirror_folder_path)

    for root, dirs, files in os.walk(folder_path):
        subfolder_name = os.path.relpath(root, folder_path)
        for filename in (files * occurrence_num):
            if filename.endswith(".png"):
                image_name = filename.split('.')[0]  # Remove file extension from filename
                for i in range(occurrence_num):  
                    new_image_name = f"{image_name} #{index}" 
                    image_metadata = {
                        "name": new_image_name,
                        "description": "",
                        "image": f"{index}.png",
                        "edition": 1,
                        "attributes": [
                            {"type": folder_name, "value": image_name},
                            # {"trait_type": "Body", "value": ""},
                            # {"trait_type": "Expression", "value": ""},
                            # {"trait_type": "Hair", "value": ""},
                            # {"trait_type": "Outfit", "value": ""}
                        ],
                        "compiler": "TowneSpace Engine"
                    }
                    images_metadata.append(image_metadata)
                    # Copy image to mirror folder
                    mirror_image_path = os.path.join(mirror_folder_path, f"{new_image_name}.png")
                    shutil.copyfile(os.path.join(root, filename), mirror_image_path)
                    image_names_csv.append(f"{image_name} #")  # Add image name to CSV list
                    index += 1  # Increment index for the next image
                    i += 1
                if index > png_files_count:  # Stop processing once the count is reached
                    break
        else:
            continue
        break  # Exit the loop once the count is reached
    return images_metadata, image_names_csv  # Return image metadata and CSV data

def save_metadata_to_json(metadata, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(metadata, json_file, indent=4)

def save_image_names_to_csv(image_names, csv_file):
    with open(csv_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['image_name'])  # Write header
        for name in image_names:
            writer.writerow([name])

if __name__ == "__main__":
    output_file = os.path.join(mirror_folder_path, ".metadata.json")
    csv_file = os.path.join(mirror_folder_path, ".image_names.csv")
    images_metadata, image_names_csv = generate_image_metadata(folder_path, mirror_folder_path)
    save_metadata_to_json(images_metadata, output_file)
    save_image_names_to_csv(image_names_csv, csv_file)
