import { TokenType, FileType } from '../type/folder_type';
import FolderType from '../type/folder_type';

/**
 * Generates tokens based on the provided files, index, and traits.

 * @param index - The current index.
 * @param traits - An array of FolderType objects.
 * @returns An array of TokenType objects.
 */
export const generateTokens = (
  traits: FolderType[],
  index: number
): TokenType[] => {
  let tokens: TokenType[] = [];
  let tokenNum = 0;

  const generate = (files: FileType[], index: number) => {
    if (index >= traits.length) {
      tokenNum++;
      tokens.push({ name: `#${tokenNum}`, files: files });
      return;
    }
    for (let i = 0; i < traits[index].files.length; i++) {
      generate([...files, traits[index].files[i]], index + 1);
    }
  };

  generate([], index); // Start the recursive generation with an empty array and at the first trait
  return tokens;
};
