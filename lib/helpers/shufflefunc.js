//  -------- Set of numbers in random order

export function shuffledArray(length){
   const arr = Array.from({ length: length }, (_v, i=0) => i);
   for (let i = arr.length - 1; i > 0; i -= 1) {
     const j = Math.floor(Math.random() * (i + 1));
     [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}


//  --------- Array of random numbers

export function shuffledRandomArray(length){
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    const j = Math.floor(Math.random() * length);
    arr.push(j);
  }
  return arr;
}