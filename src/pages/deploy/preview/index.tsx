import Header from '../header';
import ChooseTrait from './choose_trait';
import Navbar from './navbar';
import TokenPreview from './token_preview';
import Tokens from './tokens';
import { useState } from 'react';

const Preview = () => {
  const [showChooseTrait, setShowChooseTrait] = useState(true);
  return (
    <div>
      <Navbar
        onSideBarToggle={() => {
          setShowChooseTrait((previous) => !previous);
        }}
        isSideBarActive={showChooseTrait}
      />
      <div className="flex flex-col gap-4 px-4 mt-8 md:px-6 md:flex-row">
        {showChooseTrait && <ChooseTrait />}
        <Tokens />
        <TokenPreview />
      </div>
    </div>
  );
};

export default Preview;
