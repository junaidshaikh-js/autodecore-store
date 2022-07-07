import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useToast } from "../../context";

import { useData } from "../../context";
import { BtnSecondary } from "../buttons";

import "./header.css";

export function NavButtons() {
  const location = useLocation();

  const {
    state: { productsInCart, productsInWishList },
    dispatch: dataDispatch,
  } = useData();

  const {
    state: { userName, token },
    handleLogout,
  } = useAuth();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();

  return (
    <div>
      <ul className="hy-navbar-links flex align-center">
        <li className=" hide-small">
          {token ? (
            <span style={{ fontSize: "1rem" }}>Hi, {userName} </span>
          ) : location.pathname === "/login" ? (
            <Link to="/signup">
              <BtnSecondary>signup</BtnSecondary>
            </Link>
          ) : (
            <Link to="/login">
              <BtnSecondary cnames="mr-sm">login</BtnSecondary>
            </Link>
          )}
        </li>
        <li>
          {token && (
            <Link to="/profile">
              <BtnSecondary cnames="hide-small mx-1">My Profile</BtnSecondary>
            </Link>
          )}
        </li>
        <li className="mr-sm">
          {
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
          }
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
