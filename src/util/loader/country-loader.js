import { getAllCountryCode, getCountry } from "../../api/country-api";

export default async function getCountryLoader({ request }) {
  const url = new URL(request.url);

  const pathName = url.pathname.split('/')[2];
  const codeAllCountries = await getAllCountryCode();
  const countryData = await getCountry(pathName);

  return { countryData, codeAllCountries };
}