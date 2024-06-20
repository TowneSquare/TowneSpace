# TODO: Rename file name

import os
import csv

folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/inputs/Cool Sloth'
# folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/inputs/Sloth Ball'
mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/v0.5/generated/images'
output_csv = '/Users/maclay/Code/TowneSpace/metadata-generator/v0.5/generated/sheet.csv'

def generate_image_csv(folder_path, output_csv):
    # Open the CSV file for writing
    with open(output_csv, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        # Write the header row
        csvwriter.writerow(['name', 'type'])
        
        # Walk through the folder
        for subdir, dirs, files in os.walk(folder_path):
            for file in files:
                # Get the file extension to filter images
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg')):
                    # Remove the file extension
                    file_name_without_extension = os.path.splitext(file)[0]
                    # Get the name of the subfolder (type)
                    type_name = os.path.basename(subdir)
                    
                    # Write the original image to CSV
                    csvwriter.writerow([file_name_without_extension, type_name])
                    
                    # Check if type_name is "body" and create a new entry for "cnft"
                    if type_name.lower() == "body":
                        # Generate the new name as the folder name
                        new_name = os.path.basename(folder_path)
                        # Write the "cnft" version to CSV
                        csvwriter.writerow([new_name, "cnft"])

generate_image_csv(folder_path, output_csv)
