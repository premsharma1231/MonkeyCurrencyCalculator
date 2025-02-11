import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faTrash  } from "@fortawesome/free-solid-svg-icons";




function Calculator() {
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
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);


    useEffect(() => {
        fetchExchangeRate(selectedCountry.currency, selectedCountry2.currency);
        const storedHistory = JSON.parse(localStorage.getItem("conversionHistory")) || [];
        setHistory(storedHistory);
    }, []);

    
    // const handleConvert = () => {
    //     const conversion = {
    //         from: `${value1} ${selectedCountry.currency}`,
    //         to: `${value2} ${selectedCountry2.currency}`,
    //         rate: `1 ${selectedCountry.currency} = ${exchangeRate} ${selectedCountry2.currency}`,
    //         timestamp: new Date().toLocaleString(),
    //     };

        // const newHistory = [conversion, ...history].slice(0, 10);
        // setHistory(newHistory);
        // localStorage.setItem("conversionHistory", JSON.stringify(newHistory));
    

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
            const convertedValue = value1 * exchangeRate;
            setValue2(convertedValue);
            if (value1 > 0) {
                const newEntry = `${value1} ${InputOneCurrency} = ${convertedValue.toFixed(2)} ${InputOneCurrency2}`;
                const updatedHistory = [newEntry, ...history].slice(0, 10);
                setHistory(updatedHistory);
                localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
            }
        }, [value1, exchangeRate]);
    

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
        <h1 className="font-Bungee text-5xl text-center mt-16 text-CalcGreenText">Currency Converter</h1>
        <h1 className="font-Karla font-bold text-2xl text-center m-5 text-CalcGreenText">{TextConversion2}</h1>
        <div className="flex flex-col justify-between items-center m-auto w-10/12 h-72 py-12 px-8 bg-white shadow-inner shadow-black rounded-lg">
        
        <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
        <h1 className="text-2xl mb-2 font-Karla font-bold text-gray-600">Enter Amount</h1>
            <div className="flex">
                <div className="card flex flex-wrap gap-1 p-fluid">
                    <InputNumber className="h-12 p-2 text-2xl font-Bungee w-80 border-2 rounded-lg" inputId="currency-us" value={value1} onValueChange={(e) => setValue1(e.value)} mode="currency" currency={InputOneCurrency} locale="en-US" />
                    <Dropdown 
                    value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)}
                    options={countries} optionLabel="name"
                    placeholder="Currency" filter
                    valueTemplate={(option, props) => selectedCountryTemplate(option, props, "Currency")}
                    itemTemplate={countryOptionTemplate}
                    className="w-36 bg-slate-200"/>
                </div>
            </div>
        </div>
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <svg className="animate-spin mt-10 h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                </div>
                ) : (
                <FontAwesomeIcon
                    className="cursor-pointer mt-12 h-8 hover:rotate-180 transition-all"
                    onClick={handleSwap}
                    icon={faArrowRightArrowLeft}
                />
                )}
        </div>
        <div className="flex flex-col">
        <h1 className="text-2xl mb-2 font-Karla font-bold text-gray-500">Converted to</h1>
            <div className="flex">
                <div className="card flex flex-wrap gap-1 p-fluid">
                    <InputNumber className="h-12 p-2 text-2xl w-80 font-Bungee border-2 rounded-lg" inputId="currency-us" value={value2} onValueChange={(e) => setValue2(e.value)} mode="currency" currency={InputOneCurrency2} locale="en-US" />
                        <Dropdown
                        value={selectedCountry2}
                        onChange={(e) => setSelectedCountry2(e.value)}
                        options={countries}
                        optionLabel="name"
                        placeholder="Currency"
                        filter
                        valueTemplate={(option, props) => selectedCountryTemplate(option, props, "Currency")}
                        itemTemplate={countryOptionTemplate}
                        className="w-36 bg-slate-200"/>
                </div>
            </div>
        </div>
        </div>
        <h1 className="text-gray-500 text-left w-full text-3xl font-Teko">{TextConversion}</h1>
        <div className="card flex justify-center">
        <Button label="Show History" className="mt-4 p-2 bg-blue-500 text-white hover:tracking-widest" onClick={() => setShowHistory(!showHistory)} />
        </div>
        {showHistory && (
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Conversion History</h2>
                    {history.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {history.map((entry, index) => (
                                <li key={index} className="mb-1">{entry}</li>
                            ))}
                        </ul>
                    ) : (<p>No history available.</p>)}
                        <Button label="Clear History" className="mt-3 bg-red-500 text-white" />
            </div>
            )}
        </div>
        </>
    )
}

export default Calculator;