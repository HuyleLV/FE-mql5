import AUD from "../component/image/icon/country/AUD.svg";
import CAD from "../component/image/icon/country/CAD.svg";
import CHF from "../component/image/icon/country/CHF.svg";
import EUR from "../component/image/icon/country/EUR.svg";
import GBP from "../component/image/icon/country/GBP.svg";
import JPY from "../component/image/icon/country/JPY.svg";
import NZD from "../component/image/icon/country/NZD.svg";
import USD from "../component/image/icon/country/USD.svg";

export const Country = (country) => {
    switch (country) {
        case "AUD":
            return (
                <img alt="icon country" src={AUD} className="w-[50px] h-[50px]"/>
            );
        case "CAD":
            return (
                <img alt="icon country" src={CAD} className="w-[50px] h-[50px]"/>
            );
        case "CHF":
            return (
                <img alt="icon country" src={CHF} className="w-[50px] h-[50px]"/>
            );
        case "EUR":
            return (
                <img alt="icon country" src={EUR} className="w-[50px] h-[50px]"/>
            );
        case "GBP":
            return (
                <img alt="icon country" src={GBP} className="w-[50px] h-[50px]"/>
            );
        case "JPY":
            return (
                <img alt="icon country" src={JPY} className="w-[50px] h-[50px]"/>
            );
        case "NZD":
            return (
                <img alt="icon country" src={NZD} className="w-[50px] h-[50px]"/>
            );
        case "USD":
            return (
                <img alt="icon country" src={USD} className="w-[50px] h-[50px]"/>
            );
    }
}