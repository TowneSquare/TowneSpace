import { useEffect, useState, useCallback } from 'react';
import FolderType, { FileType } from '../../../type/folder_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { updateTraits } from '../../../state/create';
import { toast } from 'react-toastify';
import { isSupportFile } from '../../../util';
import Header from '../../../components/create/header';
import UploadAssetModal from '../../../components/modal/uploadAssetModals';
import { toggleUploadAssetModal } from '../../../state/dialog';

const Screen3 = () => {
  const dispatch = useAppDispatch();
  const traits = useAppSelector((state) => state.createState.traits);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    // Calculate the total number of files and update the state.
    const totalFiles = traits.reduce(
      (acc, trait) => acc + trait.files.length,
      0
    );
    setFileCount(totalFiles);
  }, [traits]);

  useEffect(() => {
    // Check if the browser supports File System Access API and WebkitGetAsEntry API.
    const supportsFileSystemAccessAPI =
      'getAsFileSystemHandle' in DataTransferItem.prototype;
    const supportsWebkitGetAsEntry =
      'webkitGetAsEntry' in DataTransferItem.prototype;

    // Get the elements for folder and debug area.
    const elem = document.getElementById('folder');
    const debug = document.getElementById('preview');
    if (elem && debug) {
      // Add event listeners to the folder element for drag and drop functionality.

      // Prevent default behavior during drag over to allow drop.
      elem.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      // Style the element when a file is dragged over it.
      elem.addEventListener('dragenter', (e) => {
        elem.style.outline = 'solid #9264F8 3px';
        elem.style.backgroundColor = 'rgba(184, 130, 255, 0.10)';
      });

      // Remove styling when the dragged file leaves the element.
      elem.addEventListener('dragleave', (e) => {
        elem.style.outline = '';
        elem.style.backgroundColor = '';
      });

      // Handle file drop event.
      elem.addEventListener('drop', async (e) => {
        e.preventDefault();
        elem.style.outline = '';
        elem.style.backgroundColor = '';

        if (!e.dataTransfer) return;

        // Collect file handles from the dropped items.
        const fileHandlesPromises = [...(e.dataTransfer.items as any)]
          .filter((item) => item.kind === 'file')
          .map(async (item) => {
            if (supportsFileSystemAccessAPI) {
              return item.getAsFileSystemHandle();
            } else if (supportsWebkitGetAsEntry) {
              return item.webkitGetAsEntry();
            } else {
              return item.getAsFile();
            }
          });

        // Wait for all file handles to be resolved.
        const fileHandles = await Promise.all(fileHandlesPromises);
        const traits: FolderType[] = [];
        let containsUnsupportedFiles = false;
        let containsSubfolders = false;
        let fileCount = 0;

        const supportedExtensions = [
          'jpg',
          'jpeg',
          'png',
          'webp',
          'gif',
          'svg',
        ];

        // Read files within the directory handle.
        const readFiles = async (folderName: string, handle: any) => {
          for await (const [key, value] of handle.entries()) {
            const fileNameParts = key.split('.');
            const fileExtension =
              fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (value.kind === 'file') {
              fileCount++;
              if (!supportedExtensions.includes(fileExtension)) {
                containsUnsupportedFiles = true;
              } else {
                const imageUrl = URL.createObjectURL(await value.getFile());
                const obj = {
                  name: fileNameParts.slice(0, -1).join('.'),
                  folderName: folderName,
                  file: value,
                  imageUrl,
                  rarities: 50,
                  isIncluded: true,
                };

                // Check if folder already exists in traits and add the file to it.
                let folderFound = false;
                for (let i = 0; i < traits.length; i++) {
                  if (traits[i].name === folderName) {
                    traits[i].files.push(obj);
                    folderFound = true;
                    break;
                  }
                }
                if (!folderFound) {
                  traits.push({ name: folderName, files: [obj] });
                }
              }
            } else if (value.kind === 'directory') {
              containsSubfolders = true;
              traits.push({ name: key, files: [] });
              await readFiles(key, value);
            }
          }
        };

        // Iterate through the file handles and read files if they are directories.
        for (const handle of fileHandles) {
          if (handle.kind === 'directory') {
            await readFiles(handle.name, handle);
          }
        }

        // Check if traits contain files and unsupported files.
        const containFiles =
          traits.length > 0 && traits.some((trait) => trait.files.length > 0);

        // Display upload asset error modal if the folder doesn't contain supported files.
        if (!containFiles && containsUnsupportedFiles) {
          dispatch(
            toggleUploadAssetModal({
              visible: true,
              type: 'invalid_file',
            })
          );

          return;
        }

        // Display upload asset error modal  if the folder doesn't contain subfolders.
        if (fileCount === 0 || !containsSubfolders) {
          dispatch(
            toggleUploadAssetModal({
              visible: true,
              type: 'invalid_folder',
            })
          );
          return;
        }

        // Update traits and display success toast.
        dispatch(updateTraits(traits));
        toast.dismiss();
        toast.success('Upload done!');
      });
    }
  }, []);

  const onFolderSelector = async () => {
    const selector = document.getElementById('folder-selector');
    selector?.click();
  };
  const onChangeFolder = async (e: any) => {
    toast.success('Uploading!');

    const files: File[] = [...e.target.files];
    const traits: FolderType[] = [];
    let containsUnsupportedFiles = false;
    let containsSubfolders = false;
    let fileCount = 0;

    const supportedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

    files.forEach((file: File) => {
      const paths = file.webkitRelativePath.split('/');

      if (paths.length === 3) {
        const fileName = paths[2].split('.');
        const fileExtension = fileName[fileName.length - 1].toLowerCase();

        fileCount++;
        if (!supportedExtensions.includes(fileExtension)) {
          containsUnsupportedFiles = true;
        } else {
          const imageUrl = URL.createObjectURL(file);
          const obj: FileType = {
            name: paths[2].split('.')[0],
            folderName: paths[1],
            file,
            imageUrl,
            rarities: 50,
            isIncluded: true,
          };

          let isNew = true;
          for (let i = 0; i < traits.length; i++) {
            if (traits[i].name === paths[1]) {
              traits[i].files.push(obj);
              isNew = false;
              break;
            }
          }
          if (isNew) {
            traits.push({ name: paths[1], files: [obj] });
          }
        }
      }
    });

    // Check if there are subfolders
    containsSubfolders = traits.length > 0;

    // Check if traits contain files
    const containFiles =
      traits.length > 0 && traits.some((trait) => trait.files.length > 0);

    // Display error modal if the folder doesn't contain supported files
    if (!containFiles && containsUnsupportedFiles) {
      dispatch(
        toggleUploadAssetModal({
          visible: true,
          type: 'invalid_file',
        })
      );
      return;
    }

    // Display error modal if the folder doesn't contain subfolders
    if (fileCount === 0 || !containsSubfolders) {
      dispatch(
        toggleUploadAssetModal({
          visible: true,
          type: 'invalid_folder',
        })
      );
      return;
    }

    dispatch(updateTraits(traits));
    toast.dismiss();
    toast.success('Upload done!');
  };

  return (
    <div className="pb-10">
      <Header stepNumber={1} />
      <div className="flex flex-col items-center">
        <p className="w-[509px] mt-10 text-base font-normal md:text-xl text-center">
          Let’s first upload images that will serve as the traits for your new
          PFP collection
        </p>
        <div className="w-full flex justify-center mt-16 pb-[175px]">
          <div className="mx-4 w-[652px] p-6 flex flex-col gap-[23px] bg-gray-dark-2 rounded-md">
            <div className="">
              <p className="text-2xl md:text-3xl">Upload Folder with assets</p>
              <p className="text-sm md:text-base font-[400px] mt-4">
                Please upload a <b>single folder</b> that contains{' '}
                <b>subfolders</b> with <b>traits</b>.
                <br />
                <br />
                Each <b>subfolder</b> should include all the variants of each
                trait type (e.g. all the hair trait images should be inside the{' '}
                <b>Hair</b> subfolder, etc)
                <br />
                <br />
                Need help? Download our{' '}
                <b className=" text-primary-light">Example assets folder</b> or
                read our <b className=" text-primary-light">Guidelines</b>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm md:text-base font-semibold text-center">
                Required Upload Folder structure
              </p>
              <img
                src="/create/folder-structure.svg"
                className="mt-6"
                alt="structure"
              />
            </div>
          </div>
          {traits.length > 0 ? (
            <div
              id="folder"
              className="w-[492px] mx-4 py-[140px] bg-gray-dark-2 flex flex-col justify-center items-center border border-dashed border-gray-light-1 rounded-md cursor-pointer"
              onClick={() => onFolderSelector()}
            >
              <img src="/create/folder-uploaded.svg" alt="folder" />
              <p className="text-base md:text-xl font-semibold mt-3">
                Folder uploaded!
              </p>
              <p className="text-[16px] font-semibold">
                {fileCount} images have been uploaded
              </p>
              <p className="text-sm md:text-base mt-[64px]">
                Wrong folder? <br />{' '}
                <span className="text-primary-light font-semibold">
                  Upload again
                </span>
              </p>
              <input
                directory=""
                webkitdirectory=""
                type="file"
                id="folder-selector"
                className="hidden"
                onChange={onChangeFolder}
              />
              <p className="mt-4" id="preview"></p>
            </div>
          ) : (
            <div
              id="folder"
              className="w-[492px] mx-4 py-[140px] flex flex-col justify-center items-center border border-dashed border-gray-light-1 rounded-md cursor-pointer"
              onClick={() => onFolderSelector()}
            >
              <img src="/create/folder.svg" alt="folder" />
              <p className="text-base md:text-xl font-semibold mt-5">
                Drop your folder here
              </p>
              <p className="text-sm md:text-base mt-1">
                or &nbsp;
                <span className="text-primary-light font-semibold">
                  choose a folder
                </span>
                &nbsp; to upload
              </p>
              <input
                directory=""
                webkitdirectory=""
                type="file"
                id="folder-selector"
                className="hidden"
                onChange={onChangeFolder}
              />
              <p className="mt-4" id="preview"></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Screen3;

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}
