import { useAppSelector } from '../../../../state/hooks';
import Folder from './folder';

const Rarities = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  return (
    <div className="min-w-[960px] max-w-[960px]">
      <div className="">
        <p className="text-2xl md:text-3xl">Rarities</p>
        <p className="text-base md:text-xl text-gray-light-1">
          Set how often or rarely each trait will appear in the collection
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {traits.map((folder, index) => (
          <Folder data={folder} iFolder={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Rarities;
