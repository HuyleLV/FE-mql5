import { BookOutlined, DownOutlined, PaperClipOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

export default function CollapseComponent({ education_categorychild }) {
    const [collapsed, setCollapsed] = useState(true);
    const [education, setEducation] = useState([]); 
  
    const toggleCollapse = async (education_categoryChild_id) => {
      setCollapsed(!collapsed);
      console.log(education_categoryChild_id);

      await axios
          .get(
              `${process.env.REACT_APP_API_URL}/education/getByIdCategoryChild/${education_categoryChild_id}`
          )
          .then(({ data }) => {
            console.log(data);
              setEducation(data);
          });
    };

    return (
      <div>
          <div 
            className="w-full bg-[#F7F9FA] cursor-pointer border-t border-x border-[#d1d7dc]"
            onClick={()=>toggleCollapse(education_categorychild?.education_categoryChild_id)}
          >
            <div className="flex justify-between px-10 py-5">
              <p className="font-semibold text-xl"><BookOutlined /> {education_categorychild?.education_categoryChild_title}</p>
              <p>{collapsed ? <DownOutlined /> : <RightOutlined />}</p> 
            </div>
          </div>
          <div className="bg-[#ebeff3]">
              {collapsed ? 
                null 
                : 
                <div className="text-black px-10">
                  {education?.map((_, index)=> (
                    <div className="flex items-center border-y py-4">
                      <img src={_?.education_image} style={{width: 30, height: 30}}/>
                      <p className="pl-5 font-semibold">
                        {_?.education_title}
                      </p>
                    </div>
                  ))}
                </div>
              }
            </div>
      </div>
    );
};