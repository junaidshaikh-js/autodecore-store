import { Link } from "react-router-dom";
import ErrorImage from "../../assets/error-404.png";

export function Error404() {
  return (
    <main className="txt-center mt-2 p-1">
      <figure>
        <img src={ErrorImage} alt="Error" width="369" height="265" />
      </figure>
      <p>Unfortunately the page you are looking for, does not exist!</p>
      <Link to="/">
        <button className="btn btn-primary my-2">Go To Homepage</button>
      </Link>
    </main>
  );
}
