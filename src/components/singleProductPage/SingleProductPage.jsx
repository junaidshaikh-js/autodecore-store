import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsCalendar2CheckFill, BsCalendarXFill } from "react-icons/bs";

import { useAuth, useData, useToast } from "../../context";
import { Loader } from "../loader/loader";
import { Carousel } from "../carousel/Carousel";
import { ProductCardPrice } from "../productListing/ProductCardPrice";
import { AddToCartBtn } from "../productListing/AddToCartBtn";
import { toggleWishList, isInList } from "../../utils";

import "./single-product-page.css";
import { BtnPrimary } from "../buttons";

export const SingleProductPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();

  const {
    state: { token },
  } = useAuth();

  const { state, dispatch } = useData();

  const { setToastMessage } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios({
          url: `/api/products/${id}`,
          method: "get",
          headers: {
            authorization: token,
          },
        });

        if (res.status == 201 || res.status == 200) {
          setCurrentProduct(res.data.product);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        throw new Error("Single product fetch fail.");
      }
    })();
  }, [id]);

  return (
    <main className="mx-1 my-2">
      {isLoading ? (
        <Loader />
      ) : (
        <section className="single-product-section bg-white">
          <Carousel images={currentProduct.image} />

          <div className="my-1 mx-1 ">
            <div>
              <p className="txt-sm single-card-title">{currentProduct.name}</p>
              <small className="txt-secondary">{currentProduct.soldBy}</small>
              <div className="product-rating my-sm p-sm">
                {currentProduct.rating} <i className="fas fa-star"></i>
              </div>
            </div>

            <ProductCardPrice
              discountedPrice={currentProduct.discountedPrice}
              originalPrice={currentProduct.originalPrice}
              discountPercent={currentProduct.discountPercent}
            />

            <div className="my-2 border-bottom">
              <h2 className="h5 txt-secondary">Description</h2>
              <p>
                {currentProduct.shortDesc == ""
                  ? "No description Available"
                  : currentProduct.shortDesc}
              </p>
            </div>

            <div className="txt-secondary my-1">
              {currentProduct.inStock ? (
                <span>
                  <BsCalendar2CheckFill className="mr-sm" />
                  In Stock
                </span>
              ) : (
                <span>
                  <BsCalendarXFill className="mr-sm" />
                  Out of Stock
                </span>
              )}
            </div>

            <div className="btn-container flex mt-2">
              <AddToCartBtn product={currentProduct} />

              <BtnPrimary
                onClick={() =>
                  token
                    ? toggleWishList(
                        dispatch,
                        currentProduct,
                        setIsUpdating,
                        state,
                        token,
                        setToastMessage
                      )
                    : navigate("/login", { state: { location } })
                }
                disabled={isUpdating}
              >
                {isInList(state.productsInWishList, currentProduct._id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
              </BtnPrimary>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
