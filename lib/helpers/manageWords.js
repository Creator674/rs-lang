export const needMore = (userWordsCount, perDay) => {
  if (userWordsCount < perDay) return perDay - userWordsCount
  return false
}