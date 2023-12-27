import User from "../../route/user.route";
import Footer from "../footer";
import Header from "../header";
import { StyleProvider } from '@ant-design/cssinjs'

export default function DefaultLayoutUser() {
  return (
    <StyleProvider hashPriority="high">
      <Header />
        <User />
      <Footer />
   </StyleProvider>
  );
}