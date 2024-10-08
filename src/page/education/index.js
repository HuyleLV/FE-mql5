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
            <div className="my-[100px]">
                <p className="font-bold text-3xl text-center">---- Kiến thức Tipper Trade ----</p>

                {educationCategory?.map((_, index) => (
                    <div>
                        <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-5 pl-4">
                            <p className="font-bold text-2xl py-5">{_?.education_category_title}</p>
                        </div>
                        {_?.education_categorychild?.map((_, index) => (
                            <CollapseComponent education_categorychild={_} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}