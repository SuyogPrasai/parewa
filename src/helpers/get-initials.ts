export default function getInitial(author: string) {
  if (!author) return '';

  const words = author.trim().split(/\s+/); // split by space(s)
  
  for (let word of words) {
    if (!/^\d/.test(word)) {
      return word[0].toUpperCase();
    }
  }

  return ''; // fallback if all words start with numbers
}
