export interface TokenType{
   name: string;
   files: FileType[]
}
export interface FileType{
   name: string;
   folderName: string;
   file: File;
   imageUrl: string;
}
export default interface FolderType {
   name: string;
   files: FileType[]
}
