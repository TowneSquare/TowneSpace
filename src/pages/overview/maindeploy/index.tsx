import Header from './header';
import Navbar from './header/navbar';
import ChooseTrait from './choose_trait';
import Tokens from './tokens';
import TokenPreview from './token_preview';
import Search from '../../studio/tokens/collection_panel/search';

const MainDeploy = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex flex-col w-full">
        <div className="pl-[274px] pr-16 mt-12">
          <Search />
        </div>
        <div className="mt-8 px-4 md:px-6 flex flex-col md:flex-row gap-4">
          <ChooseTrait />
          <Tokens />
          <TokenPreview />
        </div>
      </div>
    </div>
  );
};

export default MainDeploy;
