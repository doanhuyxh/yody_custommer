import styled from "styled-components";
import { Input } from "../../styles/form";
import { BaseButtonGreen } from "../../styles/button";
import CheckoutSummary from "./CheckoutSummary";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import {
  updateProfile,
  getUserInfo,
  getShoppingCart,
  vnpayPayment,
} from "../../services/apiService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrder } from "../../redux/slices/orderSlice";

const BillingOrderWrapper = styled.div`
  gap: 60px;
  grid-template-columns: 2fr 1fr;

  @media (max-width: ${breakpoints.xl}) {
    gap: 40px;
  }
  @media (max-width: ${breakpoints.lg}) {
    gap: 30px;
    grid-template-columns: 100%;
  }
`;

const BillingDetailsWrapper = styled.div`
  @media (max-width: ${breakpoints.lg}) {
    order: 2;
  }
    

  .checkout-form {
    margin-top: 24px;

    .input-elem {
      margin-bottom: 16px;

      @media (max-width: ${breakpoints.xs}) {
        margin-bottom: 10px;
      }

      label {
        margin-bottom: 8px;
        display: block;
      }

      input,
      select {
        height: 40px;
        border-radius: 4px;
        background: ${defaultTheme.color_whitesmoke};
        padding-left: 12px;
        padding-right: 12px;
        width: 100%;
        border: 1px solid ${defaultTheme.color_platinum};
        font-size: 12px;

        &::placeholder {
          font-size: 12px;
        }
      }
    }

    .input-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 24px;

      @media (max-width: ${breakpoints.lg}) {
        column-gap: 12px;
      }
        @media (max-width: ${breakpoints.sm}) {
        column-gap: 12px;
        grid-template-columns: 100%;
      }
    }
  }
`;

