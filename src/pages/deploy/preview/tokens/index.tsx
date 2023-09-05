import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../state/hooks";
import { FileType } from "../../../../type/folder_type";
import Token from "./token";

const Tokens = () => {
   const traits = useAppSelector(state => state.createState.traits);
   const [tokens, setTokens] = useState<FileType[][]>([]);
   useEffect(() => {
      const tokens: FileType[][] = [];
      const generateTokens = (token: FileType[], index: number) => {
         if (index >= traits.length) {
            tokens.push(token);
            return;
         }
         for (let i = 0; i < traits[index].files.length; i++) {
            generateTokens([...token, traits[index].files[i]], index + 1);
         }
      }
      generateTokens([], 0);
      setTokens(tokens);
   }, [traits])

   return (
      <div className="flex flex-wrap gap-4">
         {tokens.map((token, index) => (
            <Token data={token} index={index} />
         ))}
      </div>
   )
};

export default Tokens;