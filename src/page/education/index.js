import { Col, Collapse, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import CollapseComponent from "../../component/collapse";

export default function Education() {  
    const [educationCategory, setEducationCategory] = useState([]); 


    const getAllEducationCategory = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/educationCategory/getAllWeb`
            )
            .then(({ data }) => {
                setEducationCategory(data);
            });
    }

    useEffect(() => { 
        getAllEducationCategory();
    }, []);

    return (
        <div className="max-w-screen-2xl items-center mx-auto">
            <div className="mt-[100px]">
                <p className="font-bold text-3xl text-center">---- Kiến thức Net Partner ----</p>
                <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-5 pl-4">
                    <p className="font-bold text-2xl py-5">Kiến thức nền tảng</p>
                </div>
                
                {educationCategory?.map((_, index) => (
                    <CollapseComponent educationCategory={_} />
                ))}
            </div>
        </div>
    )
}