import { Link, Navigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { List, message, Button, Rate, Modal, Upload, Tooltip, Pagination, Image } from "antd";
import { Products } from "../../database";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useDevice } from "../../hooks";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { InboxOutlined } from "@ant-design/icons";
import CustomUpload from "../../component/customUpload";
import Paragraph from "antd/es/typography/Paragraph";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", borderRadius: "5px"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", borderRadius: "5px"}}
      onClick={onClick}
    />
  );
}

export default function MarketDetail() {
  const [product, setProduct] = useState();
  const [productRecommend, setProductRecommend] = useState();
  const [comment, setComment] = useState();
  const [cookies] = useCookies(["user"]);
  const params = useParams();
  const { isMobile } = useDevice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [rateComment, setRateComment] = useState(5);
  const [comment_content, setcomment_content] = useState("");
  const [imgTransfer, setImgTransfer] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [paginationComment, setPaginationComment] = useState({
    page: 1,
    pageSize: 6,
  });
  
  const [VideoYoutube, setVideoYoutube] = useState(false);

  var settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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

  const handleOk = async () => {
    if(imgTransfer !== "") {
      const transfer = {
        transfer_content: cookies?.user?.displayName + " chuyen tien",
        transfer_price: product?.[0].product_price,
        transfer_status: 1,
        transfer_image: imgTransfer,
        product_id: product?.[0].product_id,
        create_by: cookies?.user.user_id,
      };
  
      await axios
        .post(`${process.env.REACT_APP_API_URL}/transfer/create`, transfer)
        .then((res) => {
          message.success("Gửi lệnh chuyển tiền thành công!")
          setIsModalOpen(false);
        })
        .catch(() => message.error("Error server!"));
    } else {
      message.error("Bạn chưa tải ảnh chứng minh lên!")
    }
  };

  const fetchproduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data;
        setProduct(data);
        fetchProductRecommend(data?.[0].category_id)
      })
      .catch(() => message.error("Error server!"));
  };

  const fetchProductRecommend = async (category_id) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category/getByProduct/${category_id}`, {params: pagination})
      .then((res) => {
        const data = res?.data;
        setProductRecommend(data);
      })
      .catch(() => message.error("Error server!"));
  };

  const fetchcomment = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/comment/getById/${params?.id}`, {params: paginationComment})
      .then((res) => {
        const data = res?.data;
        setComment(data);
      })
      .catch(() => message.error("Error server!"));
  };

  const postcomment = async () => {
    const value = {
      comment_content: comment_content.target.value,
      comment_star: rateComment,
      product_id: params?.id,
      create_by: cookies?.user.user_id,
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/comment/create`, value)
      .then((res) => {
        message.success("Bình luận thành công");
        fetchcomment();
      });
  };

  const activate = async () => {
    const i =  product?.[0].product_activations + 1;
    await axios
      .post(`${process.env.REACT_APP_API_URL}/product/updateActivation/${product?.[0].product_id}`, {
        product_activations: i
      })
      .then((res) => {
        fetchproduct()
        // message.success("Download demo");
      });
  }
  
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
                <div className="flex flex-col justify-between h-full text-black">
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
                    <div className="line-clamp-[8]">
                      <div dangerouslySetInnerHTML={{ __html: item?.product_description}}></div>
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

  useEffect(() => {
    if (params?.id) {
      fetchproduct();
      fetchcomment();
    }
  }, [params?.id, pagination, paginationComment]);

  const productLink = useMemo(() => {
    const productImage = product?.[0]?.product_image;
    const coverImage = productImage ? JSON.parse(productImage) : undefined;
    return coverImage;
  }, [product]);

  const logo = useMemo(() => {
    const link = productLink?.filter((i) => i?.type === "logo");
    const data = link?.[0]?.data;
    return data !== "" ? data : undefined;
  }, [productLink]);

  const linkVideo = useMemo(() => {
    const link = productLink?.filter((i) => i?.type === "video");
    const data = link?.[0]?.data;
    return data !== "" ? data : undefined;
  }, [productLink]);

  const linkImage = useMemo(() => {
    const link = productLink?.filter((i) => i?.type === "image");
    return link?.[0]?.data;
  }, [productLink]);

  return (
    <div className="max-w-screen-2xl items-center mx-auto pt-5">
      <p className="font-semibold px-5 py-1 text-xl border-b">
      <a href={`/market`}><span className="text-[#42639c] font-bold">Market</span></a> /{" "}
        <a href={`/category/${product?.[0].category_id}`}><span className="text-[#42639c] font-bold">{product?.[0].category_name}</span></a> /{" "}
        {product?.[0].product_name}
      </p>
      {isMobile ? (
        <div>
          <div className="flex px-4 py-2">
            <img
              src={logo}
              className="w-[120px] h-[120px] rounded-tl-3xl rounded-br-3xl object-cover"
              alt="name"
            />
            <div className="pl-5">
              <p className="font-bold text-xl">{product?.[0].product_name}</p>
              <p className="text-sm font-medium text-slate-500 py-1">by {product?.[0].displayName}</p>
              <Rate style={{fontSize: 18}} allowHalf value={product?.[0].average !== null ? product?.[0].average : 5} disabled />
              <p className="text-lg font-bold text-[#1ba921] py-1">{product?.[0].product_price} USD</p>
            </div>
          </div>
          <div className="px-4">
            <button
              className="bg-[#42639c] py-2 w-full mt-2 font-semibold text-white hover:bg-[#42637c]"
              onClick={() => setIsModalOpen(true)}
            >
              Buy: {product?.[0].product_price} USD
            </button>
            <a target="_blank" href={product?.[0].product_link} rel="noreferrer" >
              <button className="border border-[#42639c] w-full py-2 w-[210px] mt-4 font-semibold text-[#42639c]" onClick={activate}>
                Free Demo
              </button>
            </a>
          </div>
          <div className="px-4 py-4">
            <div class="relative">
              <p class="absolute left-0">Category:</p>
              <p class="absolute right-0">{product?.[0].categoryChild_name}</p>
            </div>
            <div class="relative py-8">
              <p class="absolute left-0">Activations:</p>
              <p class="absolute right-0">{product?.[0].product_activations}</p>
            </div>
            <div class="relative">
              <p class="absolute left-0">Demo downloaded:</p>
              <p class="absolute right-0">{product?.[0].product_activations}</p>
            </div>
            <div class="relative py-8">
              <p class="absolute left-0">Author:</p>
              <p class="absolute right-0">{product?.[0].displayName}</p>
            </div>
            <div class="relative">
              <p class="absolute left-0">Published:</p>
              <p class="absolute right-0">{dayjs(product?.[0].create_at).format("DD/MM/YYYY")}</p>
            </div>
            <div class="relative py-8">
              <p class="absolute left-0">Current version:</p>
              <p class="absolute right-0">{product?.[0].product_version}</p>
            </div>
          </div>
          <div className="border-t pt-2">
            <p className="font-bold text-xl px-4">{product?.[0].product_name}</p>
            {
              hide === true 
              ?
                <div className="p-5">
                  <div className="max-w-full">
                    {parse(String(product?.[0].product_description).replaceAll("ul>","p>"))}
                  </div>
                  <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(false)}>Hide</button>
                </div>
              :
                <div className="p-5">
                  <div className="h-24 truncate">
                    {parse(String(product?.[0].product_description).replaceAll("ul>","p>"))}
                  </div>
                  <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(true)}>More</button>
                </div>
            }
            {/* {productLink && (
              <Carousel responsive={responsive} className="p-5">
                {linkVideo && (
                  <iframe
                    className="h-[250px] w-[400px]"
                    src={linkVideo}
                    title="Quantum Emperor"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
                {linkImage &&
                  linkImage?.map((i) => {
                    return (
                      <div>
                        <img alt="icon" src={i} className="h-[250px] max-w-xl" />
                      </div>
                    );
                  })}
              </Carousel>
            )} */}

            <Slider {...settings}>
              {linkVideo && (
                  <iframe
                    className="h-[250px] w-[400px]"
                    src={linkVideo}
                    title="Quantum Emperor"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}

              {linkImage &&
                linkImage?.map((i) => {
                  return (
                    <Image alt="icon" height={"250px"} src={i} className="px-1"/>
                  );
                }
              )}
            </Slider>

            {comment?.lenght > 0 ? 
              <div className="pb-10">
                <p className="font-semibold text-2xl p-5">Comment</p>
                {comment.map((i) => {
                  return (
                    <div className="flex border">
                      <div className="w-1/3 md:w-1/6 p-4">
                        <p className="flex justify-center">
                          <img
                            alt="img"
                            src={i.photos}
                            className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                          />
                        </p>
                      </div>
                      <div className="w-2/3 md:w-5/6">
                        <div className="flex py-5 max-md:flex-col">
                          <p className="font-bold text-[#42639c]">
                            {i.displayName}
                          </p>
                          <p className="text-[10px] pt-1 px-2">
                            {dayjs(i.create_at).format("DD/MM/YYYY hh:mm")}
                          </p>
                          <Rate allowHalf value={i.comment_star} disabled />
                        </div>
                        <p>{i.comment_content}</p>
                      </div>
                    </div>
                  )})
                }
              </div>  
               : 
                <></>
              }      
              <div className="px-2 py-6">
                <p className="font-semibold text-2xl py-5">Recommended products</p>
                <List
                  className="ml-[20px]"
                  grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
                  itemLayout="horizontal"
                  dataSource={productRecommend?.data}
                  renderItem={isMobile ? renderItemForMobile : renderItem}
                />
                <Pagination
                  className="flex justify-center"
                  current={pagination.page}
                  total={productRecommend?.total}
                  pageSize={pagination.pageSize}
                  onChange={(p)=> {
                    setPagination({
                      page: p,
                      pageSize: pagination.pageSize
                    })
                  }}
                />
              </div>
          </div>
        </div>
      ): (
        <div className="flex max-lg:flex-wrap">
          <div className="w-full md:w-1/2 mx-auto md:border">
            <div className="flex flex-col justify-center p-5">
              <img
                src={logo}
                className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-tl-3xl rounded-br-3xl object-cover"
                alt="name"
              />
              <p className="text-[#42639c] font-bold pt-4">
                {product?.[0].product_price} USD
              </p>
              <button
                className="bg-[#42639c] py-2 w-[210px] mt-4 font-semibold text-white hover:bg-[#42637c]"
                onClick={() => setIsModalOpen(true)}
              >
                Buy: {product?.[0].product_price} USD
              </button>
              <a target="_blank" href={product?.[0].product_link} rel="noreferrer" >
                <button className="border border-[#42639c] py-2 w-[210px] mt-4 font-semibold text-[#42639c]" onClick={activate}>
                  Free Demo
                </button>
              </a>
              <div className="mt-4 text-sm w-full">
                <p>
                  Demo downloaded: <span className="pl-2">{product?.[0].product_activations}</span>
                </p>
                <p>
                  Published: <span className="pl-2">{dayjs(product?.[0].create_at).format("DD/MM/YYYY")}</span>
                </p>
                <p>
                  Current version: <span className="pl-2">{product?.[0].product_version}</span>
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
                <Rate allowHalf value={product?.[0].average !== null ? product?.[0].average : 5} disabled />
              </div>
            </div>
            <div className="flex flex-wrap gap-[20px] pl-5 pt-1">
              <p className="flex items-center">
                <img src={"/image/bank.png"} alt="icon" className="h-4 w-4" />
                <span className="pl-2 text-[#42639c] font-semibold">
                  {product?.[0].categoryChild_name}
                </span>
              </p>
              <p className="flex items-center">
                <img src={"/image/bank.png"} alt="icon" className="h-4 w-4" />
                <span className="pl-2 text-[#42639c] font-semibold">
                  by {product?.[0].displayName}
                </span>
              </p>
              <p className="flex items-center">
                Version:{" "}
                <span className="pl-2 text-[#42639c] font-semibold">
                  {product?.[0].product_version}
                </span>
              </p>
              <p className="flex items-center">
                Updated:{" "}
                <span className="pl-2 text-[#42639c] font-semibold">
                  {dayjs(product?.[0].create_at).format("DD/MM/YYYY")}
                </span>
              </p>
              <p className="flex items-center">
                Activations:{" "}
                <span className="pl-2 text-[#42639c] font-semibold">
                  {product?.[0].product_activations}
                </span>
              </p>
            </div>
            {
              hide === true 
              ?
                <div className="p-5">
                  <div>
                    {parse(String(product?.[0].product_description).replaceAll("ul>","p>"))}
                  </div>
                  <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(false)}>Hide</button>
                </div>
              :
                <div className="p-5">
                  <div className="h-24 truncate">
                    {parse(String(product?.[0].product_description).replaceAll("ul>","p>"))}
                  </div>
                  <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(true)}>More</button>
                </div>
            }

            {/* {productLink && (
              <Carousel responsive={responsive} className="p-5">
                {linkVideo && (
                  <iframe
                    className="h-[250px] w-[400px]"
                    src={linkVideo}
                    title="Quantum Emperor"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
                {linkImage &&
                  linkImage?.map((i) => {
                    return (
                      <div>
                        <img alt="icon" src={i} className="h-[250px] max-w-xl" />
                      </div>
                    );
                  })}
              </Carousel>
            )} */}

            <Slider {...settings}>
              <div>
                <img src="https://geekflare.com/wp-content/uploads/2022/10/demo-video-creators-800x420.jpg" className="h-[250px]" onClick={()=>setVideoYoutube(true)}/>
              </div>

              {linkImage &&
                linkImage?.map((i) => {
                  return (
                    <Image alt="icon" height={"250px"} src={i} className="px-1"/>
                  );
                }
              )}
            </Slider>

            <Modal title="Video demo" width={1000} open={VideoYoutube} onOk={()=>setVideoYoutube(false)} onCancel={()=>setVideoYoutube(false)}>
              {linkVideo && (
                <iframe
                  className="h-[600px] w-full"
                  src={linkVideo}
                  title="Quantum Emperor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              )}
            </Modal>

            <div>
              <p className="font-semibold text-2xl p-5">Comment</p>
              {comment?.data !== undefined ? 
                <>
                  {comment.data?.map((i) => {
                    return (
                      <>
                        <div className="flex border">
                          <div className="w-1/3 md:w-1/6 p-4">
                            <p className="flex justify-center">
                              <img
                                alt="img"
                                src={i.photos}
                                className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                              />
                            </p>
                          </div>
                          <div className="w-2/3 md:w-5/6">
                            <div className="flex py-5 max-md:flex-col">
                              <p className="font-bold text-[#42639c]">
                                {i.displayName}
                              </p>
                              <p className="text-[10px] pt-1 px-2">
                                {dayjs(i.create_at).format("DD/MM/YYYY hh:mm")}
                              </p>
                              <Rate allowHalf value={i.comment_star} disabled />
                            </div>
                            <p>{i.comment_content}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="py-6">
                    <Pagination
                      className="flex justify-center"
                      current={paginationComment.page}
                      total={comment?.total}
                      pageSize={paginationComment.pageSize}
                      onChange={(p)=> {
                        setPaginationComment({
                          page: p,
                          pageSize: paginationComment.pageSize
                        })
                      }}
                    />
                  </div>
                </>
               : <></>
              }

              {cookies?.user && (
                <div className="p-[10px]">
                  <div className="mb-[10px] w-full">
                    <textarea
                      id="comment_content"
                      name="comment_content"
                      rows="4"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Gửi nhận xét về sản phẩm"
                      onChange={setcomment_content}
                    ></textarea>
                  </div>
                  <p>
                    <Rate
                      allowHalf
                      onChange={setRateComment}
                      value={rateComment}
                    />
                  </p>
                  <Button className="my-5 w-[200px] h-10" onClick={postcomment}>
                    Gửi
                  </Button>
                </div>
              )}
            </div>

            <div className="px-2 py-10">
              <p className="font-semibold text-2xl py-5">Recommended products</p>
              <List
                className="ml-[20px]"
                grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
                itemLayout="horizontal"
                dataSource={productRecommend?.data}
                renderItem={isMobile ? renderItemForMobile : renderItem}
              />
              <Pagination
                className="flex justify-center"
                current={pagination.page}
                total={productRecommend?.total}
                pageSize={pagination.pageSize}
                onChange={(p)=> {
                  setPagination({
                    page: p,
                    pageSize: pagination.pageSize
                  })
                }}
              />
            </div>
          </div>
      </div>
      )}

      {cookies?.user ? (
        <Modal
          title="Thanh toán qua mã QR"
          className="grid justify-items-center"
          open={isModalOpen}
          onOk={handleOk}
          okText="Đã chuyển tiền"
          cancelText="Chưa chuyển tiền"
          onCancel={() => setIsModalOpen(false)}
          okButtonProps={{ className: "bg-blue-500" }}
        >
          <center>
            <img
              src={
                "https://vinacheck.vn/media/2019/05/ma-qr-code_vinacheck.vm_001.jpg"
              }
              className="w-[300px] h-[300px]"
            />
          </center>
          <p className="flex px-5 pt-5 text-lg">
            Nội dung CK:{" "}
              <Paragraph copyable={{ text: cookies?.user?.displayName + " chuyen tien", tooltips: false }}>
                <span className="font-semibold text-xl pl-5">{cookies?.user?.displayName} chuyen tien</span>
              </Paragraph>
          </p>
          <p className="px-5 pb-3 text-lg">
            Giá:{" "}
            <span className="font-bold p-5 text-xl text-red-500">
              {product?.[0].product_price} USD
            </span>
          </p>
          <div className="px-5 pb-3">
            <p className="text-lg">Thêm ảnh chứng minh:</p>
            <div className="px-5 flex justify-center py-3">
              <p className="flex justify-center"><CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" onChange={(transfer_image)=>setImgTransfer(transfer_image)} value={imgTransfer}/></p>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          title="Bạn chưa đăng nhập?"
          className="flex justify-center"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          okButtonProps={{ className: "bg-blue-500" }}
        >
          <p className="p-5">Vui lòng đăng nhập để được thanh toán</p>
        </Modal>
      )}
    </div>
  );
}
