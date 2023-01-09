import { getAllCountry } from "../../api/country-api";

export async function getAllLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const region = url.searchParams.get("region");

  const countries = await getAllCountry(q, region);

  return {countries, q, region };
} 