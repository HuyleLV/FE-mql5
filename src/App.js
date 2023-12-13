import Header from "./component/Header";
import Footer from "./component/Footer";
import User from "./route/user.route";
import AdminRouter from "./route/admin.route";


function App() {
  return (
    <div>
      <Header />
      <User />
      <AdminRouter />
      <Footer />
    </div>
  );
}

export default App;
