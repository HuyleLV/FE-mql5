import User from "../../route/user.route";
import Footer from "../footer";
import Header from "../header";

export default function DefaultLayoutUser() {
  return (
    <div>
      <Header />
        <User />
      <Footer />
    </div>
  );
}