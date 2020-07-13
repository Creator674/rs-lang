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

export const gamesMiniStatistic = (appStatistics, gameName, guessed, faults=0) => {
   let game
   const date = +new Date();
   const amount = faults + guessed
   if(appStatistics.hasOwnProperty(gameName)){
      game = appStatistics[gameName]
      game[date] = {}
      game[date]['amount'] = amount
      game[date]['faults'] = faults
      game[date]['guessed'] = guessed
   } else {
      appStatistics[gameName] = {}
      appStatistics[gameName][date] = {}
      appStatistics[gameName][date]['amount'] = amount
      appStatistics[gameName][date]['faults'] = faults
      appStatistics[gameName][date]['guessed'] = guessed
      return appStatistics[gameName]
   }
   return game
}

export const learnWordsStatistic = (appStatistics, id, faults, guessed) => {
   let word
   const date = +new Date();
   if(appStatistics.hasOwnProperty(id)){
      word = appStatistics[id]
      word[date] = {} 
      word[date]['faults'] = faults 
      word[date]['guessed'] = guessed 
   } else {
      appStatistics[id] = {}
      appStatistics[id][date] = {} 
      appStatistics[id][date]['faults'] = faults 
      appStatistics[id][date]['guessed'] = guessed 
   }
   return word
}