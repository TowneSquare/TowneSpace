import Slider from '../../../../components/slider';
import { updateRarities } from '../../../../state/create';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import FolderType from '../../../../type/folder_type';

interface Props {
  data: FolderType;
  iFolder: number;
}
const Folder: React.FC<Props> = ({ data, iFolder }) => {
  const dispatch = useAppDispatch();
  const traits = useAppSelector((state) => state.createState.traits);

  const onChangeRarities = (value: number, index: number) => {
    dispatch(updateRarities({ iFolder, iFile: index, value }));
  };
  return (
    <div className="px-6 py-2 rounded-md md:py-4 bg-gray-dark-2">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold md:text-xl">{data.name}</p>
      </div>
      <div className="flex flex-col gap-10 mt-8 md:gap-4">
        <div className="flex items-center ">
          <div className="flex gap-4 w-44">
            <p className="text-sm">TRAIT</p>
          </div>
          <div className="flex gap-4 w-[582px]">
            <p className="text-sm">RARITY</p>
          </div>
          <div className="flex gap-4">
            <p className="w-10 text-sm">EST.%</p>
            <p className="w-5 text-sm">EST.#</p>
          </div>
        </div>
        {data.files.map((file, index) => (
          <div className="flex items-center" key={index}>
            <div className="flex flex-col gap-2 md:flex-row md:gap-10">
              <div className="flex gap-2 md:gap-10">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="rounded-md bg-gray-light-1">
                    <img
                      src={file.imageUrl}
                      alt="image"
                      className="w-14 h-14"
                    />
                  </div>
                  <p className="w-16 text-sm md:text-base md:w-20">
                    {file.name}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-10">
                  <Slider
                    className="md:w-[250px]"
                    value={file.rarities}
                    onChange={(value) => onChangeRarities(value, index)}
                  />
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-full border-gray-light-1 bg-gray-dark-3">
                    <input
                      className="w-10 h-6 md:w-20 md:h-8 placeholder-gray-light-3 focus-visible:outline-0"
                      placeholder="25%"
                      value={file.rarities}
                      style={{ background: 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex">
                  <div className="flex items-center justify-center w-12 border-t border-b border-l rounded-l-full h-11 border-primary-light bg-primary-dark/30">
                    <p className="text-xl">%</p>
                  </div>
                  <div className="flex items-center justify-center w-12 border rounded-r-full h-11 bg-gray-dark1/30">
                    <p className="text-xl">#</p>
                  </div>
                </div>
                <p className="w-5 text-sm md:text-base">{file.rarities}%</p>
                <p className="text-sm md:text-base">
                  {Math.floor((traits.length * file.rarities) / 100)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Folder;
