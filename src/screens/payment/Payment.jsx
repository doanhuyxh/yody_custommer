import styled from "styled-components";
import { BaseButtonGreen } from "../../styles/button";

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 40px;
  }

  .icon-success {
    font-size: 5rem;
    color: #28a745;
  }

  .icon-error {
    font-size: 5rem;
    color: #dc3545;
  }

  .success-message {
    color: #28a745;
    font-weight: bold;
  }

  .error-message {
    color: #dc3545;
    font-weight: bold;
  }
`;

const Payment = () => {
  const params = new URLSearchParams(window.location.search);
  const vnp_TransactionStatus = params.get("vnp_TransactionStatus");

  return (
    <PaymentWrapper>
      {vnp_TransactionStatus === "00" ? (
        <>
          <i className="bi bi-check-circle-fill icon-success"></i>
          <h1>Thanh toán thành công!</h1>
          <p className="success-message">
            Giao dịch của bạn đã được xử lý thành công. Cảm ơn bạn đã thanh
            toán.
          </p>
        </>
      ) : (
        <>
          <i className="bi bi-x-circle-fill icon-error"></i>
          <h1>Thanh toán thất bại</h1>
          <p className="error-message">
            Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
          </p>
        </>
      )}
      <BaseButtonGreen>
        <a href="/" className="text-white">
          Quay về trang chủ
        </a>
      </BaseButtonGreen>
    </PaymentWrapper>
  );
};

export default Payment;
