import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
console.log(fetchCountries);
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const markupCountryList = (country = []) => {
  const markup = country
    .map(({ name, flags }) => {
      return `<ul>
              <li><img src="${flags.svg}" width="40" height="25" alt="Flag of ${name.official}">
              <h2>${name.official}</h2>
              </li>
              </ul>
              `;
    })
    .join('');
  countryInfo.innerHTML = markup;
};

const markupCountryInfo = (country = []) => {
  const markup = country
    .map(({ name, capital, population, flags, languages }) => {
      const langString = Object.values(languages).join(', ');

      return `<ul>
              <li><img src="${flags.svg}" width="40" height="25" alt="Flag of ${name.official}"><h1>${name.official}</h1></li>
              <li><p><b>Capital: </b>${capital[0]}</p></li>
              <li><p><b>Population: </b>${population}</p></li>
              <li><p><b>Languages: </b>${langString}</p></li>
              </ul>
              `;
    })
    .join('');
  countryInfo.innerHTML = markup;
};
function cleanSeach() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function seachCountry(e) {
  let name = e.target.value.trim();
  if (name === '') {
    cleanSeach();
    return;
  }
  fetchCountries(name)
    .then(arrCountry => {
      cleanSeach();
      console.log(arrCountry);
      if (arrCountry.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (arrCountry.length >= 2 && arrCountry.length <= 10) {
        markupCountryList(arrCountry);
      } else if (arrCountry.length === 1) {
        markupCountryInfo(arrCountry);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      cleanSeach();
      return error;
    });
}

searchBox.addEventListener('input', debounce(seachCountry, DEBOUNCE_DELAY));