const Billing = () => {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.user.customer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [province, setProvince] = useState(""); // Tỉnh
  const [district, setDistrict] = useState(""); // Huyện
  const [ward, setWard] = useState(""); // Xã

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (province) {
      const selectedProvince = provinces.find(
        (p) => p.province_name === province
      );
      if (selectedProvince) {
        fetchDistricts(selectedProvince.province_id);
      }
    }
  }, [province,provinces]);

  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find(
        (d) => d.district_name === district
      );
      if (selectedDistrict) {
        fetchWards(selectedDistrict.district_id);
      }
    }
  }, [district,districts]);

  const fetchProvinces = async () => {
    const response = await fetch(`https://vapi.vnappmob.com/api/province/`);
    const data = await response.json();
    setProvinces(data.results);
  };

  const fetchDistricts = async (provinceId) => {
    const response = await fetch(
      `https://vapi.vnappmob.com/api/province/district/${provinceId}`
    );
    const data = await response.json();
    setDistricts(data.results);
  };

  const fetchWards = async (districtId) => {
    const response = await fetch(
      `https://vapi.vnappmob.com/api/province/ward/${districtId}`
    );
    const data = await response.json();
    setWards(data.results);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const savedShippingInfo = JSON.parse(
          localStorage.getItem("shippingInfo")
        );

        const data = await getUserInfo(customer.id);
          const { full_name, email, phone_number, address } = data.data;
          setName(full_name);
          setEmail(email);
          setPhoneNumber(phone_number);

        if (savedShippingInfo) {
          // setName(savedShippingInfo.name || "");
          // setEmail(savedShippingInfo.email || "");
          // setPhoneNumber(savedShippingInfo.phoneNumber || "");
          setAddress(savedShippingInfo.address || "");
          setProvince(savedShippingInfo.province || "");
          setDistrict(savedShippingInfo.district || "");
          setWard(savedShippingInfo.ward || "");
        } 
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    const fetchCart = async () => {
      try {
        const data = await getShoppingCart();
        setCart(data.data);
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
      }
    };
    fetchCart();
    fetchUserInfo();
  }, [customer.id]);

  useEffect(() => {
    const fetchProductPrices = async () => {
      // Tính toán subtotal
      const total = cart.reduce((acc, product) => {
        const price = product.price; // Lấy giá của sản phẩm
        const quantity = product.quantity; // Lấy số lượng từ cart

        // Kiểm tra số lượng để tránh tính toán sai
        if (quantity > 0) {
          return acc + price * quantity; // Cộng vào tổng
        }
        return acc; // Nếu số lượng là 0, không cộng vào tổng
      }, 0);

      setSubtotal(total); // Cập nhật subtotal
    };

    if (cart?.length > 0) {
      fetchProductPrices(); // Chỉ gọi hàm nếu cart không rỗng
    }
  }, [cart]);
  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/; // Định dạng số ĐT Việt Nam
    return phoneRegex.test(phone);
  };
  

  const handleInputChange = (field, value) => {
    const updatedShippingInfo = {
      ...JSON.parse(localStorage.getItem("shippingInfo")),
      [field]: value,
    };

    localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));

    switch (field) {
      
      case "address":
        setAddress(value);
        break;
      case "province":
        setProvince(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "ward":
        setWard(value);
        break;
      default:
        break;
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  
    if (
      
      !shippingInfo.address ||
      !shippingInfo.province ||
      !shippingInfo.district ||
      !shippingInfo.ward
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
  
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
  
      // await updateProfile({
      //   id: customer.id,
      //   field: "full_name", 
      //   value: shippingInfo.name,
      // });
  
      // await updateProfile({
      //   id: customer.id,
      //   field: "phone_number", 
      //   value: shippingInfo.phoneNumber,
      // });
  
  
      const fullAddress = `${shippingInfo.address}, ${shippingInfo.ward}, ${shippingInfo.district}, ${shippingInfo.province}`;
  
      const items = cart.map((item) => ({
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
        price: item.price,
      }));
  
      dispatch(
        addOrder({
          items,
          shipping_address: fullAddress,
          total_amount: subtotal,
        })
      );
  
      const data = await vnpayPayment(subtotal);
      window.location.href = data.data;
   
  };
  
  return (
    <BillingOrderWrapper className="billing-and-order grid items-start">
      <BillingDetailsWrapper>
        <h4 className="text-xxl font-bold text-outerspace">
          Chi tiết thanh toán
        </h4>
        <form className="checkout-form">
          <div className="input-row elem-col-2">
            <div className="input-elem">
              <label>Họ và tên*</label>
              <Input
                type="text"
                placeholder="Họ và tên"
                value={name}
                disabled={true}

              />
            </div>
            <div className="input-elem elem-col-2">
              <label>Số điện thoại*</label>
              <Input
                type="text"
                placeholder="Số điện thoại"
                value={phoneNumber}
               disabled={true}
              />
            </div>
          </div>

          <div className="input-row elem-col-2">
            <div className="input-elem">
              <label>Tỉnh*</label>
              <select
                value={province}
                onChange={(e) => handleInputChange("province", e.target.value)}
              >
                <option value="">Chọn </option>
                {provinces.map((prov) => (
                  <option key={prov.province_id} value={prov.province_name}>
                    {prov.province_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-elem elem-col-2">
              <label>Huyện*</label>
              <select
                value={district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                disabled={!province}
              >
                <option value="">Chọn huyện</option>
                {districts.map((dist) => (
                  <option key={dist.district_id} value={dist.district_name}>
                    {dist.district_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-row elem-col-2">
            <div className="input-elem">
              <label>Xã*</label>
              <select
                value={ward}
                onChange={(e) => handleInputChange("ward", e.target.value)}
                disabled={!district}
              >
                <option value="">Chọn xã</option>
                {wards.map((w) => (
                  <option key={w.ward_id} value={w.ward_name}>
                    {w.ward_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-elem elem-col-2">
              <label>Địa chỉ*</label>
              <Input
                type="text"
                placeholder="Địa chỉ chi tiết"
                value={address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>

          <BaseButtonGreen onClick={handleCheckout}>Đặt hàng</BaseButtonGreen>
        </form>
      </BillingDetailsWrapper>
      <CheckoutSummary cartItems={cart} subtotal={subtotal} />
    </BillingOrderWrapper>
  );
};
export default Billing;
