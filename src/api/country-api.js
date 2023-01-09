const URL = 'https://restcountries.com/v3.1';

function handleNoData(data) {
  return data.status ? null : data;
}

export async function getAllCountry(query, filter) {
  if (query) {
    const data = await fetch(`${URL}/name/${query}`)
      .then((response) => response.json());

    return handleNoData(data);
  } else if (filter) {
    const data = await fetch(`${URL}/region/${filter}`).then((response) => response.json());

    return data;
  }
  const data = await fetch(`${URL}/all`)
    .then((response) => response.json());

  return data;
}

export async function getCountry(countryName) {
  const data = await fetch(`${URL}/name/${countryName}?fullText=true`)
    .then((response) => response.json());

  return data[0];
}

export async function getCountryByCode(countryCode) {
  const data = await fetch(`${URL}/alpha/${countryCode}`)
    .then((response) => response.json());
  return data[0];
}

export async function getAllCountryCode() {
  const data = await fetch(`${URL}/all`)
    .then((response) => response.json())
    .then(res => {
      let objCode = {}
      res.forEach(country => {
        objCode = {...objCode, [country.cca3]: country.name.common }
      });
      return objCode;
    });

  return data;
}
