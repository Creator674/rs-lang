import React from 'react';  
import { getWordsAndTranslationAndExamples } from '../../../lib/crud/auth';


export const Phrases = () => {
   
   return getWordsAndTranslationAndExamples(1,1)
       .then( (data) => {
         const dataArray = [];
         const arrayOfWords = data.map((el) => el[0]);
         const arrayOfTranslations = data.map((el) => el[1]);
         const arrayOfExamples = data.map((el) => el[2].replace(/<i[^>]*?>.*?<\/i>/is, `<span class="question">?</span>`));
         dataArray.push(arrayOfWords);
         dataArray.push(arrayOfTranslations);
         dataArray.push(arrayOfExamples);
         
        //  console.log( dataArray )
         return dataArray;
        })
        .catch((error) => error);
}