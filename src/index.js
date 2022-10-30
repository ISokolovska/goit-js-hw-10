import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export const markupCountryList = (country = []) => {
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

export const markupCountryInfo = (country = []) => {
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

searchBox.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
