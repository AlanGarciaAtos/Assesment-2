import './main.scss';
import * as tingle from 'tingle.js';
import axios from 'axios';


//TODO Get the image (png) not the "emoji"
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const wiki: any = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

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

  let infoModalCountry = document.querySelector('.info__modal');

  try {
    //TODO Error: Property 'get' does not exist on type 'typeof import(...)'
    const response = await axios.get(API_URL_ALL);

    let dataCountries = response.data;
    // console.log(dataCountries);//Greenland

    flagsCard2.innerHTML = '';

    if (response.status === 200) {
      //Mapping all the countries name...ʷʰᶦᶜʰ ᶦ ᵈᵒⁿᵗ ᶦᶠ ᵘˢᵉᶠᵘˡ
      let countryName: any = [];
      // countryName = dataCountries.map((country: any) => country.name.common);
      // countryName = dataCountries.map((country: any) => country.name.common);
      // countryName = countryName.sort()
      // console.log(countryName);

      //*Thank you Theo for the help
      // pokemon.sort((a,b) => generateCountPercent(b) - generateCountPercent(a)).map((currentPokemon, index) =>{
      //   return <PokemonListing pokemon={currentPokemon} key={index}/>
      // })

      // Sort the countries by name (alphabetically).
      dataCountries.sort((a: any, b: any) => (a.name.common > b.name.common ? 1 : -1));

      //An attempt to sort by name, it was better the above solution for f sake
      // let allCountriesName = dataCountries.sort((a: any, b: any) => a.name.common - b.name.common).forEach((country: any) => {
      //   countriesTable.innerHTML += `
      //   <tbody>
      //     <tr>
      //       <th>
      //         <a href="${wiki}${country.name.common}">
      //           ${country.name.common}
      //         </a>
      //       </th>
      //   </tbody>
      //   `
      // });

      //TODO Add the correctly the languages
      let allCountries = dataCountries.forEach((country: any) => {
        countriesTable.innerHTML += `
        <tbody>
          <tr>
            <th>
              <a href="${wiki}${country.name.common}">
                ${country.name.common}
              </a>
            </th>
            <th>${hasCapital(country.capital)}</th>
            <th>${country.region}</th>
            <th style="word-break: break-word;">
              ${country.languages}
            </th>
            <th>${country.population}</th>
            <th>${country.flag}</th>
          </tr>
        </tbody>
        `
      });
    }
  } catch (err) {
    //Getting the "extract_html", why here well because I got an error 404 i could change it because everything stopped before it could add the country so I added here and voila! I know it's a "hack"
    // const responseWiki = await axios.get(wiki)
    // console.log(responseWiki.data.extract_html);

    console.log(err);
  }
}

const getCountryWiki = function (nameCountry: string): string {
  let wiki: any = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  let resWiki = `${wiki}${nameCountry}`
  return resWiki;
  // console.log(responseWiki.data.extract_html);
}

//Honestly I want to try <T>
function hasCapital<T>(capital: string) {
  return (capital) ? capital : 'No capital';
}

//? TypeError: Cannot convert undefined or null to object, but it still works
function hasLanguage(language: string[]) {
  return (language) ? language : 'No Language to display';
}
obtainCountries();

//* Tingle js
const modalTinyNoFooter = new tingle.modal({
  onOpen: function () {
    console.log('modal open');
  },
});
const btn = document.querySelector('.js-tingle-modal-1');

btn.addEventListener('click', function () {
  modalTinyNoFooter.open();
  // modalTinyNoFooter.setContent(`${responseWiki.data.extract_html}`);
});

//TODO It should show this html however responseWiki is not define, although I can put it all in the try catch....buuut I don't think that's a good idea.
modalTinyNoFooter.setContent(
  '<p><b>El Salvador</b>, officially the <b>Republic of El Salvador</b>, is a country in Central America. It is bordered on the northeast by Honduras, on the northwest by Guatemala, and on the south by the Pacific Ocean. El Salvadors capital and largest city is San Salvador. The countrys population in 2021 is estimated to be 6.8 million.</p>'
);


