export interface TokenType {
  name: string;
  files: FileType[];
}
export interface FileType {
  name: string;
  folderName: string;
  file: File;
  imageUrl: string;
  rarities: number;
  isIncluded: boolean;
  rarityNumber?: number;
}
export default interface FolderType {
  name: string;
  files: FileType[];
}



export interface AssetImageData {
  name: string;
  image: Blob;
}

export interface ImageMetadata {
  name: string;
  percentage: number;
  rarityNumber?: number;
}
