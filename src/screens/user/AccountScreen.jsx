import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProfile, getUserInfo } from "../../services/apiService";
import { toast } from "react-toastify";

const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Trang chủ",
    link: "/",
  },
  { label: "Tài khoản", link: "/account" },
];

const AccountScreen = () => {
  const customer = useSelector((state) => state.user.customer);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("Password");
  const [address, setAddress] = useState("");

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo(customer.id);
      setName(data.data.full_name);
      setEmail(data.data.email);
      setPhoneNumber(data.data.phone_number);
      setAddress(data.data.address);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSave = async (field, value, setEditing) => {
    try {
      await updateProfile({ id: customer.id, field, value });
      toast.success("Cập nhật thành công!");
      setEditing(false); // Exit edit mode after successful update
    } catch (error) {
      toast.error("Cập nhật thất bại, vui lòng thử lại.");
    }
  };

  return (
    <AccountScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <h4 className="title-sm">Chi tiết liên lạc</h4>
            <form>
              <div className="form-wrapper">
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Họ và tên:
                  </label>
                  <div
                    style={{ gap: 10 }}
                    className="form-input-wrapper flex items-center"
                  >
                    <Input
                      type="text"
                      style={{
                        padding: isEditingName ? "10px" : "0",
                        border: isEditingName ? "1px solid #2d2d2d" : "none",
                      }}
                      className="form-elem-control text-outerspace font-semibold"
                      value={name}
                      readOnly={!isEditingName}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-control-change-btn"
                      onClick={() => {
                        if (isEditingName) {
                          handleSave("full_name", name, setIsEditingName);
                        } else {
                          setIsEditingName(true);
                        }
                      }}
                    >
                      {isEditingName ? "Lưu" : "Thay đổi"}
                    </button>
                  </div>
                </FormElement>

                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Email:
                  </label>
                  <div
                    style={{ gap: 10 }}
                    className="form-input-wrapper flex items-center"
                  >
                    <Input
                      type="email"
                      style={{
                        padding: isEditingEmail ? "10px" : "0",
                        border: isEditingEmail ? "1px solid #2d2d2d" : "none",
                      }}
                      className="form-elem-control text-outerspace font-semibold"
                      value={email}
                      readOnly={!isEditingEmail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-control-change-btn"
                      onClick={() => {
                        if (isEditingEmail) {
                          handleSave("email", email, setIsEditingEmail);
                        } else {
                          setIsEditingEmail(true);
                        }
                      }}
                    >
                      {isEditingEmail ? "Lưu" : "Thay đổi"}
                    </button>
                  </div>
                </FormElement>

                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Số điện thoại
                  </label>
                  <div
                    style={{ gap: 10 }}
                    className="form-input-wrapper flex items-center"
                  >
                    <Input
                      type="text"
                      style={{
                        padding: isEditingPhone ? "10px" : "0",
                        border: isEditingPhone ? "1px solid #2d2d2d" : "none",
                      }}
                      className="form-elem-control text-outerspace font-semibold"
                      value={phoneNumber}
                      readOnly={!isEditingPhone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-control-change-btn"
                      onClick={() => {
                        if (isEditingPhone) {
                          handleSave(
                            "phone_number",
                            phoneNumber,
                            setIsEditingPhone
                          );
                        } else {
                          setIsEditingPhone(true);
                        }
                      }}
                    >
                      {isEditingPhone ? "Lưu" : "Thay đổi"}
                    </button>
                  </div>
                </FormElement>

                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Mật khẩu
                  </label>
                  <div
                    style={{ gap: 10 }}
                    className="form-input-wrapper flex items-center"
                  >
                    <Input
                      type="password"
                      style={{
                        padding: isEditingPassword ? "10px" : "0",
                        border: isEditingPassword
                          ? "1px solid #2d2d2d"
                          : "none",
                      }}
                      className="form-elem-control text-outerspace font-semibold"
                      value={password}
                      readOnly={!isEditingPassword}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-control-change-btn"
                      onClick={() => {
                        if (isEditingPassword) {
                          handleSave(
                            "password",
                            password,
                            setIsEditingPassword
                          );
                        } else {
                          setIsEditingPassword(true);
                        }
                      }}
                    >
                      {isEditingPassword ? "Lưu" : "Thay đổi"}
                    </button>
                  </div>
                </FormElement>

                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Địa chỉ
                  </label>
                  <div
                    style={{ gap: 10 }}
                    className="form-input-wrapper flex items-center"
                  >
                    <Input
                      type="text"
                      style={{
                        padding: isEditingAddress ? "10px" : "0",
                        border: isEditingAddress ? "1px solid #2d2d2d" : "none",
                      }}
                      className="form-elem-control text-outerspace font-semibold"
                      value={address}
                      readOnly={!isEditingAddress}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-control-change-btn"
                      onClick={() => {
                        if (isEditingAddress) {
                          handleSave("address", address, setIsEditingAddress);
                        } else {
                          setIsEditingAddress(true);
                        }
                      }}
                    >
                      {isEditingAddress ? "Lưu" : "Thay đổi"}
                    </button>
                  </div>
                </FormElement>
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
