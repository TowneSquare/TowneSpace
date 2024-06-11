import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateStep } from '../../state/create';

interface Props {
  stepNumber: number;
}

const Header: React.FC<Props> = ({ stepNumber }) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onClose = () => {
    navigate('/studio');
  };
  const currentStep = useAppSelector((state) => state.createState.step);

  const handleStep = () => {
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
  }, [stepNumber]);

  return (
    <div className="relative h-[124px] mx-4 md:mx-8 flex justify-center items-center">
      <div
        className="absolute left-0 w-4 h-4 cursor-pointer"
        onClick={() => onClose()}
      >
        <p className="text-3xl font-[200]">×</p>
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
      <div className="absolute right-0">
        <PrimaryButton
          type={ButtonStatus.active}
          className="px-14"
          onClick={() => handleStep()}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
