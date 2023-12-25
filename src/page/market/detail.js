import { Link, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { List, message, Button } from "antd";
import { Comment, Products } from "../../database";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDevice } from "../../hooks";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";

export default function MarketDetail() {
  const [product, setProduct] = useState();
  const [cookies] = useCookies(["user"]);
  const params = useParams();
  const { isMobile } = useDevice();

  console.log(product);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const fetchproduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data;
        console.log("data", data);
        setProduct(data);
      })
      .catch(() => message.error("Error server!"));
  };

  const renderItem = (item) => {
    return (
      <List.Item key={item?.product_id}>
        <List.Item.Meta
          description={
            <>
              <div className="relative group overflow-hidden hover:overflow-visible item-container">
                <Link
                  to={`/market/${item?.product_id}`}
                  className="item-product group-hover:relative group-hover:opacity-0 group-hover:z-[3]"
                >
                  <div className="text-center border">
                    <div className="flex justify-center  w-full">
                      <img alt="avata-product" src={"/image/ae.png"} />
                    </div>
                    <p className="p-1 font-semibold">{item?.product_name}</p>
                    <div className="flex items-center justify-center pt-[8px] pb-[16px]">
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
                          src={"/image/ae.png"}
                          alt={item?.product_name}
                          className="w-[36px] h-[36px] object-cover"
                        />
                        <div>
                          <p className="p-1">{item?.product_name}</p>
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
                        <p className="inline">{item?.product_description}</p>
                      </div>
                    </div>
                    <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                      ${item?.product_price} <span>USD</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </List.Item>
    );
  };

  const renderItemForMobile = (item) => {
    return (
      <List.Item key={item?.product_id}>
        <List.Item.Meta
          description={
            <>
              <div className="relative">
                <div className="absolute right-0 bottom-0 flex items-center justify-center w-[103px] h-[35px] border border-[#ccc] font-bold text-[#0873bc] text-[15px]">
                  <span>{item?.price} USD</span>
                </div>
                <Link
                  to={`/market/${item?.product_id}`}
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
                      {item?.product_name}
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
          }
        />
      </List.Item>
    );
  };

  useEffect(() => {
    if (params?.id) fetchproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  return (
    <div className="max-w-screen-2xl items-center mx-auto pt-10">
      <p className="font-semibold p-5 text-xl">
        <span className="text-[#42639c]">Market</span> /{" "}
        <span className="text-[#42639c]">MetaTrader 5</span> /{" "}
        {product?.[0].product_name}
      </p>
      <div className="flex max-lg:flex-wrap">
        <div className="w-full md:w-1/2 mx-auto md:border">
          <div className="flex flex-col justify-center p-5">
            <img
              src={"/image/ae.png"}
              className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-tl-3xl rounded-br-3xl object-cover"
              alt="name"
            />
            <p className="text-[#42639c] font-bold pt-4">
              {product?.[0].product_price} USD
            </p>
            <button className="bg-[#42639c] py-2 w-[210px] mt-4 font-semibold text-white hover:bg-[#42637c]">
              Buy: {product?.[0].product_price} USD
            </button>
            <a href={product?.[0].product_link}>
              <button className="border border-[#42639c] py-2 w-[210px] mt-4 font-semibold text-[#42639c]">
                Free Demo
              </button>
            </a>
            <div className="mt-4 text-sm w-full">
              <p>
                Demo downloaded: <span className="pl-2">9 427</span>
              </p>
              <p>
                Published: <span className="pl-2">8 August 2023</span>
              </p>
              <p>
                Current version: <span className="pl-2">3.5</span>
              </p>
            </div>
            <button className="border border-[#42639c] py-2 w-[210px] mt-4 font-lg text-[#42639c] text-sm">
              More from author
            </button>
          </div>
        </div>
        <div className="max-lg:w-full w-4/5 border">
          <div className="flex items-center">
            <p className="font-semibold pt-5 pl-5 text-2xl capitalize">
              {product?.[0].product_name}
            </p>
            <div className="flex pt-2 pl-5">
              {[1, 2, 3, 4, 5]?.map((i) => {
                return (
                  <img
                    id={i}
                    alt="icon-star"
                    src={"/image/star.png"}
                    className="h-4 w-4 ml-1"
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-[20px] pl-5 pt-1">
            <p className="flex items-center">
              <img src={"/image/bank.png"} alt="icon" className="h-4 w-4" />
              <span className="pl-2 text-[#42639c] font-semibold">{product?.[0].categoryChild_name}</span>
            </p>
            <p className="flex items-center">
              <img src={"/image/bank.png"} alt="icon" className="h-4 w-4" />
              <span className="pl-2 text-[#42639c] font-semibold">
                Bogdan Ion Puscasu
              </span>
            </p>
            <p className="flex items-center">
              Version:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">{product?.[0].product_version}</span>
            </p>
            <p className="flex items-center">
              Updated:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">
                {dayjs(product?.[0].create_at).format('DD/MM/YYYY')}
              </span>
            </p>
            <p className="flex items-center">
              Activations:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">{product?.[0].product_activations}</span>
            </p>
          </div>
          <div
            className="p-5"
            dangerouslySetInnerHTML={{
              __html: product?.[0].product_description,
            }}
          ></div>

          <Carousel responsive={responsive} className="p-5">
            {product?.[0].product_image !== undefined ?
              JSON.parse(product?.[0].product_image).map((_) => (
                <div>
                  <img
                    alt="icon"
                    src={_}
                    className="h-[250px] max-w-xl"
                  />
                </div>
              )) : <></>
            }
          </Carousel>

          <div>
            <p className="font-semibold text-2xl p-5">Comment</p>
            {Comment.map((i) => {
              return (
                <div className="flex border">
                  <div className="w-1/3 md:w-1/6 p-4">
                    <p className="flex justify-center">
                      <img
                        alt="img"
                        src={"/image/ae.png"}
                        className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                      />
                    </p>
                    <p className="text-center pt-1 text-[11px]">141</p>
                  </div>
                  <div className="w-2/3 md:w-5/6">
                    <div className="flex py-5 max-md:flex-col">
                      <p className="font-bold text-[#42639c]">{i.userName}</p>
                      <p className="text-[10px] pt-1 px-2">{i.createAt}</p>
                      <div className="flex pt-1">
                        {[1, 2, 3, 4, 5]?.map((i) => {
                          return (
                            <img
                              id={i}
                              alt="icon-star"
                              src={"/image/star.png"}
                              className="h-4 w-4 ml-1 first:ml-0"
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p>{i.content}</p>
                  </div>
                </div>
              );
            })}

            {cookies?.user && (
              <div className="p-[10px]">
                <div className="mb-[10px] w-full">
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Gửi nhận xét về sản phẩm"
                  ></textarea>
                </div>
                <Button>Gửi</Button>
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-2xl p-5">Recommended products</p>
            <List
              className="ml-[20px]"
              grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
              itemLayout="horizontal"
              dataSource={Products}
              renderItem={isMobile ? renderItemForMobile : renderItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
