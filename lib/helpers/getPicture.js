export const getPicture = (level) => {
   const imagePerPage = [45, 41, 40, 29, 29, 25]
   const lev = Number(level) + 1
   let random = Math.floor(Math.random() * imagePerPage[+level])
   if (random < 10) {
     random = `0${random}`
   }
   const url = `https://raw.githubusercontent.com/davinchick/rslang_data_paintings/master/level${lev}/${lev}_${random}.jpg`
   return `url(${url})`;
 }