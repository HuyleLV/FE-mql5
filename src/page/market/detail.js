import { Link, Navigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { List, message, Button, Rate, Modal, Upload } from "antd";
import { Products } from "../../database";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useDevice } from "../../hooks";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { InboxOutlined } from "@ant-design/icons";
import CustomUpload from "../../component/customUpload";

export default function MarketDetail() {
  const [product, setProduct] = useState();
  const [comment, setComment] = useState();
  const [cookies] = useCookies(["user"]);
  const params = useParams();
  const { isMobile } = useDevice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [rateComment, setRateComment] = useState(5);
  const [comment_content, setcomment_content] = useState("");
  const [imgTransfer, setImgTransfer] = useState("");

  console.log(imgTransfer);

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
      })
      .catch(() => message.error("Error server!"));
  };

  const fetchcomment = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/comment/getById/${params?.id}`)
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
                    <Rate className="" allowHalf defaultValue={4.5} />
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
    if (params?.id) {
      fetchproduct();
      fetchcomment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  const productLink = useMemo(() => {
    const productImage = product?.[0]?.product_image;
    const coverImage = productImage ? JSON.parse(productImage) : undefined;
    return coverImage;
  }, [product]);

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
            <button
              className="bg-[#42639c] py-2 w-[210px] mt-4 font-semibold text-white hover:bg-[#42637c]"
              onClick={() => setIsModalOpen(true)}
            >
              Buy: {product?.[0].product_price} USD
            </button>
            <a target="_blank" href={product?.[0].product_link} rel="noreferrer" >
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
              <Rate allowHalf value={5} />
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
                Bogdan Ion Puscasu
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
                <div className="max-w-full truncate">
                  {parse(String(product?.[0].product_description))}
                </div>
                <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(false)}>Hide</button>
              </div>
            :
              <div className="p-5">
                <div className="h-40 max-w-full truncate">
                  {parse(String(product?.[0].product_description))}
                </div>
                <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(true)}>More</button>
              </div>
          }
          {productLink && (
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
          )}

          <div>
            <p className="font-semibold text-2xl p-5">Comment</p>
            {comment !== undefined ? (
              comment.map((i) => {
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
                );
              })
            ) : (
              <></>
            )}

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
      {cookies?.user ? (
        <Modal
          title="Thanh toán qua mã QR"
          className="grid justify-items-center"
          open={isModalOpen}
          onOk={handleOk}
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
          <p className="px-5 py-3 text-lg">
            Nội dung CK:{" "}
            <span className="font-bold p-5 text-xl">
              {cookies?.user?.displayName} chuyen tien
            </span>
          </p>
          <p className="px-5 pb-3 text-lg">
            Giá:{" "}
            <span className="font-bold p-5 text-xl text-red-500">
              {product?.[0].product_price} USD
            </span>
          </p>
          <div className="px-5">
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
