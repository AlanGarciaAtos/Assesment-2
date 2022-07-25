import './main.scss';

import * as tingle from 'tingle.js';

// import * as axios from 'axios';
const axios = require('axios'); //In the docs they add .default.
const API_URL_ALL = 'https://restcountries.com/v3.1/all';

const API_URL = 'https://restcountries.com/v3.1/name/mexico';
const API_URL_TEST = 'https://restcountries.com/v3.1/name/';

enum Country {
  name,
  capital,
  region,
  languages,
  population,
}

/**
 * We're using the async/await syntax to make an HTTP request to the REST Countries API, and then we're
 * logging the name of the second country in the response to the console
 * With this we don't need to use a ton of .then()
 */
const obtainCountries = async () => {
  const countries: HTMLElement = document.getElementById('flags__card');

  try {
    //TODO Property 'get' does not exist on type 'typeof import(...)'
    const response = await axios.get(API_URL_ALL);

    let data = response.data;
    console.log(data);//Greenland

    if (response.status === 200) {
      //Trying this method to show it into the DOM
      console.log(response.data[0].name.common);

      let countryName = [];
      countryName = data.map((country: any) => country.name.common);
      console.log(countryName);

      response.innerHTML = `
        <section class="flags__card">
          <h2>${data[0].name.common}</h2>
        </section>`
      let countryElements: string = '';
      // Array.from(response).forEach((country: any) => {
      //   countries.innerHTML += `
      //     <section class="flags__card">
      //       <h2>${country.name.common}</h2>
      //       <h3>${hasCapital(country.capital)}</h3>
      //       <p>${country.region}</p>
      //       <p>${hasLanguage(country.languages)}</p>
      //       <p>${country.population}</p>
      //     </section>
      //   `
      // });
      // countries.innerHTML = countryElements;
    }
  } catch (err) {
    console.log(err);
  }
}

//Honestly I want to try <T>
function hasCapital<T>(capital: string) {
  return (capital) ? capital : 'No capital';
}

function hasLanguage(language: string) {
  return (language) ? language : 'No Language to display';
}

obtainCountries();

const flagsCard: HTMLElement = document.querySelector('.flags__card');
// console.log(`${API_URL}`);

//* Tingle js
const modalTinyNoFooter = new tingle.modal({
  onClose: function () {
    console.log('close');
  },
  onOpen: function () {
    console.log('open');
  },
  beforeOpen: function () {
    console.log('before open');
  },
  beforeClose: function () {
    console.log('before close');
    return true;
  },
});

const btn = document.querySelector('.js-tingle-modal-1');

btn.addEventListener('click', function () {
  modalTinyNoFooter.open();
});

modalTinyNoFooter.setContent(
  document.querySelector('.tingle-demo-tiny').innerHTML
);