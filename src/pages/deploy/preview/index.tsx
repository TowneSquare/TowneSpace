import Header from '../header';
import ChooseTrait from './choose_trait';
import Navbar from './navbar';
import TokenPreview from './token_preview';
import Tokens from './tokens';

const Preview = () => {
  return (
    <div>
      <Header stepNumber={2} />
      <Navbar />
      <div className="flex flex-col gap-4 px-4 mt-8 md:px-6 md:flex-row">
        <ChooseTrait />
        <Tokens />
        <TokenPreview />
      </div>
    </div>
  );
};

export default Preview;
