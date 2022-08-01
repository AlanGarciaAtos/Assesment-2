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
let btnToggle = document.getElementById('btnToggle');

const form = document.getElementById('form');
const inputForm = document.getElementById('search__input')! as HTMLInputElement;

//Filter the countries by name buuuuut in console
const dataForm: any = (data: any) => {
  form.addEventListener('keyup', async (e) => {
    e.preventDefault();

    // const userInput = inputForm.value.charAt(0).toUpperCase() + inputForm.value.slice(1);
    const userInput = inputForm.value.toLowerCase();

    const filterArray = data.filter((item: any) => {
      const letterApi = item.name.common;
      // console.log(letterApi);

      if (letterApi.indexOf(userInput) !== -1) {
        return item;
      }
    })

    // allcountries(filterArray);
    console.log(filterArray);
    console.log(userInput);
  });
};

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
    const response = await axios.get(API_URL_ALL);

    let dataCountries = response.data;
    console.log(Object.values(dataCountries[0].languages).toLocaleString());
    //TODO It searchs the country by name but in console and It doens't work

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

      let sortDirection = true;
      // Sort the countries by name (alphabetically).
      dataCountries.sort((a: any, b: any) => (a.name.common > b.name.common ? 1 : -1));

      //TODO It doesn't sort in the DOM && console but in console shows it. It works the button but I don't know why the sorting doesn't work
      btnToggle.addEventListener('click', () => {
        dataCountries.sort((a: any, b: any) => {
          if (sortDirection === false) {
            return a.name.common < b.name.common ? 1 : -1;
          } else {
            return a.name.common > b.name.common ? 1 : -1;
          }
        });
        sortDirection = false;
        console.log("TEST");
      });

      // btnToggle.addEventListener('click', () => {
      //   dataCountries.sort((a: any, b: any) => (a.name.common > b.name.common ? 1 : -1));
      // });

      //An attempt to sort by name, it was not better the above solution for f sake
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

      let infoModalCountry = document.querySelector('.info__modal');
      infoModalCountry.innerHTML = response.data.extract_html;
      console.log(infoModalCountry);

      //TODO Add the correctly the languages
      dataCountries.forEach((country: any) => {
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
              ${country && country.languages && Object.values(country.languages).toLocaleString()}
            </th>
            <th>${country.population}</th>
            <th>${country.flag}</th>
          </tr>
        </tbody>
        `
      });

      tingleModal(dataCountries);

      //It does filter the countries by name but in console buut I don't know if the filter is apply correct.
      dataForm(dataCountries);
      console.log(countriesTable);
    }
  } catch (err) {
    //Getting the "extract_html", why here well because I got an error 404 i could change it because everything stopped before it could add the country so I added here and voila! I know it's a "hack"
    // const responseWiki = await axios.get(wiki)
    // console.log(responseWiki.data.extract_html);

    console.log(err);
  }
}

//TODO I get the extract_html but need to add in tinglejs
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
// let infoModalCountry = document.querySelector('.info__modal');
// infoModalCountry.innerHTML = response.data.extract_html;
// console.log(infoModalCountry)

//* Tingle js
function tingleModal(data: any) {
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
    "<p><b>Antigua and Barbuda</b> is a sovereign island country in the West Indies in the Americas, lying between the Caribbean Sea and the Atlantic Ocean. It consists of two major islands, Antigua and Barbuda separated by around 40 km (25 mi), and smaller islands. The permanent population number is estimated to be in the region of 97,120 with 97% residing on Antigua. The capital and largest port and city is St. John's on Antigua, with Codrington being the largest town on Barbuda. Lying near each other, Antigua and Barbuda are in the middle of the Leeward Islands, part of the Lesser Antilles, roughly at 17°N of the equator.</p>"
  );
}


// tingleModal();



