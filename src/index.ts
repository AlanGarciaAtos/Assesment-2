import './main.scss';
import * as tingle from 'tingle.js';

//TODO Get the image (png) not the "emoji"

// import * as axios from 'axios';
const axios = require('axios'); //In the docs they add .default.
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

      //This is inside the foreach of the data countries
      // <th style="word-break: break-word;">
      //         ${hasLanguage(Object.values(country.languages))}
      //       </th>

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
    //Getting the "extract_html", why here well because I got an error 404 i could change it because everything stopped before it could add the country so I added here and voila! I know it's a "hack"
    // const responseWiki = await axios.get(wiki)
    // console.log(responseWiki.data.extract_html);

    console.log(err);
  }
}



function sortCountries(): any {
  country_list.sort((a: string, b: string): any => {
    const nameA = a.toUpperCase();
    const nameB = a.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    console.log(country_list);

    return 0;
  });
}

console.log(sortCountries());


var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands", "Yemen", "Zambia", "Zimbabwe"];



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