import Preview from '../nftcustomize/preview';
import Header from './header';
import Replace from './replace';
import Traits from './traits';
import { useAppSelector } from '../../state/hooks';
import ExitEdit from './exitedit';
import FinishEdit from './finishedit';

const NftCustomize = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  return (
    <div className="relative">
      <Header />
      <div className="md:mx-20 lg:mx-32 flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
        <Preview />
        <Traits />
        <Replace />
      </div>
      <ExitEdit />
      <FinishEdit />
    </div>
  );
};

export default NftCustomize;
