import { useEffect, lazy, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { FileType, TokenType } from '../../../../type/folder_type';
import { updateTokens } from '../../../../state/deploy';

const Tokens = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const tokens = useAppSelector((state) => state.deployState.tokens);
  const totalSupply = useAppSelector((state) => state.deployState.totalSupply);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokens: TokenType[] = [];
    let tokenNum = 0;
    const generateTokens = (files: FileType[], index: number) => {
      if (index >= traits.length) {
        tokenNum++;
        tokens.push({ name: `#${tokenNum}`, files: files });
        return;
      }
      for (let i = 0; i < traits[index].files.length; i++) {
        generateTokens([...files, traits[index].files[i]], index + 1);
      }
    };
    generateTokens([], 0);
    dispatch(updateTokens(tokens));
  }, [traits]);

  return (
    <div className="flex h-20 flex-wrap gap-4">
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
