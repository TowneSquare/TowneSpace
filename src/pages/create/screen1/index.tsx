import { useEffect, useState, useCallback } from 'react';
import FolderType, { FileType } from '../../../type/folder_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { updateTraits } from '../../../state/create';
import { toast } from 'react-toastify';
import { isSupportFile } from '../../../util';
import Header from '../../../components/create/header';
import UploadAssetModal from '../../../components/modal/uploadAssetModals';
import { toggleUploadAssetModal } from '../../../state/dialog';
import { toggleHasReviewedCollectionSettings } from '../../../state/dialog';

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
    dispatch(toggleHasReviewedCollectionSettings(false));
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

        const fileHandles = await Promise.all(fileHandlesPromises);
        const traits: FolderType[] = [];
        let containsUnsupportedFiles = false;
        let containsSubfolders = false;
        let fileCount = 0;
        let invalidFolderFound = false;

        const supportedExtensions = [
          'jpg',
          'jpeg',
          'png',
          'webp',
          'gif',
          'svg',
        ];

        const readFilesFileSystemAPI = async (
          folderName: string,
          handle: any,
          isSubfolder = false
        ) => {
          // set if dragged folder contains files rather than subfolder to false
          let folderContainsFiles = false;

          for await (const [key, value] of handle.entries()) {
            const fileNameParts = key.split('.');
            const fileExtension =
              fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (value.kind === 'file' && key.toLowerCase() === '.ds_store') {
              console.log('====== ds seen =======');
              continue;
            }

            // if dragged folder contains files rather than subfolder
            if (value.kind === 'file') {
              if (!isSubfolder) {
                // Direct file in parent folder, mark as invalid
                invalidFolderFound = true;
                dispatch(
                  toggleUploadAssetModal({
                    visible: true,
                    type: 'invalid_folder',
                  })
                );
                return;
              }

              console.log(' ====== check here for files in subfolder ======');
              console.log(fileExtension);
              folderContainsFiles = true;
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
            } else if (value.kind === 'directory' && !isSubfolder) {
              containsSubfolders = true;
              const subfolderName = key;
              traits.push({ name: subfolderName, files: [] });
              await readFilesFileSystemAPI(subfolderName, value, true);
            }
          }
        };

        const readFilesWebkit = async (
          folderName: string,
          handle: any,
          isSubfolder = false
        ) => {
          // set if dragged folder contains files rather than subfolder to false
          let folderContainsFiles = false;

          const reader = handle.createReader();
          let entries = [];
          let entry: any;
          while (
            (entry = (await new Promise((resolve) =>
              reader.readEntries(resolve)
            )) as any).length > 0
          ) {
            entries = entries.concat(entry) as any;
          }

          for (const entry of entries) {
            const fileNameParts = entry.name.split('.');
            const fileExtension =
              fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (entry.isFile && entry.name.toLowerCase() === '.ds_store') {
              console.log('====== ds seen =======');
              continue;
            }

            if (entry.isFile) {
              if (!isSubfolder) {
                // Direct file in parent folder, mark as invalid
                invalidFolderFound = true;
                dispatch(
                  toggleUploadAssetModal({
                    visible: true,
                    type: 'invalid_folder',
                  })
                );
                return;
              }

              folderContainsFiles = true;
              fileCount++;
              if (!supportedExtensions.includes(fileExtension)) {
                containsUnsupportedFiles = true;
              } else {
                const file = await new Promise((resolve) =>
                  entry.file(resolve)
                );
                const imageUrl = URL.createObjectURL(file as any);
                const obj = {
                  name: fileNameParts.slice(0, -1).join('.'),
                  folderName: folderName,
                  file: file,
                  imageUrl,
                  rarities: 50,
                  isIncluded: true,
                };

                let folderFound = false;
                for (let i = 0; i < traits.length; i++) {
                  if (traits[i].name === folderName) {
                    traits[i].files.push(obj as any);
                    folderFound = true;
                    break;
                  }
                }
                if (!folderFound) {
                  traits.push({ name: folderName, files: [obj as any] });
                }
              }
            } else if (entry.isDirectory && !isSubfolder) {
              containsSubfolders = true;
              const subfolderName = entry.name;
              traits.push({ name: subfolderName, files: [] });
              await readFilesWebkit(subfolderName, entry, true);
            }
          }
        };

        for (const handle of fileHandles) {
          if (supportsFileSystemAccessAPI && handle.kind === 'directory') {
            // Read the files in the folder using File System Access API
            await readFilesFileSystemAPI(handle.name, handle);
          } else if (supportsWebkitGetAsEntry && handle.isDirectory) {
            // Read the files in the folder using webkitGetAsEntry
            await readFilesWebkit(handle.name, handle);
          } else {
            // If a file is dragged, mark as invalid
            invalidFolderFound = true;
            break;
          }
        }

        if (invalidFolderFound) {
          dispatch(
            toggleUploadAssetModal({
              visible: true,
              type: 'invalid_folder',
            })
          );
          return;
        }
        if (containsUnsupportedFiles) {
          dispatch(
            toggleUploadAssetModal({
              visible: true,
              type: 'invalid_file',
            })
          );
          return;
        }
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

    // Create an array from e.target.files and filter out .DS_Store files
    const files: File[] = [...e.target.files].filter(
      (file) => file.name !== '.DS_Store'
    );
    const traits: FolderType[] = [];
    let containsUnsupportedFiles = false;
    let containsSubfolders = false;
    let fileCount = 0;
    let invalidFolderFound = false;

    const supportedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

    const processFile = (file: File, folderName: string) => {
      const fileNameParts = file.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (!supportedExtensions.includes(fileExtension)) {
        containsUnsupportedFiles = true;
        return;
      }

      fileCount++;
      const imageUrl = URL.createObjectURL(file);
      const obj: FileType = {
        name: fileNameParts.slice(0, -1).join('.'),
        folderName,
        file,
        imageUrl,
        rarities: 50,
        isIncluded: true,
      };

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
    };

    files.forEach((file: File) => {
      const paths = file.webkitRelativePath.split('/');

      if (paths.length === 2) {
        // a file at the top level, which is invalid
        invalidFolderFound = true;
      } else if (paths.length === 3) {
        // a file inside a subfolder
        const folderName = paths[1];
        containsSubfolders = true;
        processFile(file, folderName);
      } else if (paths.length > 3) {
        // This is a folder inside a subfolder, which is invalid
        invalidFolderFound = true;
      }
    });

    // Check if there are subfolders
    const validFolders = traits.filter((trait) => trait.files.length > 0);
    containsSubfolders = validFolders.length > 0;

    // Check if traits contain files
    const containFiles =
      traits.length > 0 && traits.some((trait) => trait.files.length > 0);

    if (invalidFolderFound) {
      dispatch(
        toggleUploadAssetModal({
          visible: true,
          type: 'invalid_folder',
        })
      );
      return;
    }

    if (containsUnsupportedFiles) {
      dispatch(
        toggleUploadAssetModal({
          visible: true,
          type: 'invalid_file',
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
