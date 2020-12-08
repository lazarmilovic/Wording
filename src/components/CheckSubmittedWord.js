const CheckSubmittedWord = async (word) => {
  let key = "f4hj4iw6j8oom1pjgjlbdsi4sym38au1rjp1dmcs414eruuej";
  let resp = await fetch(`https://api.wordnik.com/v4/word.json/${word}/scrabbleScore?api_key=${key}
    `);
  let data = await resp.json();
  return data;
};

export default CheckSubmittedWord;
