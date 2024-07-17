import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateStep } from '../../state/create';
import { useState } from 'react';

interface Props {
  stepNumber: number;
  onNextButtonPressed?: () => void;
}

const Header: React.FC<Props> = ({ stepNumber, onNextButtonPressed }) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onClose = () => {
    navigate('/studio');
  };
  const currentStep = useAppSelector((state) => state.createState.step);
  const traits = useAppSelector((state) => state.createState.traits);
  const [buttonState, setButtonState] = useState<ButtonStatus>(
    ButtonStatus.inactive
  );

  const handleStep = () => {
    onNextButtonPressed?.();
    if (stepNumber >= 4) {
      console.log('Ddd');
      navigate('/deploy');
    } else {
      console.log('EE');
      navigate(steps[stepNumber].link);
    }
  };

  const steps = [
    { name: 'Upload assets', link: '/create/step1' },
    { name: 'Preview assets', link: '/create/step2' },
    { name: 'Set the traits order', link: '/create/step3' },
    { name: 'Select the base trait', link: '/create/step4' },
  ];

  useEffect(() => {
    dispath(updateStep(stepNumber));
    if (stepNumber === 1 && traits.length > 0) {
      setButtonState(ButtonStatus.active);
    } else if (stepNumber === 2 && traits.length > 0) {
      setButtonState(ButtonStatus.active);
    } else if (stepNumber > 2) {
      setButtonState(ButtonStatus.active);
    }
  }, [stepNumber, traits]);

  return (
    <div className="relative h-[124px] mx-4 md:mx-8 flex justify-center items-center">
      <div className=" left-0 absolute gap-9 flex items-center">
        <div className=" left-0 cursor-pointer" onClick={() => onClose()}>
          <p className="text-5xl font-[200]">×</p>
        </div>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="w-36 h-10 cursor-pointer flex items-center justify-center  bg-gray-dark-1  border rounded-full"
        >
          <p className="text-lg font-medium center md:text-base">Back</p>
        </div>
      </div>
      <div>
        <div className="flex justify-center gap-8 mt-2 space-x-2">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center gap-1">
              <div
                key={index}
                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${stepNumber === index + 1 ? 'bg-primary-light border-[3px] border-white text-white' : index < currentStep ? 'bg-primary-light text-white' : 'bg-gray-light-3 text-white'}`}
              >
                {index + 1}
              </div>
              <p
                className={`text-xl ${stepNumber === index + 1 && 'font-bold'} text-center`}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-0 ">
        <PrimaryButton
          type={buttonState}
          className="px-6 w-button-1 "
          onClick={() => handleStep()}
        >
          <p
            className={`${buttonState === ButtonStatus.inactive && 'opacity-40'}`}
          >
            Next
          </p>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
