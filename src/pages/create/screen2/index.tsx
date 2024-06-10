import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../state/hooks';
import FolderType from '../../../type/folder_type';
import Header from '../../../components/create/header';

const Screen4 = () => {
  const navigate = useNavigate();
  const traits = useAppSelector((state) => state.createState.traits);

  return (
    <div className="pb-10">
      <Header stepNumber={2} />
      <p className="mt-8 text-base text-center md:text-xl">
        Check how are you assets named and how they look like.
        <br />
        If there are errors, you can always &nbsp;
        <span
          className="!text-[20px] md:text-base text-primary-light cursor-pointer"
          onClick={() => navigate('/create/step1')}
        >
          upload them again
        </span>
      </p>
      <div className="flex flex-col gap-8 mt-16">
        {traits.map((trait, index) => (
          <Trait data={trait} key={index} />
        ))}
      </div>
    </div>
  );
};

const Trait = ({ data }: { data: FolderType }) => {
  return (
    <div className="p-4 mx-4 rounded-md md:mx-20 lg:mx-32 bg-gray-dark-2">
      <div className="flex justify-between w-full">
        <p className="text-base font-semibold md:text-xl">{data.name}</p>
        <p className="text-sm md:text-base">{data.files.length} Traits</p>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {data.files.map((file, index) => (
          <div className="w-32 rounded-md" key={index}>
            <div className="h-32 rounded-md bg-gray-light-3">
              <img src={file.imageUrl} alt="image" className="w-32 h-32" />
            </div>
            <p className="mt-2 text-sm text-center md:text-base">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Screen4;
