import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../state/hooks';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import { updateGenerateStep } from '../../../state/deploy';

interface Props {}
const Header: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(updateGenerateStep(1));
    navigate('/deploy/generate');
  };

  const steps = [
    { name: 'Export Settings', link: '/generate/step1' },
    { name: 'Final review', link: '/generate/step2' },
    { name: 'Deploy assets', link: '/generate/step3' },
  ];

  const currentStep = 1;
  const currentstep = useAppSelector((state) => state.deployState.generateStep);

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
        <div className="flex justify-center gap-x-8 mt-2 ">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center gap-1">
              <div
                key={index}
                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${currentstep === index + 1 ? 'bg-primary-light border-[3px] border-white text-white' : currentstep > index + 1 ? 'bg-[#6646AE] text-white' : 'bg-gray-light-3 text-white'}`}
              >
                {index + 1}
              </div>
              <p
                className={`text-xl ${currentStep === currentstep && 'font-bold'} text-center`}
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
          onClick={() => {
            dispatch(updateGenerateStep(currentStep + 1));
            navigate(steps[currentStep].link);
          }}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
