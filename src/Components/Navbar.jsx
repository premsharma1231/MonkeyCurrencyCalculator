import { useState} from "react";
// import { InputSwitch } from 'primereact/inputswitch';
import { Link } from 'react-router-dom';





function Navbar() {
    // document.body.style.backgroundColor = '#808000';
    // const [checked, setChecked] = useState(false);
    const [colorChanging, setcolorChanging] = useState("HOME");
    let universalNavbar = (navname) => {
        setcolorChanging(navname);
    }
    
    
    return (
    <>
        {/* Below is the Navigation Bar which i am assigning to the different DIV */}
        <div className="flex bg-Newone justify-between h-20 items-center px-4">
            {/* <h1 className="text-2xl text-CalcGreenText font-Anton tracking-widest">NAVBAR</h1> */}
            <div className="flex list-none">
                <Link  to="/MonkeyCurrencyCalculator" onClick={()=> universalNavbar('HOME')} className={`${colorChanging === "HOME" ? "text-white" : "text-CalcGreenText"} p-2 transition-all text-1xl hover:cursor-pointer font-Karla font-bold`}>HOME</Link>
                {/* <Link  to="/about" onClick={()=> universalNavbar('ABOUT')} className={`${colorChanging === "ABOUT" ? "text-white" : "text-CalcGreenText"} p-2 transition-all text-1xl hover:cursor-pointer font-Karla font-bold`}>ABOUT</Link> */}
                <Link  to="/MonkeyCurrencyCalculator/liverates" onClick={()=> universalNavbar("LIVE RATES")} className={`${colorChanging === "LIVE RATES" ? "text-white" : "text-CalcGreenText"} p-2 transition-all text-1xl hover:cursor-pointer font-Karla font-bold`}>LIVE RATES</Link>
            </div>
            <div className="card flex justify-center items-center">
            <p className="text-CalcGreenText cursor-pointer font-Teko p-3 text-3xl">💱 Monkey-Currency</p>
            {/* <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} /> */}
        </div>
        </div>
        </>
    )
}

export default Navbar;