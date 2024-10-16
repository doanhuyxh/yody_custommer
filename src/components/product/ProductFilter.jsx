/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  FilterTitle,
  FilterWrap,
  PriceFilter,
  ProductCategoryFilter,
} from "../../styles/filter";
import { getCategories, filterProduct } from "../../services/apiService";

const ProductFilter = ({ setProductsFiltered }) => {
  const params = new URLSearchParams(window.location.search);
  const slugProduct = params.get("search");

  const [isProductFilterOpen, setProductFilterOpen] = useState(true);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleFilter = (filter) => {
    switch (filter) {
      case "product":
        setProductFilterOpen(!isProductFilterOpen);
        break;
      case "price":
        setPriceFilterOpen(!isPriceFilterOpen);
        break;
      default:
        break;
    }
  };

  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(1000000);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    let inputValue = parseInt(e.target.value);

    // Ensure inputValue is a valid number (handle non-numeric inputs)
    if (isNaN(inputValue)) return;

    if (inputName === "min") {
      // Ensure min value is not less than 0
      if (inputValue < 0) inputValue = 0;
      // Ensure min doesn't exceed max
      if (inputValue > maxRange) inputValue = maxRange;
      setMinRange(inputValue);
    } else if (inputName === "max") {
      // Ensure max value is not less than min
      if (inputValue < minRange) inputValue = minRange;
      setMaxRange(inputValue);
    }
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const page = 1;
        const pageSize = 12;

        const data = await filterProduct(
          page,
          pageSize,
          selectedCategory,
          slugProduct,
          minRange,
          maxRange
        );

        setProductsFiltered(data.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [slugProduct, selectedCategory, minRange, maxRange, setProductsFiltered]);

  return (
    <>
      <ProductCategoryFilter>
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("product")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc
          </p>
          <span
            className={`text-gray text-xxl filter-title-icon ${
              !isProductFilterOpen ? "rotate" : ""
            }`}
          >
            <i className="bi bi-filter"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isProductFilterOpen ? "hide" : "show"}`}>
          {categories?.map((category) => (
            <div key={category.Id} className="product-filter-item">
              <button
                type="button"
                className={`filter-item-head w-full flex items-center justify-between ${
                  selectedCategory === category.Id ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(category.Id)}
              >
                <span className="filter-head-title">{category.Name}</span>
              </button>
            </div>
          ))}
        </FilterWrap>
      </ProductCategoryFilter>

      <PriceFilter>
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("price")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Giá
          </p>
          <span
            className={`text-gray text-xl filter-title-icon ${
              !isPriceFilterOpen ? "rotate" : ""
            }`}
          >
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap
          className={`range filter-wrap ${
            !isPriceFilterOpen ? "hide" : "show"
          }`}
        >
          <p>
            Chọn khoảng giá {"("}thấp nhất - cao nhất{")"}
          </p>
          <div className="range-price w-full flex items-center">
            <input
              type="number"
              className="text-center"
              name="min"
              value={minRange}
              onChange={handleInputChange}
            />
            <input
              type="number"
              className="text-center"
              name="max"
              value={maxRange}
              onChange={handleInputChange}
            />
          </div>
        </FilterWrap>
      </PriceFilter>
    </>
  );
};

export default ProductFilter;
