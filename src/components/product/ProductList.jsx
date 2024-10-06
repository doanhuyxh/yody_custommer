import styled from "styled-components";
import ProductItem from "./ProductItem";
import { PropTypes } from "prop-types";
import { breakpoints } from "../../styles/themes/default";

const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ProductList = ({ products }) => {
  console.log(products);
  return (
    <ProductListWrapper className="grid">
      {products?.length > 0 ? (
        products.map((product, index) =>
          product && product.Product ? (
            <ProductItem key={product.Product.id} product={product} />
          ) : (
            <p key={index}>Không có sản phẩm nào.</p>
          )
        )
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </ProductListWrapper>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array,
};
