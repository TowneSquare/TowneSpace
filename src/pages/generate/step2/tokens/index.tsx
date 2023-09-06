import { useEffect, useState, lazy, Suspense } from "react";
import { useAppSelector } from "../../../../state/hooks";
import { FileType, TokenType } from "../../../../type/folder_type";

const Tokens = () => {
   const traits = useAppSelector(state => state.createState.traits);
   const tokenName = useAppSelector(state => state.deployState.tokenName);

   const [tokens, setTokens] = useState<TokenType[]>([]);

   useEffect(() => {
      const tokens: TokenType[] = [];
      let tokenNum = 0;
      const generateTokens = (files: FileType[], index: number) => {
         if (index >= traits.length) {
            tokenNum++;
            tokens.push({ name: `${tokenName} #${tokenNum}`, files: files });
            return;
         }
         for (let i = 0; i < traits[index].files.length; i++) {
            generateTokens([...files, traits[index].files[i]], index + 1);
         }
      }
      generateTokens([], 0);
      setTokens(tokens);
   }, [traits])

   return (
      <div className="flex flex-wrap gap-4">
         {tokens.map((token, index) => {
            const Token = lazy(() => import("./token"))

            return (
               <Suspense fallback={<div>LOADING</div>}>
                  <Token token={token} index={index} />
               </Suspense>
            )
         })}
      </div>
   )
};

export default Tokens;