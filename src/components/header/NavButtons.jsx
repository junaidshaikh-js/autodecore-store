import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

import { useData } from "../../context";
import { BtnSecondary } from "../buttons";

import "./header.css";

export function NavButtons() {
  const location = useLocation();

  const {
    state: { productsInCart, productsInWishList },
  } = useData();

  const {
    state: { userName, token },
  } = useAuth();

  return (
    <div>
      <ul className="hy-navbar-links">
        <li className="mr-1 hide-small">
          {token ? (
            <span style={{ fontSize: "1rem" }}>Hi, {userName} </span>
          ) : location.pathname === "/login" ? (
            <Link to="/signup">
              <BtnSecondary>signup</BtnSecondary>
            </Link>
          ) : (
            <Link to="/login">
              <BtnSecondary>login</BtnSecondary>
            </Link>
          )}
        </li>
        <li className="mr-sm">
          {
            <Link to={token ? "/wishlist" : "/login"}>
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
          }
        </li>

        <li>
          <Link to={token ? "/cart" : "/login"}>
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
