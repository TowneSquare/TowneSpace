import { lazy, Suspense } from 'react';
import { useAppSelector } from '../../../../state/hooks';

const Tokens = () => {
  const tokens = useAppSelector((state) => state.deployState.tokens);
  return (
    <div className="flex flex-wrap gap-4">
      {tokens.map((token, index) => {
        const Token = lazy(() => import('./token'));

        return (
          <Suspense fallback={<div></div>} key={index}>
            <Token token={token} index={index} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default Tokens;
