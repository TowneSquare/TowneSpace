import { useState } from 'react';
import CustomCheckbox from '../../../components/customcheckbox';
import { useAppSelector } from '../../../state/hooks';


const ChooseTrait = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[index] = checked;
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="min-w-[230px] flex flex-col gap-2 md:gap-4">
      {traits.map((trait, index) => (
        <div className="" key={index}>
          <p className="text-sm font-semibold md:text-base">{trait.name}</p>
          <div className="flex flex-col gap-1">
            {trait.files.map((file, index) => (
              <div className="flex gap-2" key={index}>
                <CustomCheckbox
                  checked={checkedState[index] || false} 
                  onChange={(checked) => handleCheckboxChange(index, checked)}
                />
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
