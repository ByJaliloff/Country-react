import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function RootLayout(props) {
  return (
    <>
      <Header {...props} />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
