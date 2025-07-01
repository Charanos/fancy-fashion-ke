import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import React, { useContext, useState, useEffect } from "react";

const Collections = () => {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(350);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { products, searchQuery, showSearch } = useContext(ShopContext);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // Initialize filteredProducts with all products when component mounts
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Calculate counts from actual product data
  const getCategoryCount = (category) =>
    products.filter((product) => product.category === category).length;

  const getSubCategoryCount = (subCategory) =>
    products.filter((product) => product.subCategory === subCategory).length;

  // Categories based on actual product data
  const categories = [
    { name: "For Him", value: "Men", count: getCategoryCount("Men") },
    { name: "For Her", value: "Women", count: getCategoryCount("Women") },
    { name: "For Little Ones", value: "Kids", count: getCategoryCount("Kids") },
  ];

  // Get unique subcategories from products
  const getUniqueSubCategories = () => {
    const subCats = [
      ...new Set(products.map((product) => product.subCategory)),
    ];
    return subCats.map((subCat) => ({
      name: subCat,
      value: subCat,
      count: getSubCategoryCount(subCat),
    }));
  };

  const subcategories = getUniqueSubCategories();

  // Toggle filter visibility on mobile
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategory)) {
        return prev.filter((s) => s !== subCategory);
      } else {
        return [...prev, subCategory];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle bestseller filter
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
  const handleBestsellerChange = () => {
    setShowBestsellersOnly(!showBestsellersOnly);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter products based on selection and search query
  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subCategory.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by subcategories
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price <= priceRange);

    // Filter by size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Filter by bestseller
    if (showBestsellersOnly) {
      filtered = filtered.filter((product) => product.bestseller);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when search query changes
  }, [
    selectedCategories,
    selectedSubCategories,
    priceRange,
    selectedSizes,
    showBestsellersOnly,
    products,
    searchQuery,
  ]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear all filters
  const clearFilters = () => {
    setCurrentPage(1);
    setPriceRange(350);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setShowBestsellersOnly(false);
  };

  return (
    <div className="sm:my-1 sm:py-0 py-10 border-t border-gray-300 sm:pt-1 pt-4">
      <div className="text-center flex flex-col items-center py-8">
        <p className="m-auto w-3/4 my-6 text-md md:text-base lg:text-lg text-gray-600">
          Explore our curated collection of premium clothing for every style and
          occasion.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 ">
        {/* Mobile filter toggle */}
        <div className="sm:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button
            onClick={toggleFilter}
            className="bg-gray-100 rounded-xl px-4 py-2 text-gray-700 shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] transition-all duration-300"
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Product count indicator for mobile */}
        <div className="sm:hidden text-sm text-gray-500 mb-4">
          Showing:{" "}
          <span className="font-medium text-gray-700">
            {currentProducts.length} of {filteredProducts.length} items
          </span>
        </div>

        {/* Filter sidebar */}
        <div className="min-w-60">
          <h2 className="my-2 text-xl capitalize font-semibold text-gray-800 hidden sm:block">
            Refine Your Style
          </h2>

          {/* Category filter */}
          <div
            className={`bg-white rounded-xl p-6 mt-6 ${
              showFilter ? "" : "hidden"
            } transition-all duration-300 sm:block shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]`}
          >
            <h3 className="text-md font-semibold prata-regular mb-5">
              Shop By
            </h3>

            <div className="flex flex-col gap-3 text-sm font-medium text-gray-900">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    value={category.value}
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => handleCategoryChange(category.value)}
                    className="w-4 h-4 accent-teal-500 cursor-pointer"
                  />
                  <span>{category.name}</span>
                  <span className="ml-auto text-gray-500 text-xs">
                    ({category.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub categories */}
          <div
            className={`bg-white rounded-xl p-6 mt-6 ${
              showFilter ? "" : "hidden"
            } transition-all duration-300 sm:block shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]`}
          >
            <h3 className="text-md font-semibold prata-regular mb-5">
              Collection
            </h3>

            <div className="flex flex-col gap-3 text-sm font-medium text-gray-900">
              {subcategories.map((subcategory) => (
                <label
                  key={subcategory.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors duration-200"
                >
                  <input
                    value={subcategory.value}
                    type="checkbox"
                    checked={selectedSubCategories.includes(subcategory.value)}
                    onChange={() => handleSubCategoryChange(subcategory.value)}
                    className="w-4 h-4 accent-teal-500 cursor-pointer"
                  />
                  <span>{subcategory.name}</span>
                  <span className="ml-auto text-gray-500 text-xs">
                    ({subcategory.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Size filter */}
          <div
            className={`bg-white rounded-xl p-6 mt-6 ${
              showFilter ? "" : "hidden"
            } transition-all duration-300 sm:block shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]`}
          >
            <h3 className="text-md font-semibold prata-regular mb-5">Size</h3>

            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 
                    ${
                      selectedSizes.includes(size)
                        ? "bg-teal-500 text-white shadow-[inset_2px_2px_4px_#38b2ac,_inset_-2px_-2px_4px_#4fd1c5]"
                        : "bg-white text-gray-700 shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] hover:shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff]"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price range filter */}
          <div
            className={`bg-white rounded-xl p-6 mt-6 ${
              showFilter ? "" : "hidden"
            } transition-all duration-300 sm:block shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]`}
          >
            <h3 className="text-md font-semibold prata-regular mb-5">
              Price Range
            </h3>

            <div className="px-2">
              <input
                type="range"
                min="0"
                max="350"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />

              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>KSH 0</span>
                <span>KSH {priceRange}</span>
              </div>
            </div>
          </div>

          {/* Bestseller filter */}
          <div
            className={`bg-white rounded-xl p-6 mt-6 ${
              showFilter ? "" : "hidden"
            } transition-all duration-300 sm:block shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]`}
          >
            <h3 className="text-md font-semibold prata-regular mb-5">
              Special
            </h3>

            <label className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors duration-200">
              <input
                type="checkbox"
                checked={showBestsellersOnly}
                onChange={handleBestsellerChange}
                className="w-4 h-4 accent-teal-500 cursor-pointer"
              />
              <span>Bestsellers Only</span>
              <span className="ml-auto text-gray-500 text-xs">
                ({products.filter((p) => p.bestseller).length})
              </span>
            </label>
          </div>

          {/* Clear filters button */}
          <button
            onClick={clearFilters}
            className="w-full mt-6 bg-black text-gray-200 font-medium py-3 rounded-xl shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
          >
            Clear All Filters
          </button>
        </div>

        {/* Products grid */}
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="hidden sm:flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <div className="text-sm text-gray-500">
              Showing:{" "}
              <span className="font-medium text-gray-700">
                {currentProducts.length} of {filteredProducts.length} items
              </span>
            </div>
          </div>

          {/* Search results message when search is active */}
          {searchQuery && (
            <div className="bg-white rounded-lg p-3 my-6 shadow-inset border border-gray-100">
              <p className="text-sm">
                {filteredProducts.length > 0 ? (
                  <span>
                    Found{" "}
                    <span className="font-semibold">
                      {filteredProducts.length}
                    </span>{" "}
                    results for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </span>
                ) : (
                  <span>
                    No results found for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Product grid with new layout structure */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 gap-y-12">
                {currentProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    bestseller={item.bestseller}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-auto pt-20">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        currentPage > 1 && paginate(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-black text-gray-200 hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          currentPage === i + 1
                            ? "bg-teal-500 text-white shadow-[inset_2px_2px_4px_#38b2ac,_inset_-2px_-2px_4px_#4fd1c5]"
                            : "bg-white text-gray-700 shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        currentPage < totalPages && paginate(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-black text-gray-200 hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-6 text-gray-500 bg-white rounded-xl p-6 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]">
              No products match your filters. Try adjusting your selection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
