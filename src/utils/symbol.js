import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const Symbol = (symbol) => {
    const [dataSymbol, setDataSymbol] = useState();
    
    const getBySymbol = async (symbol) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/symbol/getBySymbol/${symbol}`)
            .then((res) => {
                const data = res?.data[0];
                setDataSymbol(data);
            })
            .catch(() => message.error("Error server!"));

    }
        
    useEffect(() => { 
        if(dataSymbol != undefined) {
            const interval = setInterval(async () => {
                try {
                  const response = await axios.get(`${process.env.REACT_APP_API_URL}/symbol/getBySymbol/${symbol}`)
                  setDataSymbol(response?.data[0]);
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              }, 1500);
          
              return () => clearInterval(interval);
        }else {
            getBySymbol(symbol);
        }

    }, [symbol, dataSymbol]);

    return (
        <>
            <p className="text-center font-bold text-[#004AAD] text-xl">{symbol}</p>
            <p className="text-center font-bold text-lg">{dataSymbol?.price}</p>
        </>
    )
}