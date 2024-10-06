import axios from "axios";
import NProgress from "nprogress";
import { logout } from "../redux/slices/userSlice";
import { store } from "../redux/store";

// thư viện loading dạng bar khi call api
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// Tạo một instance axios với cấu hình baseURL
const instance = axios.create({
  baseURL: "https://api.yody.lokid.xyz/", // URL cơ sở cho mọi request
});

// Thêm một interceptor request để xử lý trước khi gửi mọi request
instance.interceptors.request.use(
  function (config) {
    // Lấy token truy cập từ trạng thái Redux
    const access_token = store?.getState()?.user?.accessToken;
    if (access_token) {
      // Nếu token tồn tại, thêm nó vào header của request
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    // Chạy tiến trình progressbar
    NProgress.start();

    // Trả về cấu hình đã được chỉnh sửa
    return config;
  },
  function (error) {
    // Xử lý lỗi trong trường hợp không tạo được request
    return Promise.reject(error);
  }
);

// Thêm một interceptor response để xử lý dữ liệu hoặc lỗi trả về từ server
instance.interceptors.response.use(
  function (response) {
    // Dừng NProgress sau khi nhận được response
    NProgress.done();

    if (response.data.code === 20005) {
      // Nếu token hết hạn (mã lỗi 20005), thực hiện hành động logout
      store.dispatch(logout());
      // Có thể điều hướng người dùng về trang login nếu cần
      window.location.href = "/sign_in";
    }
    // Trả về dữ liệu từ phản hồi, hoặc toàn bộ phản hồi nếu không có dữ liệu
    return response && response?.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    // Xử lý lỗi từ phản hồi và trả về lỗi hoặc reject nếu không có dữ liệu lỗi
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;