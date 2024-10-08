import { PageWrapper } from "../../styles/styles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";

const BaseLayout = () => {
  return (
    <CartProvider>
      <PageWrapper>
        <Header />
        <div
          style={{
            minHeight: "calc(100vh - 545px)",
          }}
        >
          <Outlet />
        </div>
        <Footer />
      </PageWrapper>
    </CartProvider>
  );
};

export default BaseLayout;
