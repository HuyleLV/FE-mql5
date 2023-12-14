import Header from "./component/header";
import Footer from "./component/footer";
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
