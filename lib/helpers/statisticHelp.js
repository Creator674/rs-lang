export const addToStatisticfunc = (appStatistics, id, gameName, boolean) => {
   if(id){
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
}

export const gamesMiniStatistic = (appStatistics, gameName, guessed, faults=0) => {
   if(gameName){
      let game

      const options = {
         month: "long",
         day: "numeric",
         weekday: "short",
         hour: "numeric",
       }; 
      const date = new Date(Date.now()-20031).toLocaleString('en', options);

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
}

export const learnWordsStatistic = (appStatistics, id, bool) => {
   if(id){
      let word
      const isGuessed = bool ? 'guessed' : 'faults'

      const options = {
         month: "long",
         day: "numeric",
         weekday: "short",
       }; 
      const date = new Date(Date.now()-20031).toLocaleString('en', options);

      if(appStatistics.hasOwnProperty(id)){
         word = appStatistics[id]
         if(word[date]){
            if(word[date][isGuessed]){
              word[date][isGuessed] += 1
            } else {
              word[date][isGuessed] = 1
            }
         } else {
            word[date] = {} 
            word[date][isGuessed] = 1 
         }
      } else {
         appStatistics[id] = {}
         appStatistics[id][date] = {} 
         appStatistics[id][date][isGuessed] = 1 
      }
      return word
   }
}
