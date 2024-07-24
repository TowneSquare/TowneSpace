import { useState, useEffect } from 'react';
import CustomCheckbox from '../../../components/customcheckbox';
import { useAppSelector } from '../../../state/hooks';

const ChooseTrait = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const [checkedState, setCheckedState] = useState<Array<boolean[]>>([]);
  const [hidePropertiesIndex, setPropertyIndex] = useState<number[]>([]);

  // Initialize checkedState based on traits
  useEffect(() => {
    const initialState = traits.map((trait) =>
      new Array(trait.files.length).fill(false)
    );
    setCheckedState(initialState);
  }, [traits]);

  const handleCheckboxChange = (
    parentIndex: number,
    index: number,
    checked: boolean
  ) => {
   
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === parentIndex ? [...item] : item
    );
    if (!updatedCheckedState[parentIndex]) {
      updatedCheckedState[parentIndex] = [];
    }
    updatedCheckedState[parentIndex][index] = checked;
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="min-w-[230px] flex flex-col gap-2 md:gap-4">
      {traits.map((trait, parentindex) => (
        <div key={parentindex}>
          <div
            onClick={() =>
              hidePropertiesIndex.includes(parentindex)
                ? setPropertyIndex(
                    hidePropertiesIndex.filter((i) => i !== parentindex)
                  )
                : setPropertyIndex([...hidePropertiesIndex, parentindex])
            }
            className="flex justify-between"
          >
            <p className="text-sm font-semibold mb-1 md:text-base">
              {trait.name}
            </p>
            <img
              className={`${hidePropertiesIndex.includes(parentindex) ? 'rotate-180' : ''}`}
              src="/preview/DropDown.svg"
              alt="hide"
            />
          </div>
          <div className="flex flex-col">
            {!hidePropertiesIndex.includes(parentindex) &&
              trait.files.map((file, index) => (
                <div className="flex gap-2 items-center py-1" key={index}>
                  <CustomCheckbox
                    checked={checkedState[parentindex]?.[index] || false}
                    onChange={(checked) =>
                      handleCheckboxChange(parentindex, index, checked)
                    }
                  />
                  <p className="text-sm md:text-base">{file.name}</p>
                  <p className="text-sm md:text-base text-gray-light-2">
                    ({trait.files.length})
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseTrait;
