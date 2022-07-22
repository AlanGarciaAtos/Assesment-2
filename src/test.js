//https://restcountries.com/v3.1/all

const API_URL = 'https://restcountries.com/v3.1/all';

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log('Not found'));

//git rm  -rf --cached .
