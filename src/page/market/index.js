import { Link, useLocation, useParams } from "react-router-dom";
import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { useDevice } from "../../hooks";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MenuItem from "../../component/MenuItemMarket";
import { useCookies } from "react-cookie";

export default function Market() {
  const { isMobile } = useDevice();
  const token = useLocation();
  const [products, setProducts] = useState([]);
  const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);

  const fetchProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getAllMarket`)
      .then((res) => {
        const data = res?.data;
        setProducts(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchProducts();
    if(new URLSearchParams(token.search).get('token') !== null) {
      setCookieToken("accessToken", new URLSearchParams(token.search).get('token'));
    }
  }, []);

  const renderItem = (item) => {
    if(item?.product?.length > 0){
      return (
        <>
          <List.Item
            key={item?.category_name}
          >
            <p className="font-semibold p-5 text-2xl">{item?.category_name}</p>
            <List 
              itemLayout="horizontal"
              dataSource={item?.product} 
              grid={{ gutter: 20, column: 6 } }
              renderItem={(i)=> (
                <List.Item>
                  <>
                    <div className="relative group overflow-hidden hover:overflow-visible item-container">
                      <Link
                        to={`/market/${i?.product_id}`}
                        className="item-product group-hover:relative group-hover:opacity-0 group-hover:z-[3]"
                      >
                        <div className="text-center border">
                          <div className="flex justify-center  w-full">
                            <img alt="avata-product" src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null} />
                          </div>
                          <p className="p-1 h-10 font-bold text-black">{i?.product_name}</p>
                          <div className="flex items-center justify-center py-[16px]">
                            <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                          </div>
                          <p className="border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                            ${i?.product_price} <span>USD</span>
                          </p>
                        </div>
                      </Link>
                      <div
                        className="absolute z-[2] duration-200 info-item
                              top-0 left-0 w-0
                              bg-white p-0
                              pb-0 max-w-[calc(200%_+_20px)] h-full 
                              overflow-y-hidden transition-all"
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <div className="flex relative z-[1]">
                              <img
                                src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                                alt={i?.product_name}
                                className="w-[50px] h-[50px] object-cover"
                              />
                              <div className="px-4">
                                <p className="font-bold">{i?.product_name}</p>
                                <div className="flex items-center">
                                  <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                                  <span className="w-[18px] h-[18px] block"></span>
                                  <span>{i?.categoryChild_name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="line-clamp-[8]">
                              <div dangerouslySetInnerHTML={{ __html: i?.product_description}}></div>
                            </div>
                          </div>
                          <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                            ${i?.product_price} <span>USD</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                </List.Item>
              )}
            />
          </List.Item>
        </>
      );
    }
  };

  const renderItemForMobile = (item) => {
    
    if(item?.product?.length > 0){
      return (
        <List.Item>
          <p className="font-semibold p-2 text-2xl">{item?.category_name}</p>
          <List
              itemLayout="vertical"
              dataSource={item?.product} 
              renderItem={(i)=> (
                <List.Item>
                  <>
                    <div className="relative">
                      <div className="absolute right-0 bottom-2 flex items-center justify-center w-[103px] h-[35px] border border-[#ccc] font-bold text-[#0873bc] text-[15px]">
                        <span>{i?.product_price} USD</span>
                      </div>
                      <Link
                        to={`/market/${i?.product_id}`}
                        className="flex items-center"
                      >
                        <img
                          alt="avata-product"
                          src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                          width={80}
                          height={80}
                          className="mr-[10px]"
                        />
                        <div className="">
                          <p className="text-[18px] font-bold text-[var(--black)]">
                            {i?.product_name}
                          </p>
                          <div className="flex items-center pt-[8px] pb-[10px]">
                            <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                </List.Item>
            )}
          />
        </List.Item>
      );
    }
  };

  const tabItem = [
    { key: "poupler", label: "Poupler" },
  ];

  return (
    <>
      <div className="max-w-screen-2xl items-center mx-auto pt-10">
        <div className="">
          <Row>
            {MenuItem()}
            <Col xs={24} sm={20}>
              <div className=" border w-full p-5">
                <Tabs
                  className={"ml-[20px] !rounded-none"}
                  type="card"
                  items={tabItem}
                />
                <List
                  className="ml-[20px]"
                  rootClassName="item-cont"
                  itemLayout="vertical"
                  dataSource={products}
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
