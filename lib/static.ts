import { Country, Currency } from "../types";
import * as apiClient from "./api";

export async function getStaticCountriesAndCurrencies() {
  const [countryResponse, currencyResponse] = await Promise.all([
    apiClient.get("select/countries"),
    apiClient.get("select/currencies"),
  ]);

  let countries: Array<Country> = [];
  if (countryResponse?.status === "success") {
    countries = countryResponse.data;
  }

  let currencies: Array<Currency> = [];
  if (currencyResponse?.status === "success") {
    currencies = currencyResponse.data;
  }

  return {
    props: { countries, currencies },
  };
}