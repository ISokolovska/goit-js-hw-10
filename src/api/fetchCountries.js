import Notiflix from 'notiflix';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    // console.log(response);
    if (response.ok) {
      // console.log(response);
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
