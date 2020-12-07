const FetchTheWord = async () => {
  let key = "f4hj4iw6j8oom1pjgjlbdsi4sym38au1rjp1dmcs414eruuej";
  let resp = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=13&maxLength=13&api_key=${key}
    `);
  let data = await resp.json();
  return data.word;
};

export default FetchTheWord;
