import './main.scss';

const axios = require('axios'); //In the docs they add .default.
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const API_URL = 'https://restcountries.com/v3.1/name/mexico';
const API_URL_TEST = 'https://restcountries.com/v3.1/name/';

const countries = document.getElementById('flags__card');
/**
 * We're using the async/await syntax to make an HTTP request to the REST Countries API, and then we're
 * logging the name of the second country in the response to the console
 * With this we don't need to use a ton of .then()
 */
const obtainCountries = async() => {
  try {
    const response = await axios.get(API_URL_ALL)
    
    
    // console.log(response.data[1].name.common); 
    // console.log(response.data[1].capital[0]); //array
    // console.log(response.data[1].region); 
    // console.log(response.data[1].languages.spa);
    // console.log(response.data[1].population); 

    if(response.status === 200) {
      // response.innerHTML = `
      //   <section class="flags__card">
      //     <h2>${response.data[1].name.common}</h2>
      //     <h3>${response.data[1].capital}</h3>
      //     <p>${response.data[1].region}</p>
      //     <p>${response.data[1].languages.spa}</p>
      //     <p>${response.data[1].population}</p>
      //   </section>
      // 
      let countryElements = '';
      Array.from(response).forEach((country:any) => {
        country.innerHTML += `
          <section class="flags__card">
            <h2>${country.name.common}</h2>
            <h3>${country.capital}</h3>
            <p>${country.region}</p>
            <p>${country.languages}</p>
            <p>${country.population}</p>
          </section>
        `


      });

      // countries.innerHTML = countryElements;
    }
  } catch (err) {
    console.log(err);
  }
}

obtainCountries();

//Maybe add later
function handleResult(data:any):void {
  console.log(data);
}

const flagsCard = document.querySelector('.flags__card');
// console.log(`${API_URL}`);

