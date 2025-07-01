import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";

const Product = () => {
  const { productId } = useParams();
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { products, addToCart } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Get related products from same category or subcategory
  const relatedProducts = products
    .filter(
      (product) =>
        product._id !== productId &&
        (product.category === productData?.category ||
          product.subCategory === productData?.subCategory)
    )
    .slice(0, 4);

  return productData ? (
    <div className="sm:my-1 sm:py-0 py-10 border-t border-gray-300 sm:pt-10 pt-4 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex flex-col gap-12 sm:flex-row justify-center items-start max-w-6xl mx-auto px-4">
        {/* Product images */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col-reverse gap-6 sm:flex-row">
            {/* Thumbnail images */}
            <div className="flex sm:flex-col gap-3 overflow-x-visible sm:overflow-y-visible justify-between sm:justify-normal items-center sm:w-[18.7%] w-full sm:max-h-[500px]">
              {productData.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setImage(img)}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 rounded-xl cursor-pointer transition-all duration-300 ${
                    image === img
                      ? "shadow-[inset_2px_2px_4px_#d1d9e6,_inset_-2px_-2px_4px_#ffffff] border-2 border-teal-500"
                      : "shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]"
                  }`}
                >
                  <img
                    src={img}
                    alt="product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Main product image */}
            <div className="w-full sm:w-[80%]">
              <div className="rounded-2xl p-4 bg-white">
                <img
                  src={image}
                  alt="product"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Subtle product details */}
          <div className="bg-white rounded-2xl p-6 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]">
            <div className="sm:grid sm:grid-cols-2 grid-cols-1 sm:gap-4 text-sm text-gray-600 ">
              <div className="flex items-center gap-2">
                <span className="font-medium prata-regular text-teal-800 ">
                  Category:
                </span>
                <span className="capitalize font-semibold">
                  {productData.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium  prata-regular text-teal-800">
                  Collection:
                </span>
                <span className="capitalize font-semibold">
                  {productData.subCategory}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium  prata-regular text-teal-800">
                  Material:
                </span>
                <span className="font-semibold">100% Cotton</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium  prata-regular text-teal-800">
                  Care:
                </span>
                <span className="font-semibold">Machine wash cold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1 max-w-xl w-full">
          <div className="bg-white rounded-2xl p-8 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff] min-h-[636px] lg:max-h-[200px]">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 prata-regular">
              {productData.name}
            </h1>

            {productData.bestseller && (
              <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded mb-4">
                Bestseller
              </span>
            )}

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold text-teal-700">
                KSH {productData.price}
              </span>
              {productData.originalPrice && (
                <span className="text-lg text-teal-500 line-through">
                  KSH {productData.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8">{productData.description}</p>

            {/* Size selection */}
            {productData.sizes?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-md font-semibold mb-4">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center cursor-pointer hover:scale-105 hover:bg-gray-200 justify-center text-sm font-medium transition-all duration-300 
                        ${
                          selectedSize === size
                            ? "bg-teal-500 hover:bg-teal-500 text-white shadow-[inset_2px_2px_4px_#38b2ac,_inset_-2px_-2px_4px_#4fd1c5]"
                            : "bg-white text-gray-700 shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-8">
              <h3 className="text-md font-semibold mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-medium 
                    shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                    active:shadow-[inset_2px_2px_4px_#d1d9e6,_inset_-2px_-2px_4px_#ffffff] transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-medium 
                    shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                    active:shadow-[inset_2px_2px_4px_#d1d9e6,_inset_-2px_-2px_4px_#ffffff] transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(selectedSize, productData._id)}
                className="flex-1 bg-black text-gray-200 font-medium py-3 rounded-xl 
                shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] 
                active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff] transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-teal-800"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-white text-gray-800 font-medium py-3 rounded-xl 
                shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff] 
                active:shadow-[inset_2px_2px_4px_#d1d1d1,_inset_-2px_-2px_4px_#ffffff] transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-gray-200"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* description and reviews  */}
      <div className="my-20 border-t border-gray-300 pt-12 w-full">
        <div className="flex gap-4 text-lg sm:text-xl items-center">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 px-2 cursor-pointer prata-regular transition-all duration-300 ${
              activeTab === "description"
                ? "text-teal-600 underline underline-offset-8 decoration-teal-700 decoration-2"
                : "text-gray-600 hover:text-teal-800"
            }`}
          >
            Product Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 px-2 cursor-pointer prata-regular transition-all duration-300 ${
              activeTab === "reviews"
                ? "text-teal-600 underline underline-offset-8 decoration-teal-700 decoration-2"
                : "text-gray-600 hover:text-teal-800"
            }`}
          >
            Product Reviews (69)
          </button>
        </div>

        {/* Content Sections */}
        <div className="py-8">
          {activeTab === "description" ? (
            <div className="prose max-w-none  font-semibold">
              <div
                dangerouslySetInnerHTML={{ __html: productData.description }}
              />
              <ul className="mt-6 space-y-3">
                <li>✓ 100% Premium Cotton Fabric</li>
                <li>✓ Ethically Sourced Materials</li>
                <li>✓ Machine Wash Cold</li>
                <li>✓ Tumble Dry Low</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-semibold">AJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Amelia J.</h4>
                    <div className="flex items-center gap-2 text-yellow-400">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Absolutely love this piece! The quality is exceptional and it
                  fits perfectly. Will definitely be purchasing from this
                  collection again."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-semibold">MR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Marcus R.</h4>
                    <div className="flex items-center gap-2 text-yellow-400">
                      ★★★★☆
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Great product overall, but the sizing runs a bit small. Would
                  recommend sizing up if you're between sizes."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="my-10 sm:my-20 border-t border-gray-300 pt-4">
          <h3 className="text-xl font-semibold mb-6">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {relatedProducts.map((product) => (
              <ProductItem
                id={product._id}
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                bestseller={product.bestseller}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-auto w-full sm:my-10 sm:py-0 py-10 border-t border-gray-300 sm:pt-10">
      <div className="bg-white  w-full rounded-xl p-8 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff] text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 prata-regular">
          Product not found
        </h1>
        <p className="text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    </div>
  );
};

export default Product;
