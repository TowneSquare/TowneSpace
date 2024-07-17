import { useEffect, lazy, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { FileType, TokenType } from '../../../../type/folder_type';
import { updateTokens } from '../../../../state/deploy';
import { generateTokens } from '../../../../util/generateToken';
const Tokens = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const tokens = useAppSelector((state) => state.deployState.tokens);
  const totalSupply = useAppSelector((state) => state.deployState.totalSupply);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const generatedTokens = generateTokens(traits, 0);
    dispatch(updateTokens(generatedTokens));
  }, [traits]);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-4 ">
      {tokens.slice(0, totalSupply).map((token, index) => {
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
