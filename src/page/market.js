import { Link } from "react-router-dom";
import bank from "../component/image/bank.png";
import ae from "../component/image/ae.png";
import star from "../component/image/star.png";
import { Tabs, List, Row, Col } from "antd";
import { MenuItem, Products } from "../database";
import { useDevice } from "../hooks";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export default function Market() {
  const { isMobile } = useDevice();
  const [showMenu, setShowMenu] = useState(false);

  const renderItem = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          description={
            <>
              <div className="relative group overflow-hidden hover:overflow-visible">
                <div
                  className={`absolute z-[2] invisible group-hover:visible duration-200 
                        translate-x-[-100%] 
                        group-hover:translate-x-0 translate-y-[100%] 
                        group-hover:translate-y-0 bg-white shadow-full p-[10px] 
                        pb-0 w-[calc(200%_+_20px)] max-w-[calc(200%_+_20px)] h-full 
                        overflow-y-hidden transition-all`}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex relative z-[1]">
                        <img
                          src={ae}
                          alt={item?.name}
                          className="w-[36px] h-[36px] object-cover"
                        />
                        <div>
                          <p className="p-1">{item?.name}</p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5]?.map((i) => {
                              return (
                                <img
                                  id={i}
                                  alt="icon-star"
                                  src={star}
                                  className="w-[10px] h-[10px]"
                                />
                              );
                            })}
                            <span className="w-[18px] h-[18px] block"></span>
                            <span>Experts</span>
                          </div>
                        </div>
                      </div>
                      <div> {item?.description} </div>
                    </div>
                    <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                      ${item?.price} <span>USD</span>
                    </p>
                  </div>
                </div>
                <Link to={`/market/detail/`}>
                  <div className="text-center border">
                    <div className="flex justify-center  w-full">
                      <img alt="avata-product" src={ae} />
                    </div>
                    <p className="p-1 font-semibold">{item?.name}</p>
                    <div className="flex items-center justify-center pt-[8px] pb-[16px]">
                      {[1, 2, 3, 4, 5]?.map((i) => {
                        return (
                          <img
                            id={i}
                            alt="icon-star"
                            src={star}
                            className="w-[10px] h-[10px]"
                          />
                        );
                      })}
                    </div>
                    <p className="border-t p-2  font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                      ${item?.price} <span>USD</span>
                    </p>
                  </div>
                </Link>
              </div>
            </>
          }
        />
      </List.Item>
    );
  };

  const renderItemForMobile = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<img alt="avata-product" src={ae} width={80} height={80} />}
          description={
            <>
              <div className="">
                <Link to={`/market/detail/`}>
                  <div className="">
                    <p className="text-[18px] text-[var(--black)]">
                      {item?.name}
                    </p>
                    <div className="flex items-center pt-[8px] pb-[16px]">
                      {[1, 2, 3, 4, 5]?.map((i) => {
                        return (
                          <img
                            id={i}
                            alt="icon-star"
                            src={star}
                            className="w-[10px] h-[10px]"
                          />
                        );
                      })}
                    </div>
                    <p className="">
                      ${item?.price} <span>USD</span>
                    </p>
                  </div>
                </Link>
              </div>
            </>
          }
        />
      </List.Item>
    );
  };

  const tabItem = [
    { key: "poupler", label: "Poupler" },
    { key: "new", label: "New" },
    { key: "free", label: "Free" },
    { key: "paid", label: "Paid" },
  ];

  const renderMenuItem = () => {
    return MenuItem?.map((item) => {
      const children = item?.children;
      return (
        <div className="border">
          <div className="pr-5 py-10 pl-5">
            <div id={item?.id}>
              <p className="flex">
                <img alt="icon-menu" src={bank} className="h-5 w-5" />{" "}
                <span className="pl-2">{item?.name}</span>
              </p>
              {children &&
                children?.map((i) => {
                  return (
                    <p className="flex pl-4 pt-3">
                      <img alt="icon-menu" src={bank} className="h-5 w-5" />{" "}
                      <span className="pl-2">{i?.name}</span>
                    </p>
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
      <div className="max-w-screen-2xl items-center mx-auto pt-10">
        <div className="">
          <Row>
            {isMobile && (
              <div
                className="!flex justify-between "
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className={"ml-[10px] mb-[10px]"}>
                  MetaTrader 4 / Experts{" "}
                </div>
                <div className={"ml-[10px]"}>
                  <DownOutlined />
                </div>
              </div>
            )}
            <Col
              xs={24}
              sm={4}
              className={`${!isMobile || (isMobile && showMenu ) ? "block" : "hidden"}`}
            >
              {renderMenuItem()}
            </Col>
            <Col xs={24} sm={20}>
              <div className=" border w-full">
                <div className="p-5 flex">
                  <input
                    type="text"
                    name="search"
                    className="block w-full border p-2"
                    placeholder="Search"
                  />
                  <select className="border">
                    <option value="" className="font-semibold" selected>
                      MetaTrader 5
                    </option>
                    <option value="" className="font-semibold">
                      MetaTrader 4
                    </option>
                  </select>
                </div>
                <Tabs
                  className={"ml-[20px] !rounded-none"}
                  type="card"
                  items={tabItem}
                />
                <p className="font-semibold p-5 text-2xl">MetaTrader 5</p>
                <List
                  className="ml-[20px]"
                  grid={{
                    gutter: 20,
                    xs: 1,
                    sm: 1,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 6,
                  }}
                  itemLayout="horizontal"
                  dataSource={Products}
                  renderItem={isMobile ? renderItemForMobile : renderItem}
                />
                <p className="font-semibold p-5 text-2xl">MetaTrader 4</p>
                <List
                  className="ml-[20px]"
                  grid={{
                    gutter: 20,
                    xs: 1,
                    sm: 1,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 6,
                  }}
                  itemLayout="horizontal"
                  dataSource={Products}
                  renderItem={isMobile ? renderItemForMobile : renderItem}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
