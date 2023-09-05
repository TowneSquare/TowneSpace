export interface FileType{
   name: string;
   file: File;
   imageUrl: string;
}
export default interface FolderType {
   name: string;
   files: FileType[]
}
