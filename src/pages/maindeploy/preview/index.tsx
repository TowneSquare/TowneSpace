import ChooseTrait from './choose_trait';
import Navbar from './navbar';
import TokenPreview from './token_preview';
import Tokens from './tokens';
import Header from '../overview/header';
import DeployedAlert from '../../../components/modal/deployedAlert';

const Preview = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="mt-4">
        <DeployedAlert />
      </div>
      <Navbar />
      <div className="mt-4 px-4 md:px-6 flex flex-col md:flex-row gap-4">
        <ChooseTrait />
        <Tokens />
        <TokenPreview />
      </div>
    </div>
  );
};

export default Preview;
