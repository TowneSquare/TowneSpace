import { useAppSelector } from '../../../state/hooks';
import CustomCheckbox from '../../../components/customcheckbox';
import { useState, useEffect } from 'react';
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
      {traits.map((trait, index) => (
        <div className="" key={index}>
          <p className="text-sm md:text-base font-semibold">{trait.name}</p>
          <div className="flex flex-col gap-1">
            {trait.files.map((file, index) => (
              <div className="flex gap-2" key={index}>
                <input type="checkbox" />
                <p className="text-sm md:text-base">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseTrait;
