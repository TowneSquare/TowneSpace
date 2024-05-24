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
    <div className="px-6 py-2 md:py-4 bg-gray-dark-2 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-base md:text-xl font-semibold">{data.name}</p>
        {/* <p className="text-sm md:text-base">{data.files.length} Traits</p> */}
      </div>
      <div className="mt-8 flex flex-col gap-10 md:gap-4">
        <div className="flex items-center ">
          <div className="flex gap-4 w-44">
            <p className="text-sm">TRAIT</p>
          </div>
          <div className="flex gap-4 w-[582px]">
            <p className="text-sm">RARITY</p>
          </div>
          <div className="flex gap-4">
            <p className="text-sm w-10">EST.%</p>
            <p className="text-sm w-5">EST.#</p>
          </div>
        </div>
        {data.files.map((file, index) => (
          <div className="flex items-center" key={index}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10">
              <div className="flex gap-2 md:gap-10">
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="bg-gray-light-1 rounded-md">
                    <img
                      src={file.imageUrl}
                      alt="image"
                      className="w-14 h-14"
                    />
                  </div>
                  <p className="text-sm md:text-base w-16 md:w-20">
                    {file.name}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-10">
                  <Slider
                    className="md:w-[250px]"
                    value={file.rarities}
                    onChange={(value) => onChangeRarities(value, index)}
                  />
                  <div className="px-4 py-2 flex items-center gap-2 border border-gray-light-1 rounded-full bg-gray-dark-3">
                    <input
                      className="w-10 md:w-20 h-6 md:h-8 placeholder-gray-light-3 focus-visible:outline-0"
                      placeholder="25%"
                      value={file.rarities}
                      style={{ background: 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex">
                  <div className="w-12 h-11 flex justify-center items-center border-l border-t border-b border-primary-light rounded-l-full bg-primary-dark/30">
                    <p className="text-xl">%</p>
                  </div>
                  <div className="w-12  h-11 flex justify-center items-center border rounded-r-full bg-gray-dark1/30">
                    <p className="text-xl">#</p>
                  </div>
                </div>
                <p className="text-sm md:text-base w-5">{file.rarities}%</p>
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
