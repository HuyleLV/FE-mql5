import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { List } from "antd";
import { Products } from "../../database";

export default function MarketDetail() {
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

  const renderRecommentProduct = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          description={
            <>
              <Link to={`/market/detail/`}>
                <div className="text-center border">
                  <div className="flex justify-center  w-full">
                    <img alt="avata-product" src={'/image/ae.png'} />
                  </div>
                  <p className="p-1 font-semibold">{item?.name}</p>
                  <div className="flex items-center justify-center p-5">
                    {[1, 2, 3, 4, 5]?.map((i) => {
                      return (
                        <img
                          id={i}
                          alt="icon-star"
                          src={'/image/star.png'}
                          className="h-4 w-4 ml-1"
                        />
                      );
                    })}
                  </div>
                  <p className="border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                    ${item?.price} <span>USD</span>
                  </p>
                </div>
              </Link>
            </>
          }
        />
      </List.Item>
    );
  };

  return (
    <div className="max-w-screen-2xl items-center mx-auto pt-10">
      <p className="font-semibold p-5 text-xl">
        <span className="text-[#42639c]">Market</span> /{" "}
        <span className="text-[#42639c]">MetaTrader 5</span> / Quantum Emperor
        MT5
      </p>
      <div className="grid grid-cols-12">
        <div className="col-span-2 border">
          <div className="p-5">
            <img
              src={'/image/ae.png'}
              className="w-50 h-50 rounded-tl-3xl rounded-br-3xl"
              alt="name"
            />
            <p className="text-[#42639c] font-bold pt-4">1 599.99 USD</p>
            <button className="bg-[#42639c] py-2 w-[210px] mt-4 font-semibold text-white hover:bg-[#42637c]">
              Buy: 1 599.99 USD
            </button>
            <button className="border border-[#42639c] py-2 w-[210px] mt-4 font-semibold text-[#42639c]">
              Free Demo
            </button>
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
        <div className="col-span-10 border">
          <div className="flex items-center">
            <p className="font-semibold pt-5 pl-5 text-2xl">
              Quantum Emperor MT5
            </p>
            <div className="flex pt-2 pl-5">
              {[1, 2, 3, 4, 5]?.map((i) => {
                return (
                  <img
                    id={i}
                    alt="icon-star"
                    src={'/image/star.png'}
                    className="h-4 w-4 ml-1"
                  />
                );
              })}
            </div>
          </div>
          <div className="flex pl-5 pt-1">
            <p className="flex items-center">
              <img src={'/image/bank.png'}alt="icon" className="h-4 w-4" />
              <span className="pl-2 text-[#42639c] font-semibold">Experts</span>
            </p>
            <p className="flex items-center pl-5">
              <img src={'/image/bank.png'}alt="icon" className="h-4 w-4" />
              <span className="pl-2 text-[#42639c] font-semibold">
                Bogdan Ion Puscasu
              </span>
            </p>
            <p className="flex items-center pl-5">
              Version:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">3.5</span>
            </p>
            <p className="flex items-center pl-5">
              Updated:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">
                30 November 2023
              </span>
            </p>
            <p className="flex items-center pl-5">
              Activations:{" "}
              <span className="pl-2 text-[#42639c] font-semibold">30</span>
            </p>
          </div>
          <div className="p-5">
            <p>
              Introducing <span className="font-bold">Quantum Emperor EA</span>,
              the groundbreaking MQL5 expert advisor that's transforming the way
              you trade the prestigious GBPUSD pair! Developed by a team of
              experienced traders with trading experience of over 13 years.
            </p>
            <p className="pt-2">
              ***Buy <span className="font-bold">Quantum Emperor EA</span> and
              you could Quantum Trade EA or Quantum Gold Emperor for free !***
              Ask in private for more details
            </p>
            <p className="pt-2">
              <span className="font-bold">Quantum Emperor EA</span> utilizes a
              unique strategy where it continuously splits a single trade into
              seven smaller trades. This means that each time the EA executes a
              trade, it automatically divides it into seven smaller positions.
            </p>
            <p className="pt-2">
              <span className="font-bold">Quantum Emperor EA</span> stands out
              from other expert advisors due to its remarkable approach to
              handling losing trades. Unlike traditional methods that solely
              rely on Stop Loss orders to limit losses, Quantum Emperor EA
              employs a sophisticated technique to manage losing positions
              effectively.When faced with a losing seven trades batch, instead
              of closing them immediately, Quantum Emperor EA divides the next
              position into seven smaller ones. It then strategically uses the
              profits from winning trades to gradually close the losing
              positions, one by one, until all of them are successfully
              discarded.
            </p>
          </div>

          <Carousel responsive={responsive} className="p-5">
            <div>
              <iframe
                className="h-[250px] w-[400px]"
                src="https://www.youtube.com/embed/80oGWcZXil4"
                title="Quantum Emperor"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div>
              <img src={'/image/ae.png'} alt="icon" className="h-[250px] max-w-xl" />
            </div>
            <div>
              <img
                alt="icon"
                src="https://c.mql5.com/31/999/quantum-emperor-mt5-screen-8666-preview.jpg"
                className="h-[250px] max-w-xl"
              />
            </div>
            <div>
              <img
                alt="icon"
                src="https://c.mql5.com/31/999/quantum-emperor-mt5-screen-8666-preview.jpg"
                className="h-[250px] max-w-xl"
              />
            </div>
          </Carousel>

          <div>
            <p className="font-semibold text-2xl p-5">Comment</p>
            <div className="grid grid-cols-12 border">
              <div className="col-span-2 p-4">
                <p className="flex justify-center">
                  <img
                    src={'/image/ae.png'}
                    alt="img"
                    className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                  />
                </p>
                <p className="text-center pt-1 text-[11px]">141</p>
              </div>
              <div className="col-span-10">
                <div className="flex py-5">
                  <p className="font-bold text-[#42639c]">Andy Chang</p>
                  <p className="text-[10px] pl-2 pt-1">2023.12.12 06:36</p>
                  <div className="flex pt-1 pl-4">
                    {[1, 2, 3, 4, 5]?.map((i) => {
                      return (
                        <img
                          id={i}
                          alt="icon-star"
                          src={'/image/star.png'}
                          className="h-4 w-4 ml-1"
                        />
                      );
                    })}
                  </div>
                </div>
                <p>
                  I've been using the QE on my live account for two weeks. It's
                  easy to set up and performs well. Bogdan is very responsive.
                  Thanks, Bogdan!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 border">
              <div className="col-span-2 p-4">
                <p className="flex justify-center">
                  <img
                    alt="img"
                    src={'/image/ae.png'}
                    className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                  />
                </p>
                <p className="text-center pt-1 text-[11px]">141</p>
              </div>
              <div className="col-span-10">
                <div className="flex py-5">
                  <p className="font-bold text-[#42639c]">Andy Chang</p>
                  <p className="text-[10px] pl-2 pt-1">2023.12.12 06:36</p>
                  <div className="flex pt-1 pl-4">
                    {[1, 2, 3, 4, 5]?.map((i) => {
                      return (
                        <img
                          id={i}
                          alt="icon-star"
                          src={'/image/star.png'}
                          className="h-4 w-4 ml-1"
                        />
                      );
                    })}
                  </div>
                </div>
                <p>
                  I've been using the QE on my live account for two weeks. It's
                  easy to set up and performs well. Bogdan is very responsive.
                  Thanks, Bogdan!
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-2xl p-5">Recommended products</p>
            <List
              className="ml-[20px]"
              grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
              itemLayout="horizontal"
              dataSource={Products}
              renderItem={renderRecommentProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
