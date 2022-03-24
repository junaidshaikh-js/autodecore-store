import { Link, useLocation } from "react-router-dom";

import { useStateContext } from "../../context/state-context";
import { BtnSecondary } from "../buttons";

import "./header.css";

export function NavButtons() {
  const location = useLocation();

  const {
    state: { productsInCart, productsInWishList },
  } = useStateContext();

  return (
    <div>
      <ul className="hy-navbar-links">
        <li className="mr-1">
          {location.pathname === "/login" ? (
            <Link to="/signup">
              <span className="signup-btn">
                <BtnSecondary buttonText="signup" />
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <span className="login-btn">
                <BtnSecondary buttonText="login" />
              </span>
            </Link>
          )}
        </li>
        <li className="mr-sm">
          <Link to="/wishlist">
            <span>
              <div className="btn btn-icon btn-icon-md badge-container">
                <i
                  className="far fa-heart"
                  title="Wishlist"
                  aria-hidden="true"
                ></i>

                {productsInWishList.length ? (
                  <span className="badge badge-md badge-num top-right bg-complimentary">
                    {productsInWishList.length}
                  </span>
                ) : null}
              </div>
              <span className="visually-hidden">Wishlist</span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/cart">
            <div className="btn btn-icon btn-icon-md badge-container">
              <i className="fas fa-shopping-cart" title="Shopping Cart"></i>
              {productsInCart.length ? (
                <span className="badge badge-md badge-num top-right bg-complimentary">
                  {productsInCart.length}
                </span>
              ) : null}
            </div>
            <span className="visually-hidden">Cart </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
