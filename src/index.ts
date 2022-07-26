import './main.scss';
import * as tingle from 'tingle.js';

//TODO Get the image (png) not the "emoji"

// import * as axios from 'axios';
const axios = require('axios'); //In the docs they add .default.
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
let wiki: any = 'https://en.wikipedia.org/api/rest_v1/page/summary/Peru';

const API_URL = 'https://restcountries.com/v3.1/name/mexico';
const API_URL_TEST = 'https://restcountries.com/v3.1/name/';

enum Country {
  name,
  capital,
  region,
  languages,
  population,
}

let flagsCard2 = document.querySelector('.flags_card2');

/**
 * We're using the async/await syntax to make an HTTP request to the REST Countries API, and then we're
 * logging the name of the second country in the response to the console
 * With this we don't need to use a ton of .then()
 */
const obtainCountries = async () => {
  const countries: HTMLElement = document.getElementById('flags__card');
  const countriesTable: HTMLElement = document.getElementById('contentTable');
  console.log(countriesTable);

  let infoModalCountry = document.querySelector('.info__modal');

  try {
    //TODO Error: Property 'get' does not exist on type 'typeof import(...)'
    const response = await axios.get(API_URL_ALL);

    //Getting the "extract_html"
    const responseWiki = await axios.get(wiki)
    console.log(responseWiki.data.extract_html);

    // infoModalCountry.appendChild


    let data = response.data;
    console.log(data);//Greenland

    flagsCard2.innerHTML = '';

    if (response.status === 200) {
      //Mapping all the countries name...ʷʰᶦᶜʰ ᶦ ᵈᵒⁿᵗ ᶦᶠ ᵘˢᵉᶠᵘˡ
      let countryName = [];
      countryName = data.map((country: any) => country.name.common);
      // console.log(countryName);

      console.log(data);


      // flagsCard2.innerHTML = `
      //   <section class="flags__card">
      //     <h2>${data[0].name.common}</h2>
      //     <h3>${hasCapital(data[0].capital)}</h3>
      //     <p>${data[0].region}</p>
      //     <p>${hasLanguage(data[0].languages.kal)}</p>
      //     <p>${data[0].population}</p>
      //     <p>${data[0].flag}</p>
      //   </section>`;

      // flagsCard2.appendChild(flagsCard);

      let countryElements: string = '';
      // data.forEach((country: any) => {
      //   countries.innerHTML += `
      //     <section class="flags__card">
      //       <h2>${country.name.common}</h2>
      //       <h3>${hasCapital(country.capital)}</h3>
      //       <p>${country.region}</p>
      //       <p>${hasLanguage(country.languages)}</p>
      //       <p>${country.population}</p>
      //       <p>${country.flag}</p>
      //     </section>
      //   `
      // });

      //TODO Why the languages column has a lot of space, if I don't add the Object.values it doesn't add the space
      data.forEach((country: any) => {
        countriesTable.innerHTML += `
        <tbody>
          <tr>
            <th>${country.name.common}</th>
            <th>${hasCapital(country.capital)}</th>
            <th>${country.region}</th>
            <th style="word-break: break-word;">${Object.values(country.languages)}</th>
            <th>${country.population}</th>
            <th>${country.flag}</th>
          </tr>
        </tbody>
        `
      });



      // Various methods (beforebegin, afterbegin, beforeend, afterend) 
      // response.forEach((country: any) => {
      //   country.insertAdjacentHTML('afterbegin ',`
      //     <section class="flags__card">
      //       <h2>${data[0].name.common}</h2>
      //       <h3>${hasCapital(data[0].capital)}</h3>
      //       <p>${data[0].region}</p>
      //       <p>${hasLanguage(data[0].languages.kal)}</p>
      //       <p>${data[0].population}</p>
      //       <p>${data[0].flag}</p>
      //     </section>
      //   `)
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
  // modalTinyNoFooter.setContent(`${responseWiki.data.extract_html}`);
});

//TODO It should show this html however responseWiki is not define, although I can put it all in the try catch....buuut I don't think that's a good idea.
modalTinyNoFooter.setContent(
  '<h1>here\'s some content</h1> <p><b>Peru</b>, officially the <b>Republic of Peru</b>, is a country in western South America. It is bordered in the north by Ecuador and Colombia, in the east by Brazil, in the southeast by Bolivia, in the south by Chile, and in the south and west by the Pacific Ocean. Peru is a megadiverse country with habitats ranging from the arid plains of the Pacific coastal region in the west to the peaks of the Andes mountains extending from the north to the southeast of the country to the tropical Amazon basin rainforest in the east with the Amazon River. Peru has a population of 34 million, and its capital and largest city is Lima. At 1.28 million km<sup>2</sup>, Peru is the 19th largest country in the world, and the third largest in South America.</p>'
);