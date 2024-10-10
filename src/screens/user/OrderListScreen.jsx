import { useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { orderData } from "../../data/data";
import OrderItemList from "../../components/user/OrderItemList";

const OrderListScreenWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
  }

  .order-tabs-content.hidden {
    display: none;
  }

  .order-tabs-head {
    min-width: 170px;
    padding: 12px 0;
    border-bottom: 3px solid ${defaultTheme.color_whitesmoke};

    &.order-tabs-head-active {
      border-bottom-color: ${defaultTheme.color_outerspace};
    }

    @media (max-width: ${breakpoints.lg}) {
      min-width: 120px;
    }

    @media (max-width: ${breakpoints.xs}) {
      min-width: 80px;
    }
  }
`;

const breadcrumbItems = [
  { label: "Trang chủ", link: "/" },
  { label: "Đơn hàng", link: "/order" },
];

const OrderListScreen = () => {
  const [activeTab, setActiveTab] = useState("active");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <OrderListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Đơn hàng"} />
            <div className="order-tabs">
              <div className="order-tabs-heads">
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "active" ? "order-tabs-head-active" : ""
                  }`}
                  onClick={() => handleTabClick("active")}
                >
                  Đang xử lý
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "cancelled" ? "order-tabs-head-active" : ""
                  }`}
                  onClick={() => handleTabClick("cancelled")}
                >
                  Đã hủy
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "completed" ? "order-tabs-head-active" : ""
                  }`}
                  onClick={() => handleTabClick("completed")}
                >
                  Đã hoàn thành
                </button>
              </div>

              <div className="order-tabs-contents">
                <div
                  className={`order-tabs-content ${
                    activeTab === "active" ? "" : "hidden"
                  }`}
                  id="active"
                >
                  <OrderItemList orders={orderData} />
                </div>
                <div
                  className={`order-tabs-content ${
                    activeTab === "cancelled" ? "" : "hidden"
                  }`}
                  id="cancelled"
                >
                  Cancelled content
                </div>
                <div
                  className={`order-tabs-content ${
                    activeTab === "completed" ? "" : "hidden"
                  }`}
                  id="completed"
                >
                  Completed content
                </div>
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderListScreen;
