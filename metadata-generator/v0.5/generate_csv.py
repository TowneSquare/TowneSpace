import os
import csv

# Cool sloth
folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/inputs/Cool Sloth'
folder_uri = 'https://bafybeidefvxv2rhzt26apifhthfapyrazgeselkomzpag2owkmnzu5r7ey.ipfs.w3s.link/'
# # Sloth ball
# folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/inputs/Sloth Ball'
# folder_uri = 'https://bafybeibyad23kwuhmiyke4vo35kkbd64xbm3sfcbyjawdypahynsjxzszq.ipfs.w3s.link/'

mirror_folder_path = '/Users/maclay/Code/TowneSpace/metadata-generator/v0.5/generated/images'
output_csv = '/Users/maclay/Code/TowneSpace/metadata-generator/v0.5/generated/sheet.csv'

def generate_image_csv(folder_path, output_csv):
    # List to store rows for sorting
    rows = []
    
    # Walk through the folder
    for subdir, dirs, files in os.walk(folder_path):
        for file in files:
            # Get the file extension to filter images
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg')):
                # Remove the file extension
                file_name_without_extension = os.path.splitext(file)[0]
                # Get the name of the subfolder (type)
                type_name = os.path.basename(subdir)
                
                # Construct the URI assuming it's a relative path
                relative_path = os.path.relpath(os.path.join(subdir, file), mirror_folder_path)
                uri = folder_uri + os.path.basename(file)
                # Replace spaces with %20
                uri = uri.replace(" ", "%20")
                
                # Append row to the list with 'name', 'type' and 'uri'
                rows.append([file_name_without_extension, type_name, uri])
                
                # Special case: if type_name is "body", add an additional entry for "cnft"
                if type_name.lower() == "body":
                    new_name = os.path.basename(folder_path)
                    rows.append([new_name, "Wrapper", uri])  # Use body_supply for "cnft"
    
    # Sort rows by 'type' column (index 1) and then by 'name' column (index 0)
    sorted_rows = sorted(rows, key=lambda x: (x[1], x[2]))
    
    # Open the CSV file for writing
    with open(output_csv, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        # Write the header row
        csvwriter.writerow(['name', 'type', 'uri'])
        # Write sorted rows to CSV
        csvwriter.writerows(sorted_rows)

# Call the function to generate the sorted CSV with 'uri' and 'type supply' columns
generate_image_csv(folder_path, output_csv)
