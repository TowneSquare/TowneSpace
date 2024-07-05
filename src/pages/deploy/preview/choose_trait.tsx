import { useState } from 'react';
import CustomCheckbox from '../../../components/customcheckbox';
import { useAppSelector } from '../../../state/hooks';

const ChooseTrait = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [hidePropertiesIndex, setPropertyIndex] = useState<number[]>([]);
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[index] = checked;
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="min-w-[230px] flex flex-col gap-2 md:gap-4">
      {traits.map((trait, index) => (
        <div className="" key={index}>
          <div
            onClick={() =>
              hidePropertiesIndex?.includes(index)
                ? setPropertyIndex(
                    hidePropertiesIndex.filter((i) => i !== index)
                  )
                : setPropertyIndex([...hidePropertiesIndex, index])
            }
            className="flex  justify-between "
          >
            <p className="text-sm font-semibold mb-1 md:text-base">
              {trait.name}
            </p>
            <img
              className={`${hidePropertiesIndex?.includes(index) && 'rotate-180'}`}
              src="/preview/DropDown.svg"
              alt="hide"
            />
          </div>
          <div className="flex flex-col ">
            {!hidePropertiesIndex.includes(index) &&
              trait.files.map((file, index) => (
                <div className="flex gap-2 items-center py-1 " key={index}>
                  <CustomCheckbox
                    checked={checkedState[index] || false}
                    onChange={(checked) => handleCheckboxChange(index, checked)}
                  />
                  <p className="text-sm md:text-base">{file.name}</p>
                  <p className="text-sm md:text-base">{file.file.size}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseTrait;
