import React from 'react'

const words = [
   'doggy', 'ambiguous', 'mocking', 'explicit', 'judicious', 'robust', 'contiguous', 'deprecated', 'kitty', 'raccon'
];
const translation = [
   'пёся', 'двусмысленный', 'пародия', 'явный', 'рассудительный', 'здравый', 'прилегающий', 'возражающее', 'котя', 'енотя'
];




export function randomWord() {
   const ind = Math.floor(Math.random() * words.length);
   const word = words[ind];
   const transl = translation[ind];
   return [word, transl];
}
