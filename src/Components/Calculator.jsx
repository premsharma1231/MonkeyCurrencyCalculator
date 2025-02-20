import { useState, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft} from "@fortawesome/free-solid-svg-icons";




function Calculator() {
    // const isMobile = useMediaQuery({ maxWidth: 767 });
    // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    // const isDesktop = useMediaQuery({ minWidth: 1025 });

    const countries = [
        { name: 'Afghanistan', code: 'AF', currency: 'AFN' },
        { name: 'Albania', code: 'AL', currency: 'ALL' },
        { name: 'Algeria', code: 'DZ', currency: 'DZD' },
        { name: 'Andorra', code: 'AD', currency: 'EUR' },
        { name: 'Angola', code: 'AO', currency: 'AOA' },
        { name: 'Argentina', code: 'AR', currency: 'ARS' },
        { name: 'Australia', code: 'AU', currency: 'AUD' },
        { name: 'Austria', code: 'AT', currency: 'EUR' },
        { name: 'Bangladesh', code: 'BD', currency: 'BDT' },
        { name: 'Belgium', code: 'BE', currency: 'EUR' },
        { name: 'Brazil', code: 'BR', currency: 'BRL' },
        { name: 'Canada', code: 'CA', currency: 'CAD' },
        { name: 'China', code: 'CN', currency: 'CNY' },
        { name: 'Denmark', code: 'DK', currency: 'DKK' },
        { name: 'Egypt', code: 'EG', currency: 'EGP' },
        { name: 'France', code: 'FR', currency: 'EUR' },
        { name: 'Germany', code: 'DE', currency: 'EUR' },
        { name: 'India', code: 'IN', currency: 'INR' },
        { name: 'Indonesia', code: 'ID', currency: 'IDR' },
        { name: 'Iran', code: 'IR', currency: 'IRR' },
        { name: 'Italy', code: 'IT', currency: 'EUR' },
        { name: 'Japan', code: 'JP', currency: 'JPY' },
        { name: 'Mexico', code: 'MX', currency: 'MXN' },
        { name: 'Netherlands', code: 'NL', currency: 'EUR' },
        { name: 'Norway', code: 'NO', currency: 'NOK' },
        { name: 'Pakistan', code: 'PK', currency: 'PKR' },
        { name: 'Philippines', code: 'PH', currency: 'PHP' },
        { name: 'Russia', code: 'RU', currency: 'RUB' },
        { name: 'Saudi Arabia', code: 'SA', currency: 'SAR' },
        { name: 'South Africa', code: 'ZA', currency: 'ZAR' },
        { name: 'South Korea', code: 'KR', currency: 'KRW' },
        { name: 'Spain', code: 'ES', currency: 'EUR' },
        { name: 'Sweden', code: 'SE', currency: 'SEK' },
        { name: 'Switzerland', code: 'CH', currency: 'CHF' },
        { name: 'Turkey', code: 'TR', currency: 'TRY' },
        { name: 'United Arab Emirates', code: 'AE', currency: 'AED' },
        { name: 'United Kingdom', code: 'GB', currency: 'GBP' },
        { name: 'United States', code: 'US', currency: 'USD' },
        { name: 'Vietnam', code: 'VN', currency: 'VND' },
    ];
    document.body.style.backgroundColor = '#163300';

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [InputOneCurrency, setInputOneCurrency] = useState("INR");
    const [InputOneCurrency2, setInputOneCurrency2] = useState("USD");
    const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === "IN"));
    const [selectedCountry2, setSelectedCountry2] = useState(countries.find((c) => c.code === "US"));
    const [exchangeRate, setExchangeRate] = useState(1); // Default 1:1 conversion
    const [isLoading, setIsLoading] = useState(false);
    const [TextConversion, setTextConversion] = useState("");
    const [TextConversion2, setTextConversion2] = useState("");


        useEffect(() => {
            if (selectedCountry) setInputOneCurrency(selectedCountry.currency);
            if (selectedCountry2) setInputOneCurrency2(selectedCountry2.currency);
        }, [selectedCountry, selectedCountry2]);
    
        useEffect(() => {
            if (InputOneCurrency && InputOneCurrency2) {
                fetchExchangeRate(InputOneCurrency, InputOneCurrency2);
            }
        }, [InputOneCurrency, InputOneCurrency2]);

        const fetchExchangeRate = async (fromCurrency, toCurrency) => {
            try {
                const res = await fetch(`https://v6.exchangerate-api.com/v6/3d3133a5c069b81679c24d0d/latest/${fromCurrency}`);
                const data = await res.json();
                setExchangeRate(data.conversion_rates[toCurrency] || 1);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
        };

        useEffect(() => {
            setValue2(value1 * exchangeRate);
            setTextConversion(`${1} ${InputOneCurrency} = ${exchangeRate} ${InputOneCurrency2}`);
            setTextConversion2(`Convert ${InputOneCurrency} to ${InputOneCurrency2} at the real exchange rate`);
         }, [value1, exchangeRate, InputOneCurrency, InputOneCurrency2]);
    
         
            const selectedCountryTemplate = (option, props, placeholder) => {
                if (!option) return <span>{placeholder}</span>;

                return (
                    <div className="flex items-center">
                        <img
                            alt={option.currency}
                            src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`} // Flag URL
                            className="mr-2"
                            style={{ width: "20px", height: "15px" }}
                        />
                        <span>{option.currency}</span>
                    </div>
                );
            
            };

            const countryOptionTemplate = (option) => (
                <div className="flex items-center justify-between">
                    <img
                        alt={option.currency}
                        src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
                        className="mr-2"
                        style={{ width: '20px', height: '15px' }}
                    />
                    <span>{option.currency}</span>
                </div>
            );

            const handleSwap = () => {
                setSelectedCountry(selectedCountry2);
                setSelectedCountry2(selectedCountry);
                setInputOneCurrency(InputOneCurrency2);
                setInputOneCurrency2(InputOneCurrency);
                setValue1(value2);
                setValue2(value1 * (1 / exchangeRate)); // Reverse conversion
            };
            
            useEffect(() => {
                if (selectedCountry || selectedCountry2) {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000); // Simulating API call delay
                }
            }, [selectedCountry, selectedCountry2]);
            

        return(
                <>
                <h1 className="font-Bungee 
                text-2xl
                sm:text-2xl 
                md:text-3xl
                lg:text-4xl
                text-center mt-16 text-CalcGreenText">Currency Converter</h1>
                <h1 className="
                text-lg
                sm:2xl
                md:2xl
                lg:2xl
                font-Karla font-bold text-center m-5 text-CalcGreenText">{TextConversion2}</h1>
                {/* {isDesktop &&  */}
                <div className="
                flex flex-col justify-between items-center m-auto mb-10 w-10/12 h-full py-12 px-8 bg-white shadow-inner shadow-black rounded-lg
                sm:h-full
                md:h-72
                lg:h-72
                ">
                <div className="flex flex-col justify-between items-center w-full
                sm:flex-col
                md:flex-col
                lg:flex-row
                ">
                <div className="flex flex-col">
                <h1 className="text-xl mb-0 font-Karla font-bold text-gray-600
                sm:text-2xl sm:mb-2
                md:text-2xl md:mb-2
                lg:text-2xl lg:mb-2
                ">Enter Amount</h1>
                    <div className="flex">
                        <div className="card flex flex-wrap gap-1 p-fluid">
                            <InputNumber className="h-12 p-2 text-xl font-Bungee w-full border-2 rounded-lg
                            sm:w-80 sm:text-2xl
                            md:w-80 md:text-2xl
                            lg:w-80 lg:text-2xl
                            " inputId="currency-us" value={value1} onValueChange={(e) => setValue1(e.value)} mode="currency" currency={InputOneCurrency} locale="en-US" />
                            <Dropdown 
                            value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)}
                            options={countries} optionLabel="name"
                            placeholder="Currency" filter
                            valueTemplate={(option, props) => selectedCountryTemplate(option, props, "Currency")}
                            itemTemplate={countryOptionTemplate}
                            className="w-full
                            sm:w-36
                            md:w-36
                            lg:w-36
                            bg-slate-200"/>
                        </div>
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin m-2 h-8 w-6 text-green-500
                            sm:mt-10 sm:h-12 sm:w-12
                            md:mt-10 md:h-12 md:w-12
                            lg:mt-10 lg:h-12 lg:w-12
                            " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </div>
                        ) : (
                        <FontAwesomeIcon
                            className="cursor-pointer m-3 h-6 hover:rotate-180 transition-all
                            sm:m-0 sm:mt-10 sm:h-8
                            md:m-0 md:mt-10 md:h-8
                            lg:m-0 lg:mt-10 lg:h-8
                            "
                            onClick={handleSwap}
                            icon={faArrowRightArrowLeft}
                        />
                        )}
                </div>
                <div className="flex flex-col">
                <h1 className="text-xl mb-0 font-Karla font-bold text-gray-500
                sm:text-2xl sm:mb-2
                md:text-2xl md:mb-2
                lg:text-2xl lg:mb-2
                ">Converted to</h1>
                    <div className="flex">
                        <div className="card flex flex-wrap gap-1 p-fluid">
                            <InputNumber className="h-12 p-2 text-xl w-full font-Bungee border-2 rounded-lg
                            sm:w-80 sm:text-2xl
                            md:w-80 md:text-2xl
                            lg:w-80 lg:text-2xl
                            " inputId="currency-us" value={value2} onValueChange={(e) => setValue2(e.value)} mode="currency" currency={InputOneCurrency2} locale="en-US" />
                                <Dropdown
                                value={selectedCountry2}
                                onChange={(e) => setSelectedCountry2(e.value)}
                                options={countries}
                                optionLabel="name"
                                placeholder="Currency"
                                filter
                                valueTemplate={(option, props) => selectedCountryTemplate(option, props, "Currency")}
                                itemTemplate={countryOptionTemplate}
                                className="w-full bg-slate-200
                                sm:w-36
                                md:w-36
                                lg:w-36
                            "/>
                        </div>
                    </div>
                </div>
                </div>
                <h1 className="text-gray-500 text-left w-full text-2xl font-Teko mt-5
                sm:
                md:
                lg:text-left lg:w-full lg:text-3xl lg:mt-0
                ">{TextConversion}</h1>
                </div>
                {/* } */}
        </>
    )
}

export default Calculator;