import os
import shutil

# Images folder path
folder_path = "Cool Sloth"

def move_and_index_images(folder_path):
    # Create a destination folder with the same name as the original folder
    dest_folder = folder_path + "_indexed"
    os.makedirs(dest_folder, exist_ok=True)
    
    # Initialize index for image filenames
    index = 1
    
    # Iterate over subfolders and files in the original folder
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith(".png"):
                # Construct source and destination paths
                src_file = os.path.join(root, filename)
                new_filename = f"{index}.png"
                dest_file = os.path.join(dest_folder, new_filename)
                
                # Move and rename the image file to the destination folder
                shutil.move(src_file, dest_file)
                
                # Increment the index for the next image
                index += 1

if __name__ == "__main__":
    move_and_index_images(folder_path)
    print("Images moved and re-indexed successfully.")
