import { useState, useEffect } from 'react';
import Slider from '../../../../components/slider';
import { updateRarities, updateRarityNumber } from '../../../../state/create';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import FolderType from '../../../../type/folder_type';
import { toast } from 'react-toastify';
import { updateTraitswithPercentage } from '../../../../state/deploy';
interface Trait {
  imageUrl: string;
  name: string;
  percentage: number;
  rarityNumber: number;
  isUserSet: boolean;
}

interface Props {
  data: FolderType;
  iFolder: number;
}

const Folder: React.FC<Props> = ({ data, iFolder }) => {
  const dispatch = useAppDispatch();

  const nftCollectionSize = useAppSelector(
    (state) => state.deployState.totalSupply
  );
  const traitsWithPercentage = useAppSelector(
    (state) => state.deployState.traitsWithPercentage
  );
  console.log('======== traits =======');
  console.log(traitsWithPercentage);
  // const [traitsWithPercentage, setTraitsWithPercentage] = useState<Trait[]>([]);
  const [rarityIndexNumber, setRarityIndexNumber] = useState<string[]>([]);

  useEffect(() => {
    if (
      typeof traitsWithPercentage[iFolder]?.length === 'undefined' ||
      traitsWithPercentage[iFolder].length === 0
    ) {
      const initialTraits = data.files.map((dat) => {
        const evenPercentage = 100 / data.files.length;
        const evenRarityNumber = Math.floor(
          (evenPercentage / 100) * nftCollectionSize
        );
        return {
          imageUrl: dat.imageUrl,
          name: dat.name,
          percentage: Number(evenPercentage.toFixed(1)),
          rarityNumber: Number(evenRarityNumber.toFixed(1)),
          isUserSet: false,
        };
      });

      // update traits with percentage in the store using the index of the folder
      dispatch(
        updateTraitswithPercentage({
          trait: initialTraits,
          indexNumber: iFolder,
        })
      );
    }
  }, []);

  const redistributeValues = (
    changedIndex: number,
    changedValue: number,
    isPercentage: boolean
  ) => {
    if (isPercentage) {
      let remainingPercentage = 100 - changedValue;
      let numUnsetTraits = traitsWithPercentage[iFolder].filter(
        (trait, index) => !trait.isUserSet && index !== changedIndex
      ).length;
      let newTraits = traitsWithPercentage[iFolder].map((trait, index) => {
        if (index === changedIndex) {
          return { ...trait, percentage: changedValue, isUserSet: true };
        }
        if (!trait.isUserSet) {
          return {
            ...trait,
            percentage: remainingPercentage / numUnsetTraits,
          };
        }
        return trait;
      });
      dispatch(
        updateTraitswithPercentage({ trait: newTraits, indexNumber: iFolder })
      );
      dispatch(
        updateRarities({ iFolder, iFile: changedIndex, value: changedValue })
      );

      const totalPercentage = newTraits.reduce(
        (acc, trait) => acc + trait.percentage,
        0
      );
      const newTraitsWithNumbers = newTraits.map((trait) => ({
        ...trait,
        rarityNumber: Math.floor(
          (trait.percentage / totalPercentage) * nftCollectionSize
        ),
      }));
      dispatch(
        updateTraitswithPercentage({
          trait: newTraitsWithNumbers,
          indexNumber: iFolder,
        })
      );
    } else {
      let remainingNumber = nftCollectionSize - changedValue;
      let numUnsetTraits = traitsWithPercentage[iFolder].filter(
        (trait, index) => !trait.isUserSet && index !== changedIndex
      ).length;
      let newTraits = traitsWithPercentage[iFolder].map((trait, index) => {
        if (index === changedIndex) {
          return { ...trait, rarityNumber: changedValue, isUserSet: true };
        }
        if (!trait.isUserSet) {
          return {
            ...trait,
            rarityNumber: Math.floor(remainingNumber / numUnsetTraits),
          };
        }
        return trait;
      });
      dispatch(
        updateTraitswithPercentage({ trait: newTraits, indexNumber: iFolder })
      );
      dispatch(
        updateRarityNumber({
          iFolder,
          iFile: changedIndex,
          value: changedValue,
        })
      );

      const totalRarity = newTraits.reduce(
        (acc, trait) => acc + trait.rarityNumber,
        0
      );
      const newTraitsWithPercentages = newTraits.map((trait) => ({
        ...trait,
        percentage: (trait.rarityNumber / totalRarity) * 100,
      }));
      dispatch(
        updateTraitswithPercentage({
          trait: newTraitsWithPercentages,
          indexNumber: iFolder,
        })
      );
    }
  };

  const onChangeValue = (
    value: number,
    index: number,
    isPercentage: boolean
  ) => {
    if (isPercentage) {
      if (value < 0 || value > 100) {
        toast.error('Percentage must be between 0 and 100');
        return;
      }
      let totalSetPercentage = traitsWithPercentage[iFolder].reduce(
        (acc, trait, idx) => {
          if (idx !== index) {
            return trait.isUserSet ? acc + trait.percentage : acc;
          }
          return acc;
        },
        0
      );

      if (totalSetPercentage + value > 100) {
        toast.error('Total percentage cannot exceed 100%');
        return;
      }
    } else {
      if (value < 0 || value > nftCollectionSize) {
        toast.error(`Rarity number must be between 0 and ${nftCollectionSize}`);
        return;
      }
      let totalSetNumber = traitsWithPercentage[iFolder].reduce(
        (acc, trait, idx) => {
          if (idx !== index) {
            return trait.isUserSet ? acc + trait.rarityNumber : acc;
          }
          return acc;
        },
        0
      );

      if (totalSetNumber + value > nftCollectionSize) {
        toast.error(`Total rarity number cannot exceed collection size`);
        return;
      }
    }
    redistributeValues(index, value, isPercentage);
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

        {traitsWithPercentage[iFolder]?.map((file, index) => (
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
                        value={Number(file.percentage?.toFixed(1))}
                        onChange={(value) => {
                          const floatValue = parseFloat(value as any);
                          if (!isNaN(floatValue)) {
                            const isPercentage = !rarityIndexNumber.includes(
                              `${iFolder}-${index}`
                            );
                            onChangeValue(floatValue, index, isPercentage);
                          } else {
                            console.error('Invalid slider value:', value);
                          }
                        }}
                      />
                    )}
                    <div
                      className={`${
                        rarityIndexNumber.includes(`${iFolder}-${index}`)
                          ? 'items-center px-4 py-2 border rounded-full border-gray-light-1 bg-gray-dark-3 w-[385px]'
                          : 'items-center px-4 py-2 border rounded-full border-gray-light-1 bg-gray-dark-3'
                      }`}
                    >
                      <input
                        className=" h-6 md:w-14 md:h-8 placeholder-gray-light-3  focus-visible:outline-0"
                        placeholder="25%"
                        value={
                          rarityIndexNumber.includes(`${iFolder}-${index}`)
                            ? isNaN(file.rarityNumber)
                              ? ''
                              : file.rarityNumber
                            : isNaN(Number(file.percentage?.toFixed(1)))
                              ? ''
                              : Number(file.percentage?.toFixed(1))
                        }
                        style={{ background: 'none' }}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          if (value === '') {
                            if (
                              rarityIndexNumber.includes(`${iFolder}-${index}`)
                            ) {
                              onChangeValue(0, index, false);
                            } else {
                              onChangeValue(0, index, true);
                            }
                          } else {
                            const floatValue = parseFloat(value);
                            if (!isNaN(floatValue)) {
                              if (
                                rarityIndexNumber.includes(
                                  `${iFolder}-${index}`
                                )
                              ) {
                                onChangeValue(floatValue, index, false);
                              } else {
                                onChangeValue(floatValue, index, true);
                              }
                            }
                          }
                        }}
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
                      {isNaN(file.percentage)
                        ? '0.0'
                        : file.percentage.toFixed(1)}
                      %
                    </p>
                    <p className="w-14 text-right  text-sm md:text-base">
                      {Math.round(file.rarityNumber) || 0}
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
