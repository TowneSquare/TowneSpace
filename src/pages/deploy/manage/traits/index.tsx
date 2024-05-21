import SecondaryButton from '../../../../components/secondary_button';
import { useAppSelector } from '../../../../state/hooks';
import ButtonStatus from '../../../../type/button_status';
import Folder from './folder';

const Traits = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  return (
    <div className="min-w-[960px] max-w-[960px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-2xl md:text-3xl">Manage traits</p>
          <p className="text-base md:text-xl">
            Remove or update traits or upload new ones
          </p>
        </div>
        <SecondaryButton type={ButtonStatus.active}>
          <div className="flex gap-4">
            <img src="/deploy/upload-white.svg" alt="upload" />
            <p className="font-medium">Upload new assets</p>
          </div>
        </SecondaryButton>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {traits.map((folder, index) => (
          <Folder data={folder} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Traits;
