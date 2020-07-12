export const addToStatisticfunc = (appStatistics, id, gameName, boolean) => {
   let word
   if(appStatistics.hasOwnProperty(id)){
      word = appStatistics[id]
      if(word[gameName]){
         if(word[gameName][boolean]){
            word[gameName][boolean] = word[gameName][boolean] + 1; 
         } else {
            word[gameName][boolean] = {}
            word[gameName][boolean] = 1; 
         }
      } else {
         word[gameName] ={}
         word[gameName][boolean] = 1; 
      }
   } else {
      appStatistics[id] = {}
      appStatistics[id][gameName] = {}
      appStatistics[id][gameName][boolean] = 1;
   }
   return word
}