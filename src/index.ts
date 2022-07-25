import './main.scss';

const tingle = require('tingle.js');
const axios = require('axios'); //In the docs they add .default.
const API_URL_ALL = 'https://restcountries.com/v3.1/all';

const API_URL = 'https://restcountries.com/v3.1/name/mexico';
const API_URL_TEST = 'https://restcountries.com/v3.1/name/';

/**
 * We're using the async/await syntax to make an HTTP request to the REST Countries API, and then we're
 * logging the name of the second country in the response to the console
 * With this we don't need to use a ton of .then()
 */
const obtainCountries = async() => {
  const countries:HTMLElement = document.getElementById('flags__card');

  try {
    const response = await axios.get(API_URL_ALL)

    if(response.status === 200) {
      //Trying this method to show it into the DOM
      // response.innerHTML = `
      //   <section class="flags__card">
      //     <h2>${response.data[1].name.common}</h2>
      //     <h3>${response.data[1].capital}</h3>
      //     <p>${response.data[1].region}</p>
      //     <p>${response.data[1].languages.spa}</p>
      //     <p>${response.data[1].population}</p>
      //   </section>
      // 
      let countryElements:string = '';
      Array.from(response).forEach((country:any) => {
        countries.innerHTML += `
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

//Honestly I want to try <T>
function hasCapital<T>(capital:string) {
  return (capital) ? capital : 'No capital';
}

function hasLanguage(language:string) {
  return (language) ? language : 'No Language to display';
}

obtainCountries();

const flagsCard:HTMLElement = document.querySelector('.flags__card');
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