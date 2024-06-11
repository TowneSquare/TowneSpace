import SecondaryButton from '../../../../components/secondary_button';
import { useAppSelector } from '../../../../state/hooks';
import ButtonStatus from '../../../../type/button_status';
import Folder from './folder';
import { useNavigate } from 'react-router-dom';


const Traits = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const navigate = useNavigate();

  return (
    <div className="min-w-[960px] max-w-[960px]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <p className="text-2xl md:text-3xl">Manage traits</p>
          <p className="text-base md:text-xl">
            Remove or update traits or upload new ones
          </p>
        </div>
        <SecondaryButton type={ButtonStatus.active} onClick={() => navigate('/create/step1')}>
          <div className="flex gap-4">
            <img src="/deploy/upload-white.svg" alt="upload" />
            <p className="font-medium">Upload new assets</p>
          </div>
        </SecondaryButton>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        {traits.map((folder, index) => (
          <Folder data={folder} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Traits;
