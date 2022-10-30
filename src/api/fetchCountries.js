import { markupCountryInfo, markupCountryList } from '../index.js';
import Notiflix from 'notiflix';

export function fetchCountries(event) {
  const countryInfo = document.querySelector('.country-info');
  let name = event.target.value;
  if (name === '') {
    countryInfo.innerHTML = '';
    return;
  }
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      // console.log(response);
      if (response.ok) {
        // console.log(response);
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(arrCountry => {
      console.log(arrCountry);
      if (arrCountry.length === 1) {
        markupCountryInfo(arrCountry);
      } else if (arrCountry.length >= 2 && arrCountry.length <= 10) {
        markupCountryList(arrCountry);
      } else if (arrCountry.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        console.log(arrCountry);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
