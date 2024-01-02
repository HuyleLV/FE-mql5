import { Link } from "react-router-dom";
import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { MenuItem } from "../../database";
import { useDevice } from "../../hooks";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Market() {
  const { isMobile } = useDevice();
  const [showMenu, setShowMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getAllMarket`)
      .then((res) => {
        const data = res?.data;
        setProducts(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

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
    fetchProducts();
    fetchCategory();
    console.log(category);
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
                            <img alt="avata-product" src={"/image/ae.png"} />
                          </div>
                          <p className="p-1 h-10 font-semibold text-black">{i?.product_name}</p>
                          <div className="flex items-center justify-center py-[16px]">
                            {[1, 2, 3, 4, 5]?.map((i) => {
                              return (
                                <img
                                  id={i}
                                  alt="icon-star"
                                  src={"/image/star.png"}
                                  className="w-[10px] h-[10px]"
                                />
                              );
                            })}
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
                                src={"/image/ae.png"}
                                alt={i?.product_name}
                                className="w-[36px] h-[36px] object-cover"
                              />
                              <div>
                                <p className="p-1">{i?.product_name}</p>
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5]?.map((i) => {
                                    return (
                                      <img
                                        id={i}
                                        alt="icon-star"
                                        src={"/image/star.png"}
                                        className="w-[10px] h-[10px]"
                                      />
                                    );
                                  })}
                                  <span className="w-[18px] h-[18px] block"></span>
                                  <span>Experts</span>
                                </div>
                              </div>
                            </div>
                            <div className="line-clamp-[8]">
                              <div dangerouslySetInnerHTML={{ __html: i?.product_description}}></div>
                            </div>
                          </div>
                          <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                            ${item?.product_price} <span>USD</span>
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
          <p className="font-semibold p-5 text-2xl">{item?.category_name}</p>
          <List
              itemLayout="vertical"
              dataSource={item?.product} 
              renderItem={(i)=> (
                <List.Item>
                  <>
                    <div className="relative">
                      <div className="absolute right-0 bottom-0 flex items-center justify-center w-[103px] h-[35px] border border-[#ccc] font-bold text-[#0873bc] text-[15px]">
                        <span>{i?.product_price} USD</span>
                      </div>
                      <Link
                        to={`/market/${i?.product_id}`}
                        className="flex items-center"
                      >
                        <img
                          alt="avata-product"
                          src={"/image/ae.png"}
                          width={80}
                          height={80}
                          className="mr-[20px]"
                        />
                        <div className="">
                          <p className="text-[18px] font-bold text-[var(--black)]">
                            {i?.product_name}
                          </p>
                          <div className="flex items-center pt-[8px] pb-[10px]">
                            {[1, 2, 3, 4, 5]?.map((i) => {
                              return (
                                <img
                                  id={i}
                                  alt="icon-star"
                                  src={"/image/star.png"}
                                  className="w-[10px] h-[10px]"
                                />
                              );
                            })}
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

  const renderMenuItem = () => {
    return category?.map((item) => {
      return (
        <div className="border">
          <div className="pr-5 py-10 pl-5">
            <div id={item?.category_id}>
              <Link to={`/category/${item?.category_id}`}>
                <p className="flex">
                  <img
                    alt="icon-menu"
                    src={item?.category_link}
                    className="h-5 w-5 rounded-full"
                  />{" "}
                  <span className="pl-2">{item?.category_name}</span>
                </p>
              </Link>
              {item?.categoryChild &&
                item?.categoryChild?.map((i) => { 
                  return (
                    <a href={`/${i?.categoryChild_id}`}>
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
      <div className="max-w-screen-2xl items-center mx-auto pt-10">
        <div className="">
          <Row>
            <Col
              xs={24}
              sm={4}
              className={`${
                !isMobile || (isMobile && showMenu) ? "block" : "hidden"
              }`}
            >
              {
                isMobile ? (
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
                                            <a href={`/${i?.categoryChild_id}`}>
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
                )
                
              }
            </Col>
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
