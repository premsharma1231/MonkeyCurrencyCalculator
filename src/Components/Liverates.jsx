import { useState, useEffect } from "react";

const currencyToCountry = {
  USD: "us",
  AFN: "af",
  ALL: "al",
  DZD: "dz",
  EUR: "eu",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  BDT: "bd",
  BRL: "br",
  CAD: "ca",
  CNY: "cn",
  DKK: "dk",
  EGP: "eg",
  INR: "in",
  IDR: "id",
  IRR: "ir",
  JPY: "jp",
  MXN: "mx",
  NOK: "no",
  PKR: "pk",
  PHP: "ph",
  RUB: "ru",
  SAR: "sa",
  ZAR: "za",
  KRW: "kr",
  SEK: "se",
  CHF: "ch",
  TRY: "tr",
  AED: "ae",
  GBP: "gb",
  VND: "vn",
};

const Liverates = () => {
  document.body.style.backgroundColor = "#163300";
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  const fetchExchangeRate = async (fromCurrency) => {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/3d3133a5c069b81679c24d0d/latest/${fromCurrency}`
      );
      const data = await res.json();
      setExchangeRates(data.conversion_rates || {});
      setCurrencies(Object.keys(data.conversion_rates || {}));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate(baseCurrency);
  }, [baseCurrency]);

  return (
    <>
      <div className="flex flex-col items-start mt-14 mx-10 justify-between h-screen
      sm:flex-col
      md:flex-row
      lg:flex-row
      
      ">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="text-2xl m-2 text-center font-Bungee text-CalcGreenText
          sm:text-5xl sm:m-5
          md:text-5xl md:m-5
          lg:text-5xl lg:m-5
          
          ">
            Live Exchange Rates
          </h2>
          <div className="flex items-center">
            <label className="mr-2 font-Bungee text-CalcGreenText text-small
            sm:text-xl
            md:text-2xl
            lg:text-2xl
            ">
              Select Base Currency:
            </label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="border text-center px-4 py-2 rounded bg-CalcGreenText text-CalcGreen text-small font-Bungee appearance-none
              sm:text-2xl sm:px-2
              md:text-2xl md:px-2
              lg:text-2xl lg:px-2
              "
            >
              {currencies.map((currency) => (
                <option
                  className=""
                  key={currency}
                  value={currency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full p-4
        sm:w-full
        md:w-5/12
        lg:w-5/12
        ">
          <div className="max-h-[500px] overflow-y-auto overflow-x-visible w-56 border border-white rounded-md
          sm:w-56
          md:w-full
          lg:w-full
          ">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-CalcGreenText sticky top-0">
                  <th className="border font-Bungee text-CalcGreen text-small p-2
                  sm:text-xl
                  md:text-2xl
                  lg:text-2xl
                  ">
                    Currency
                  </th>
                  <th className="border font-Bungee text-CalcGreen text-small p-2
                  sm:text-xl
                  md:text-2xl
                  lg:text-2xl
                  ">
                    Exchange Rate
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {Object.entries(exchangeRates).map(([currency, rate]) => {
                  const countryCode = currencyToCountry[currency] || "un";
                  return (
                    <tr key={currency} className="border">
                      <td className="border text-small border-none justify-center text-center text-CalcGreenText pt-3 flex items-center gap-2 w-full
                      sm:text-xl sm:p-0 sm:pt-3
                      md:text-2xl md:p-2
                      lg:text-2xl lg:p-2">
                        <img
                          alt={currency}
                          src={`https://flagcdn.com/w40/${countryCode}.png`}
                          className="w-6 h-4
                          sm:w-8 sm:h-5
                          md:w-8 md:h-5
                          lg:w-8 lg:h-5
                          "
                        />
                        {currency}
                      </td>
                      <td className="border text-small text-center text-CalcGreenText p-2
                      sm:text-xl
                      md:text-2xl
                      lg:text-2xl              
                      ">
                        {rate.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Liverates;
