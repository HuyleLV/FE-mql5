import { Link, useParams } from "react-router-dom";
import { Tabs, List, Row, Col, message, Rate, Pagination, Select, Dropdown, Space } from "antd";
import { useDevice } from "../../../hooks/useDevice";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItemMarket from "../../../component/MenuItemMarket";

export default function CategoryDetail() {
  const { isMobile } = useDevice();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const fetchProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/categoryChild/getProductById`, {params: {
        page: pagination?.page,
        pageSize: pagination?.pageSize,
        category_id: params?.category_id,
        categoryChild_id: params?.categoryChild_id
      }})
      .then((res) => {
        const data = res?.data;
        setProducts(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination]);

  const renderItem = (item) => {
    return (
      <>
        <List.Item>
          <div className="relative group overflow-hidden hover:overflow-visible item-container">
            <Link
              to={`/market/${item?.product_id}`}
              className="item-product group-hover:relative group-hover:opacity-0 group-hover:z-[3]"
            >
              <div className="text-center border">
                <div className="flex justify-center  w-full">
                  <img alt="avata-product" src={item?.product_image ? JSON.parse(item?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null} />
                </div>
                <p className="p-1 h-10 font-semibold text-black">{item?.product_name}</p>
                <div className="flex items-center justify-center py-[16px]">
                  <Rate style={{ fontSize: 15 }} allowHalf defaultValue={item?.average !== null ? item?.average : 5} disabled/>
                </div>
                <p className="border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                  ${item?.product_price} <span>USD</span>
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
                      src={item?.product_image ? JSON.parse(item?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                      alt={item?.product_name}
                      className="w-[50px] h-[50px] object-cover"
                    />
                    <div className="px-4">
                      <p className="font-bold">{item?.product_name}</p>
                      <div className="flex items-center">
                        <Rate style={{ fontSize: 15 }} allowHalf defaultValue={item?.average !== null ? item?.average : 5} disabled/>
                        <span className="w-[18px] h-[18px] block"></span>
                        <span>{item?.categoryChild_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="line-clamp-[8] pt-2">
                    <div dangerouslySetInnerHTML={{ __html: item?.product_description}}></div>
                  </div>
                </div>
                <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                  ${item?.product_price} <span>USD</span>
                </p>
              </div>
            </div>
          </div>
        </List.Item>
      </>
    );
  };

  const renderItemForMobile = (item) => {
    return (
      <List.Item>
        <p className="font-semibold p-5 text-2xl">{item?.category_name}</p>
        <List.Item.Meta
          description={
            <>
              <div className="relative">
                <div className="absolute right-0 bottom-0 flex items-center justify-center w-[103px] h-[35px] border border-[#ccc] font-bold text-[#0873bc] text-[15px]">
                  <span>{item?.product_price} USD</span>
                </div>
                <Link
                  to={`/market/${item?.product_id}`}
                  className="flex items-center"
                >
                  <img
                    alt="avata-product"
                    src={item?.product_image ? JSON.parse(item?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                    width={80}
                    height={80}
                    className="mr-[20px]"
                  />
                  <div className="">
                    <p className="text-[18px] font-bold text-[var(--black)]">
                      {item?.product_name}
                    </p>
                    <div className="flex items-center pt-[8px] pb-[10px]">
                      <Rate style={{ fontSize: 15 }} allowHalf defaultValue={item?.average !== null ? item?.average : 5} disabled/>
                    </div>
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
  ];

  return (
    <>
      <div className="max-w-screen-2xl items-center mx-auto pt-10">
        <div className="">
          <Row>
            {MenuItemMarket()}
            <Col xs={24} sm={20} className="pb-10">
              <div className="border w-full p-5">
                <p className="p-5 font-bold text-2xl text-[#42639c]">{products?.category_name}/ {products?.categoryChild_name}</p>
                <Tabs
                  className={"ml-[20px] !rounded-none"}
                  type="card"
                  items={tabItem}
                />
                <div className="pb-5">
                  <List
                    className="ml-[20px] h-full"
                    rootClassName="item-cont"
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
                    dataSource={products?.data}
                    renderItem={isMobile ? renderItemForMobile : renderItem}
                  />
                </div>
                <Pagination
                  className="flex justify-center"
                  current={pagination.page}
                  total={products?.total}
                  pageSize={pagination.pageSize}
                  onChange={(p)=> {
                    setPagination({
                      page: p,
                      pageSize: pagination.pageSize
                    })
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
