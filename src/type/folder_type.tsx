export interface TokenType{
   name: string;
   files: FileType[]
}
export interface FileType{
   name: string;
   folderName: string;
   file: File;
   imageUrl: string;
   rarities: number;
   isIncluded: boolean;
}
export default interface FolderType {
   name: string;
   files: FileType[]
}
