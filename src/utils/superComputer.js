import { useEffect, useState } from "react"
import axiosInstance from "./axios";
import { message } from "antd";
import { DecimalNumber } from "./format";

export default function SuperComputer({symbol, pips, volume}) {
    const [symbolApi, setSymbolApi] = useState([]);

    const getAllSymbol = async () => {
        await axiosInstance
            .get(`/symbol/getAll`)
            .then((res) => {
                const data = res?.data;
                console.log(data)
                setSymbolApi(data);
            })
            .catch(() => message.error("Error server!"));
    }

    useEffect(() => { 
        getAllSymbol();
    }, []);

    return (
        <li className="border text-lg font-semibold py-2">
            {
                symbol === "XAUUSD" ? 
                    DecimalNumber((pips-(symbolApi?.[1]?.spreads/10)) * 10 * volume, 2) :
                symbol === "XAGUSD" ?
                    DecimalNumber((pips-(symbolApi?.[29]?.spreads/10)) * 10 * volume, 2) :
                symbol === "GBPUSD" ?
                    DecimalNumber((pips-(symbolApi?.[5]?.spreads/10)) * 10 * volume, 2) :
                symbol === "EURUSD" ?
                    DecimalNumber((pips-(symbolApi?.[2]?.spreads/10)) * 10 * volume, 2) :
                symbol === "AUDUSD" ?
                    DecimalNumber((pips-(symbolApi?.[0]?.spreads/10)) * 10 * volume, 2) :
                symbol === "NZDUSD" ?
                    DecimalNumber((pips-(symbolApi?.[7]?.spreads/10)) * 10 * volume, 2) :
                
                symbol === "USDCAD" ?
                    DecimalNumber(1/symbolApi?.[6]?.price * (pips-(symbolApi?.[6]?.spreads/10)) * 10 * volume, 2) :
                symbol === "USDCHF" ?
                    DecimalNumber(1/symbolApi?.[4]?.price * (pips-(symbolApi?.[4]?.spreads/10)) * 10 * volume, 2) :
                symbol === "USDJPY" ?

                    DecimalNumber(1/symbolApi?.[3]?.price * (pips-(symbolApi?.[3]?.spreads/10)) * 10 * volume, 2) :
                
                symbol === "GBPJPY" ?
                    DecimalNumber(1/symbolApi?.[9]?.price * (pips-(symbolApi?.[9]?.spreads/10)) * 10 * volume * symbolApi?.[5]?.price, 2) :
                symbol === "EURJPY" ?
                    DecimalNumber(1/symbolApi?.[8]?.price * (pips-(symbolApi?.[8]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "CHFJPY" ?
                    DecimalNumber(1/symbolApi?.[24]?.price * (pips-(symbolApi?.[24]?.spreads/10)) * 10 * volume * 1/symbolApi?.[4]?.price, 2) :
                symbol === "CADJPY" ?
                    DecimalNumber(1/symbolApi?.[23]?.price * (pips-(symbolApi?.[23]?.spreads/10)) * 10 * volume * 1/symbolApi?.[6]?.price, 2) :
                symbol === "AUDJPY" ?
                    DecimalNumber(1/symbolApi?.[15]?.price * (pips-(symbolApi?.[15]?.spreads/10)) * 10 * volume * symbolApi?.[0]?.price, 2) :
                symbol === "NZDJPY" ?
                    DecimalNumber(1/symbolApi?.[25]?.price * (pips-(symbolApi?.[25]?.spreads/10)) * 10 * volume * symbolApi?.[0]?.price, 2) :
                symbol === "GBPCHF" ?
                    DecimalNumber(1/symbolApi?.[21]?.price * (pips-(symbolApi?.[21]?.spreads/10)) * 10 * volume * symbolApi?.[5]?.price, 2) :
                symbol === "EURCHF" ?
                    DecimalNumber(1/symbolApi?.[10]?.price * (pips-(symbolApi?.[10]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "AUDCHF" ?
                    DecimalNumber(1/symbolApi?.[14]?.price * (pips-(symbolApi?.[14]?.spreads/10)) * 10 * volume * symbolApi?.[0]?.price, 2) :
                symbol === "NZDCHF" ?
                    DecimalNumber(1/symbolApi?.[28]?.price * (pips-(symbolApi?.[28]?.spreads/10)) * 10 * volume * symbolApi?.[7]?.price, 2) :
                symbol === "CADCHF" ?
                    DecimalNumber(1/symbolApi?.[22]?.price * (pips-(symbolApi?.[22]?.spreads/10)) * 10 * volume * 1/symbolApi?.[6]?.price, 2) :
                symbol === "GBPAUD" ?
                    DecimalNumber(1/symbolApi?.[19]?.price * (pips-(symbolApi?.[19]?.spreads/10)) * 10 * volume * symbolApi?.[5]?.price, 2) :
                symbol === "GBPNZD" ?
                    DecimalNumber(1/symbolApi?.[26]?.price * (pips-(symbolApi?.[26]?.spreads/10)) * 10 * volume * symbolApi?.[5]?.price, 2) :
                symbol === "GBPCAD" ?
                    DecimalNumber(1/symbolApi?.[20]?.price * (pips-(symbolApi?.[20]?.spreads/10)) * 10 * volume * symbolApi?.[5]?.price, 2) :
                symbol === "EURGBP" ?
                    DecimalNumber(1/symbolApi?.[11]?.price * (pips-(symbolApi?.[11]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "EURCAD" ?
                    DecimalNumber(1/symbolApi?.[13]?.price * (pips-(symbolApi?.[13]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "EURAUD" ?
                    DecimalNumber(1/symbolApi?.[17]?.price * (pips-(symbolApi?.[17]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "EURNZD" ?
                    DecimalNumber(1/symbolApi?.[18]?.price * (pips-(symbolApi?.[18]?.spreads/10)) * 10 * volume * symbolApi?.[2]?.price, 2) :
                symbol === "NZDCAD" ?
                    DecimalNumber(1/symbolApi?.[27]?.price * (pips-(symbolApi?.[27]?.spreads/10)) * 10 * volume * symbolApi?.[7]?.price, 2) :
                symbol === "AUDNZD" ?
                    DecimalNumber(1/symbolApi?.[16]?.price * (pips-(symbolApi?.[16]?.spreads/10)) * 10 * volume * symbolApi?.[0]?.price, 2) :
                symbol === "AUDCAD" ?
                    DecimalNumber(1/symbolApi?.[12]?.price * (pips-(symbolApi?.[12]?.spreads/10)) * 10 * volume * symbolApi?.[0]?.price, 2) :
                0
            }
        </li>
    )
}