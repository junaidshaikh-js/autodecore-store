import { NavLink, Outlet } from "react-router-dom";
import { WishUser } from "../wishlist/WishUser";

import "./userprofile.css";

export const UserProfile = () => {
  return (
    <main className="wishlist-main flex flex-column">
      <section className="wishlist-user-detail">
        <WishUser />

        <ul className="profile-nav bg-white m-1 p-sm flex flex-column">
          <li className="my-sm">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active-navlink" : undefined
              }
              end
            >
              Personal Information
            </NavLink>
          </li>
          <li className="my-sm">
            <NavLink
              to="/profile/addresses"
              className={({ isActive }) =>
                isActive ? "active-navlink" : undefined
              }
            >
              Manage Addresses
            </NavLink>
          </li>
          <li className="my-sm">
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                isActive ? "active-navlink" : undefined
              }
            >
              My Orders
            </NavLink>
          </li>
        </ul>
      </section>

      <Outlet />
    </main>
  );
};
