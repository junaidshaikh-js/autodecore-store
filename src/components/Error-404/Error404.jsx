import { Link } from "react-router-dom";
import ErrorImage from "../../assets/error-404.png";

export function Error404() {
  return (
    <main className="txt-center mt-2 p-1">
      <figure>
        <img src={ErrorImage} alt="Error" width="369" height="265" />
      </figure>
      <p>
        Unfortunately the page you are looking for has been moved or deleted
      </p>
      <Link to="/">
        <button className="btn btn-primary">Go To Homepage</button>
      </Link>
    </main>
  );
}
