import styled from "styled-components";
import { HeaderMainWrapper, SiteBrandWrapper } from "../../styles/header";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { Link, useLocation } from "react-router-dom";
import { Input, InputGroupWrapper } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { BaseLinkGreen, BaseLinkOutlineDark } from "../../styles/button";
import { useSelector } from "react-redux";
import { searchProduct } from "../../services/apiService";

const NavigationAndSearchWrapper = styled.div`
  column-gap: 20px;
  .search-form {
    @media (max-width: ${breakpoints.lg}) {
      width: 100%;
      max-width: 500px;
    }
    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  }

  .input-group {
    min-width: 320px;

    .input-control {
      @media (max-width: ${breakpoints.sm}) {
        display: none;
      }
    }

    @media (max-width: ${breakpoints.xl}) {
      min-width: 160px;
    }

    @media (max-width: ${breakpoints.sm}) {
      min-width: auto;
      grid-template-columns: 100%;
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const NavigationMenuWrapper = styled.nav`
  .nav-menu-list {
    margin-left: 20px;

    @media (max-width: ${breakpoints.lg}) {
      flex-direction: column;
    }
  }

  .nav-menu-item {
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: ${breakpoints.xl}) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  .nav-menu-link {
    &.active {
      color: ${defaultTheme.color_outerspace};
      font-weight: 700;
    }

    &:hover {
      color: ${defaultTheme.color_outerspace};
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    position: absolute;
    top: 0;
    right: 0;
    width: 260px;
    background: ${defaultTheme.color_white};
    height: 100%;
    z-index: 999;
    display: none;
  }
`;

const IconLinksWrapper = styled.div`
  column-gap: 18px;
  .icon-link {
    width: 36px;
    height: 36px;
    border-radius: 6px;

    &.active {
      background-color: ${defaultTheme.color_sea_green};
      img {
        filter: brightness(100);
      }
    }

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 8px;
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 6px;
  }
`;

const ButtonGroupWrapper = styled.div`
  gap: 8px;
  @media (max-width: ${breakpoints.sm}) {
    button,
    a {
      min-width: 100px;
    }
  }
`;

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();

  return (
    <HeaderMainWrapper className="header flex items-center">
      <Container className="container">
        <div className="header-wrap flex items-center justify-between">
          <div className="flex items-center">
            <SiteBrandWrapper to="/" className="inline-flex">
              <div className="brand-img-wrap flex items-center justify-center">
                <img
                  className="site-brand-img"
                  src={staticImages.logo}
                  alt="site logo"
                />
              </div>
            </SiteBrandWrapper>
          </div>
          <NavigationAndSearchWrapper className="flex items-center">
            <NavigationMenuWrapper>
              <ul className="nav-menu-list flex items-center">
                <li className="nav-menu-item">
                  <Link
                    to={"/"}
                    className="nav-menu-link text-base font-medium text-gray"
                  >
                    Trang chủ
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link
                    to={"/product"}
                    className="nav-menu-link text-base font-medium text-gray"
                  >
                    Sản phẩm
                  </Link>
                </li>
              </ul>
            </NavigationMenuWrapper>
            <form className="search-form">
              <InputGroupWrapper className="input-group">
                <span className="input-icon flex items-center justify-center text-xl text-gray">
                  <i className="bi bi-search"></i>
                </span>
                <Input
                  type="text"
                  className="input-control w-full"
                  placeholder="Tìm kiếm"
                />
              </InputGroupWrapper>
            </form>
          </NavigationAndSearchWrapper>

          <IconLinksWrapper className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/wishlist"
                  className={`icon-link ${
                    location.pathname === "/wishlist" ? "active" : ""
                  } inline-flex items-center justify-center`}
                >
                  <img src={staticImages.heart} alt="" />
                </Link>

                <Link
                  to="/account"
                  className={`icon-link ${
                    location.pathname === "/account" ||
                    location.pathname === "/account/add"
                      ? "active"
                      : ""
                  } inline-flex items-center justify-center`}
                >
                  <img src={staticImages.user} alt="" />
                </Link>

                <Link
                  to="/cart"
                  className={`icon-link ${
                    location.pathname === "/cart" ? "active" : ""
                  } inline-flex items-center justify-center`}
                >
                  <img src={staticImages.cart} alt="" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <ButtonGroupWrapper className="flex items-center">
                    <BaseLinkGreen to="/sign_in">Đăng nhập</BaseLinkGreen>
                    <BaseLinkOutlineDark to="/sign_up">
                      Đăng ký
                    </BaseLinkOutlineDark>
                  </ButtonGroupWrapper>
                </div>
              </>
            )}
          </IconLinksWrapper>
        </div>
      </Container>
    </HeaderMainWrapper>
  );
};

export default Header;
