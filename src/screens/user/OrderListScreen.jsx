import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import OrderItemList from "../../components/user/OrderItemList";
import { getOrders } from "../../services/apiService";

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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách đơn hàng
    const fetchOrders = async () => {
      try {
        const data = await getOrders(1, 10); // page 1, pageSize 10
        if (data?.code === 20001) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const activeOrders = orders.filter((order) => order.status === "pending");
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );

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
                {loading ? (
                  <p>Đang tải...</p>
                ) : (
                  <>
                    <div
                      className={`order-tabs-content ${
                        activeTab === "active" ? "" : "hidden"
                      }`}
                      id="active"
                    >
                      {activeOrders.length > 0 ? (
                        <OrderItemList orders={activeOrders} />
                      ) : (
                        <p>Không có đơn hàng đang xử lý.</p>
                      )}
                    </div>

                    <div
                      className={`order-tabs-content ${
                        activeTab === "cancelled" ? "" : "hidden"
                      }`}
                      id="cancelled"
                    >
                      {cancelledOrders.length > 0 ? (
                        <OrderItemList orders={cancelledOrders} />
                      ) : (
                        <p>Không có đơn hàng đã hủy.</p>
                      )}
                    </div>

                    <div
                      className={`order-tabs-content ${
                        activeTab === "completed" ? "" : "hidden"
                      }`}
                      id="completed"
                    >
                      {completedOrders.length > 0 ? (
                        <OrderItemList orders={completedOrders} />
                      ) : (
                        <p>Không có đơn hàng đã hoàn thành.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderListScreen;
