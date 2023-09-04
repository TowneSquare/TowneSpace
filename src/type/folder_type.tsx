export interface FileType{
   name: string;
   file: File;
   imageUrl: string;
}
export default interface FolderType {
   [key: string]: FileType[];
}
