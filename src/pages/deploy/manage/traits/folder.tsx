import FolderType from '../../../../type/folder_type';

interface Props {
  data: FolderType;
}
const Folder: React.FC<Props> = ({ data }) => {
  return (
    <div className="px-6 py-4 bg-gray-dark-1 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-base md:text-xl font-semibold">{data.name}</p>
        <p className="text-sm md:text-base">{data.files.length} Traits</p>
      </div>
      <div className="mt-8 flex overflow-x-scroll gap-4">
        {data.files.map((file, index) => (
          <div key={index}>
            <div className="w-24 md:w-32 bg-gray-dark-2 rounded-md">
              <img src={file.imageUrl} className="rounded-md" alt="image" />
            </div>
            <p className="px-1 text-sm md:text-base">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Folder;
