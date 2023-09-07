export function isUriEmpty(uri: string | undefined){
   return uri == undefined || uri == ""
}

export function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}