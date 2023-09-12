export function isUriEmpty(uri: string | undefined) {
   return uri == undefined || uri == ""
}

export function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export function isSupportFile(extension: string) {
   let ext = extension.toLowerCase();
   if (ext == "jpg" || ext == "png" || ext == "svg" || ext == "webp")
      return true;
   return false;
}