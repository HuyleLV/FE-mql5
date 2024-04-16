import User from "../../route/user.route";
import Footer from "../footer";
import Header from "../header";
import { StyleProvider } from '@ant-design/cssinjs'
import telegram from "../../component/image/telegram.png"
import zalo from "../../component/image/phone.png"

export default function DefaultLayoutUser() {
  return (
    <StyleProvider hashPriority="high">
      <Header />
        <User />
        <div className="fixed bottom-20 right-5 border rounded-full p-3 bg-blue-500 border-blue-500 flex items-center shadow-xl shadow-blue-500/50 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <a target="_blank" href="https://t.me/Net_lnvest">
            <img src={telegram} width={20} height={20}/>
          </a>
        </div>
        <div className="fixed bottom-5 right-5 border rounded-full p-3 bg-red-500 border-red-500 flex items-center shadow-xl shadow-red-500/50 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <a target="_blank" href="https://zalo.me/0356496403">
            <img src={zalo} width={20} height={20}/>
          </a>
        </div>
      <Footer />
   </StyleProvider>
  );
}