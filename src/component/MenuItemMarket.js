import { Link } from "react-router-dom";
import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDevice } from "../hooks";

export default function MenuItemMarket() {
  const { isMobile } = useDevice();
  const [showMenu, setShowMenu] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((res) => {
        const data = res?.data;
        setCategory(data);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const renderMenuItem = () => {
    return category?.map((item) => {
      return (
        <div className="border">
          <div className="pr-5 py-10 pl-5">
            <div id={item?.category_id}>
              <a href={`/category/${item?.category_id}`}>
                <p className="flex">
                  <img
                    alt="icon-menu"
                    src={item?.category_link}
                    className="h-5 w-5 rounded-full"
                  />{" "}
                  <span className="pl-2">{item?.category_name}</span>
                </p>
              </a>
              {item?.categoryChild &&
                item?.categoryChild?.map((i) => { 
                  return (
                    <a href={`/category-child/${item?.category_id}/${i?.categoryChild_id}`}>
                      <p className="flex pl-4 pt-3">
                        <img
                          alt="icon-menu"
                          src={i?.categoryChild_link}
                          className="h-5 w-5 rounded-full"
                        />{" "}
                        <span className="pl-2">{i?.categoryChild_name}</span>
                      </p>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
        <Col
            xs={24}
            sm={4}
            className={`${
            !isMobile || (isMobile && showMenu) ? "block" : "hidden"
            }`}
        >
            {isMobile ? (
                <>
                    <Dropdown
                        className="bg-white w-full"
                        dropdownRender={(menu) => (
                        <div className="bg-white border py-2">
                            {menu}
                            {category?.map((item) => {
                                return (
                                <div className="w-full">
                                    <div className="pr-5 py-2 pl-8">
                                    <div id={item?.category_id}>
                                        <a href={`/category/${item?.category_id}`}>
                                        <p className="flex">
                                            <img
                                            alt="icon-menu"
                                            src={item?.category_link}
                                            className="h-6 w-6 rounded-full"
                                            />{" "}
                                            <span className="pl-2 text-[#404040] font-semibold text-[16px]">{item?.category_name}</span>
                                        </p>
                                        </a>
                                        {item?.categoryChild &&
                                        item?.categoryChild?.map((i) => { 
                                            return (
                                            <a href={`/category-child/${item?.category_id}/${i?.categoryChild_id}`}>
                                                <p className="flex pl-6 pt-2">
                                                <img
                                                    alt="icon-menu"
                                                    src={i?.categoryChild_link}
                                                    className="h-6 w-6 rounded-full"
                                                />{" "}
                                                <span className="pl-2 text-[#404040] font-medium text-[15px]">{i?.categoryChild_name}</span>
                                                </p>
                                            </a>
                                            );
                                        })}
                                    </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        )}
                        openClassName="select-none"
                        trigger={['click']}
                    >
                        <Space
                        className="text-black relative w-full py-2 px-4 border"
                        >
                        <span className="font-semibold text-[16px]">All</span>
                        <DownOutlined className="absolute right-2 top-3"/>
                        </Space>
                    </Dropdown>
                </>
            ) : (
                renderMenuItem()
            )}
        </Col>
    </>
  );
}
