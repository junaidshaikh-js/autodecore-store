import { WishUser } from "./WishUser";
import { WishlistContainer } from "./WishlistContainer";

import "./wishlist.css";

export function Wishlist() {
  return (
    <main className="wishlist-main flex flex-column">
      <WishUser />
      <WishlistContainer />
    </main>
  );
}
