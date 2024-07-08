import { useState } from 'react';
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
  const [rarityIndexNumber, setRarityIndexNumber] = useState<string[]>([]);

  const onChangeRarities = (value: number, index: number) => {
    dispatch(updateRarities({ iFolder, iFile: index, value }));
  };
  return (
    <div className="px-6 py-2 rounded-md md:py-4 bg-gray-dark-2">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold md:text-xl">{data.name}</p>
      </div>
      <div className="flex flex-col gap-10 mt-8 md:gap-4">
        <div className="grid grid-cols-12 pr-8 items-center ">
          <div className="flex col-span-3 justify-between ">
            <p className="text-sm">TRAIT</p>
          </div>
          <div className="col-span-9 ">
            <div className="grid grid-cols-10">
              <div className="col-span-6 ">
                <p className="text-sm">RARITY</p>
              </div>
              <div className="col-span-4 pl-10 flex justify-between">
                <p className="w-24"></p>
                <div className="flex justify-between">
                  <p className="text-sm w-[40.22px] text-left">EST.%</p>
                  <p className="w-14 text-right text-sm">EST.#</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data.files.map((file, index) => (
          <div className="grid grid-cols-12 items-center pr-8 " key={index}>
            <div className="rounded-md col-span-3 flex gap-3">
              <img
                src={file.imageUrl}
                alt="image"
                className="w-14 h-14 rounded-md"
              />
              <div className="flex items-center gap-2 md:gap-4">
                <p className="w-16 text-sm md:text-base md:w-20">{file.name}</p>
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-10">
                <div className="col-span-6 ">
                  <div className="flex gap-8 items-center ">
                    {!rarityIndexNumber.includes(`${iFolder}-${index}`) && (
                      <Slider
                        className="md:w-[250px] ml-3"
                        value={!file.rarities ? 0 : file.rarities}
                        onChange={(value) => onChangeRarities(value, index)}
                      />
                    )}
                    <div
                      className={`${rarityIndexNumber.includes(`${iFolder}-${index}`) ? 'items-center px-4 py-2 border rounded-full border-gray-light-1 bg-gray-dark-3 w-[385px]' : 'items-center px-4 py-2 border rounded-full border-gray-light-1 bg-gray-dark-3'}`}
                    >
                      <input
                        className=" h-6 md:w-14 md:h-8 placeholder-gray-light-3  focus-visible:outline-0"
                        placeholder="25%"
                        value={isNaN(file.rarities) ? '' : file.rarities}
                        style={{ background: 'none' }}
                        onInput={(e) =>
                          onChangeRarities(
                            parseInt(e.currentTarget.value),
                            index
                          )
                        }
                        disabled={
                          !rarityIndexNumber.includes(`${iFolder}-${index}`)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 pl-10 flex justify-between items-center ">
                  <div className="flex">
                    <div
                      onClick={() => {
                        setRarityIndexNumber(
                          rarityIndexNumber.filter(
                            (item) => item !== `${iFolder}-${index}`
                          )
                        );
                      }}
                      className={
                        rarityIndexNumber.includes(`${iFolder}-${index}`)
                          ? `flex items-center justify-center w-12 border-t border-b border-l  rounded-l-full h-11 cursor-pointer `
                          : `flex items-center justify-center w-12 border-t border-b border-l  rounded-l-full h-11 cursor-pointer border-primary-light bg-primary-dark/30`
                      }
                    >
                      <p className="text-xl">%</p>
                    </div>
                    <div
                      onClick={() => {
                        setRarityIndexNumber([
                          ...rarityIndexNumber,
                          `${iFolder}-${index}`,
                        ]);
                      }}
                      className={
                        rarityIndexNumber.includes(`${iFolder}-${index}`)
                          ? `flex border-l border  bg-primary-dark/30   items-center justify-center w-12  border-primary-light cursor-pointer rounded-r-full h-11 bg-gray-dark1/30`
                          : `flex border-l-primary-light   items-center justify-center w-12  border rounded-r-full h-11  cursor-pointer bg-gray-dark1/30`
                      }
                    >
                      <p className="text-xl">#</p>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm md:text-base">
                      {isNaN(file.rarities) ? 0 : file.rarities}%
                    </p>
                    <p className="w-14 text-right  text-sm md:text-base">
                      {isNaN(file.rarities)
                        ? 0
                        : Math.floor((traits.length * file.rarities) / 100)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Folder;
