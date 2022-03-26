import { useAuth } from "../../context";

export function WishUser() {
  const {
    state: { userName },
  } = useAuth();

  return (
    <section className="wishlist-user-detail m-1 p-sm bg-white flex align-center">
      <div className="user-avatar mr-1">
        <figure className="avatar avatar-sm">
          <img
            className="img-responsive img-round"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt="avatar"
          />
        </figure>
      </div>
      <div>
        <p className="txt-sm my-0">Hello,</p>
        <p className="txt-semibold my-sm">{userName}</p>
      </div>
    </section>
  );
}
